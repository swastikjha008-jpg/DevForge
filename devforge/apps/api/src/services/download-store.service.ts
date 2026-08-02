import { DOWNLOAD_TTL_MS } from "../constants/limits";

interface StoredDownload {
  buffer: Buffer;
  projectName: string;
  expiresAt: number;
}

/**
 * Holds generated ZIP buffers in memory between the POST /api/generate call
 * that creates them and the GET /downloads/:token call that serves them.
 * Entries expire after DOWNLOAD_TTL_MS — this is a single-process, in-memory
 * store, so it does not survive a restart and does not scale across
 * multiple API instances without moving to shared storage (e.g. Redis or
 * S3) if that becomes necessary.
 */
class DownloadStoreService {
  private readonly store = new Map<string, StoredDownload>();
  private sweepTimer: NodeJS.Timeout | null = null;

  constructor() {
    this.startSweeping();
  }

  put(token: string, buffer: Buffer, projectName: string): void {
    this.store.set(token, { buffer, projectName, expiresAt: Date.now() + DOWNLOAD_TTL_MS });
  }

  get(token: string): { buffer: Buffer; projectName: string } | null {
    const entry = this.store.get(token);
    if (!entry) return null;

    if (entry.expiresAt < Date.now()) {
      this.store.delete(token);
      return null;
    }

    return { buffer: entry.buffer, projectName: entry.projectName };
  }

  private startSweeping(): void {
    this.sweepTimer = setInterval(() => {
      const now = Date.now();
      for (const [token, entry] of this.store.entries()) {
        if (entry.expiresAt < now) {
          this.store.delete(token);
        }
      }
    }, 60_000);
    this.sweepTimer.unref();
  }
}

export const downloadStoreService = new DownloadStoreService();
