import React from "react";

const WhyUse: React.FC = () => {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 py-28 sm:py-32 grid md:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
        <span className="font-mono text-[80px] sm:text-[45px] tracking-wide text-accent">
          why use it
        </span>
        <div>
          <p className="font-mono font-bold text-3xl sm:text-4xl leading-snug text-paper tracking-tight">
            Setting up a new project shouldn&apos;t take hours.
          </p>
          <p className="mt-5 max-w-xl text-[16px] sm:text-[17px] leading-relaxed text-steel">
            This generator handles the boilerplate so you can spend more time
            building features instead of configuring folders, dependencies,
            and project structure.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyUse;
