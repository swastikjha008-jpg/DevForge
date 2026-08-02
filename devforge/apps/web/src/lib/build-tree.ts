export interface TreeRow {
  key: string;
  label: string;
  depth: number;
  file: boolean;
}

/**
 * Turns a flat list of file paths (plus any explicit empty folders) into the
 * rows OutputCard renders. Folder rows are inferred from path segments —
 * not just taken from the AI's explicit "folders" list — because a
 * generated project will usually reference nested paths (e.g.
 * "src/components/WeatherCard.tsx") without every intermediate folder being
 * separately declared, and the tree should reflect what's actually in the
 * ZIP either way.
 */
export function buildFileTree(files: string[], explicitFolders: string[] = []): TreeRow[] {
  const folderDepths = new Map<string, number>();

  const registerFolder = (path: string) => {
    const segments = path.split("/").filter(Boolean);
    let running = "";
    segments.forEach((segment, i) => {
      running = running ? `${running}/${segment}` : segment;
      if (!folderDepths.has(running)) {
        folderDepths.set(running, i);
      }
    });
  };

  for (const folder of explicitFolders) registerFolder(folder);
  for (const file of files) {
    const parent = file.split("/").slice(0, -1).join("/");
    if (parent) registerFolder(parent);
  }

  const folderRows: TreeRow[] = Array.from(folderDepths.entries())
    .sort((a, b) => (a[0] < b[0] ? -1 : 1))
    .map(([path, depth]) => ({
      key: `dir:${path}`,
      label: `${path.split("/").pop()}/`,
      depth,
      file: false,
    }));

  const fileRows: TreeRow[] = files.map((path) => {
    const segments = path.split("/").filter(Boolean);
    return {
      key: `file:${path}`,
      label: segments[segments.length - 1] ?? path,
      depth: Math.max(segments.length - 1, 0),
      file: true,
    };
  });

  // Interleave: each file appears after its parent folder's other rows would
  // sort naturally alongside it — simplest correct approach is to sort the
  // combined set by full path, folders and files together, since that keeps
  // a folder immediately before its own children.
  const combined = [...folderRows.map((r) => ({ ...r, sortKey: r.key.slice(4) })), ...fileRows.map((r) => ({ ...r, sortKey: r.key.slice(5) }))];
  combined.sort((a, b) => (a.sortKey < b.sortKey ? -1 : a.sortKey > b.sortKey ? 1 : 0));

  return combined.map(({ sortKey: _sortKey, ...row }) => row);
}
