import React from "react";

const STEPS = [
  {
    cmd: "describe",
    title: "Describe",
    body: "Tell the AI what you want to build.",
    example: "Build a weather app with login and dark mode.",
  },
  {
    cmd: "generate",
    title: "Generate",
    body: "The AI creates a production-ready starter project using modern technologies and best practices.",
  },
  {
    cmd: "download",
    title: "Download",
    body: "Download the generated project and continue building it locally with your favorite editor.",
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-6 sm:px-8 py-24 sm:py-28">
      <div className="max-w-xl">
        <span className="font-mono text-[12.5px] text-accent">how it works</span>
        <h2 className="mt-3 font-mono font-bold text-3xl sm:text-4xl text-paper tracking-tight">
          Three commands, one starter project.
        </h2>
      </div>

      <div className="mt-14 grid md:grid-cols-3 gap-px bg-line rounded-lg overflow-hidden border border-line">
        {STEPS.map((step) => (
          <div key={step.cmd} className="bg-char-raised p-7 sm:p-8">
            <div className="font-mono text-[13px] text-steel-dim">
              <span className="text-accent">$</span> devforge {step.cmd}
            </div>
            <h3 className="mt-4 font-mono font-bold text-xl text-paper">{step.title}</h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-steel">{step.body}</p>
            {step.example && (
              <div className="mt-4 rounded border border-line bg-char px-3 py-2.5 font-mono text-[12.5px] text-accent-glow">
                &ldquo;{step.example}&rdquo;
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
