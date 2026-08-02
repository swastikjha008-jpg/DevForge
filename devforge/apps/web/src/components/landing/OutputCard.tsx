"use client";
import React from "react";
import { motion } from "motion/react";
import { Check, Folder, FileCode2 } from "lucide-react";
import { buildFileTree } from "@/lib/build-tree";

interface OutputCardProps {
  projectName?: string;
  files?: string[];
  folders?: string[];
}

const DEMO_PROJECT_NAME = "weather-app";
const DEMO_FILES = ["src/components/WeatherCard.tsx", "src/components/ThemeToggle.tsx", "server/auth.ts", "server/routes.ts", "prisma/schema.prisma", "tailwind.config.ts", "package.json"];
const DEMO_FOLDERS: string[] = [];

/**
 * The one signature element of the page: a terminal-styled card that
 * shows the literal output of a prompt — a real, ordinary project file
 * tree — because that's the entire promise of DevForge in one glance.
 *
 * Used two ways: decoratively in the Hero section (no props — falls back
 * to the original example tree), and functionally in GenerateFlow's done
 * state (passed the real files/folders/projectName from that generation).
 */
const OutputCard: React.FC<OutputCardProps> = ({ projectName = DEMO_PROJECT_NAME, files = DEMO_FILES, folders = DEMO_FOLDERS }) => {
  const rows = buildFileTree(files, folders);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: -1.5 }}
      animate={{ opacity: 1, y: 0, rotate: -1.5 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
      className="w-full max-w-[380px] rounded-lg border border-line bg-char-raised shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
    >
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-line">
        <span className="w-2.5 h-2.5 rounded-full bg-[#4a4238]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#4a4238]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#4a4238]" />
        <span className="ml-2 font-mono text-[11px] text-steel-dim">output.tree</span>
      </div>
      <div className="px-4 py-4 font-mono text-[12.5px] leading-[1.9] max-h-[340px] overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="flex items-center gap-1.5 text-steel"
        >
          <Folder size={12} className="text-accent shrink-0" />
          <span className="text-paper">{projectName}/</span>
        </motion.div>
        {rows.map((row, i) => (
          <motion.div
            key={row.key}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55 + i * 0.04, duration: 0.3 }}
            className="flex items-center gap-1.5 text-steel"
            style={{ paddingLeft: `${(row.depth + 1) * 14}px` }}
          >
            {row.file ? (
              <FileCode2 size={12} className="text-steel-dim shrink-0" />
            ) : (
              <Folder size={12} className="text-accent shrink-0" />
            )}
            <span className={row.file ? "text-paper/80" : "text-paper"}>{row.label}</span>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 + rows.length * 0.04 + 0.2 }}
          className="flex items-center gap-1.5 mt-3 pt-3 border-t border-line text-accent"
        >
          <Check size={13} strokeWidth={2.5} />
          <span>
            {files.length} file{files.length === 1 ? "" : "s"} generated
          </span>
          <span className="w-[7px] h-[14px] bg-accent-glow ml-0.5 blink-cursor" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OutputCard;
