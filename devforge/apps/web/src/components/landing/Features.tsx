import React from "react";
import { Layers, FolderTree, Rocket, Sparkles } from "lucide-react";

const FEATURES = [
  {
    icon: Layers,
    title: "Modern stack",
    body: "React, TypeScript, Express, Tailwind CSS, Prisma, PostgreSQL, and more.",
  },
  {
    icon: FolderTree,
    title: "Clean architecture",
    body: "Organized folders, reusable components, scalable structure, and readable code.",
  },
  {
    icon: Rocket,
    title: "Ready to build",
    body: "Skip repetitive setup and start implementing features immediately.",
  },
  {
    icon: Sparkles,
    title: "AI generated",
    body: "Every project is customized from your prompt while following consistent development practices.",
  },
];

const Features: React.FC = () => {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 sm:px-8 py-24 sm:py-28">
      <div className="max-w-xl">
        <span className="font-mono text-[12.5px] text-accent">features</span>
        <h2 className="mt-3 font-mono font-bold text-3xl sm:text-4xl text-paper tracking-tight">
          What you actually get.
        </h2>
      </div>

      <div className="mt-14 grid sm:grid-cols-2 gap-5">
        {FEATURES.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="rounded-lg border border-line bg-char-raised p-7 hover:border-steel-dim transition-colors"
          >
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-char border border-line text-accent">
              <Icon size={18} strokeWidth={1.8} />
            </div>
            <h3 className="mt-5 font-mono font-semibold text-[16px] text-paper">{title}</h3>
            <p className="mt-2.5 text-[14.5px] leading-relaxed text-steel">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
