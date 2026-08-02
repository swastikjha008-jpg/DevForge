import React from "react";
import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";

const CTA: React.FC = () => {
  return (
    <section id="cta" className="mx-auto max-w-6xl px-6 sm:px-8 pb-24 sm:pb-28">
      <div className="relative overflow-hidden rounded-2xl border border-line bg-char-raised px-8 sm:px-16 py-16 sm:py-24 text-center">
        {/* layered glow, echoes the globe's light without repeating it literally */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(520px 320px at 15% 0%, rgba(78,168,255,0.22), transparent 60%), " +
              "radial-gradient(520px 320px at 85% 100%, rgba(28,95,204,0.28), transparent 60%)",
          }}
        />
        {/* faint dot grid for texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: "radial-gradient(var(--forge-line) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-char px-3.5 py-1.5 font-mono text-[12px] text-accent">
            <Terminal size={13} strokeWidth={2} />
            one prompt away
          </div>

          <h2 className="mt-6 font-mono font-bold text-3xl sm:text-5xl text-paper tracking-tight">
            Ready to build?
          </h2>
          <p className="mt-4 max-w-md mx-auto text-[15.5px] sm:text-[16px] leading-relaxed text-steel">
            Describe your idea and generate your next project in seconds.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/generate"
              className="group inline-flex items-center gap-2 rounded-md bg-accent px-7 py-3.5 font-mono font-semibold text-[14.5px] text-char shadow-[0_0_0_0_rgba(78,168,255,0)] hover:shadow-[0_0_32px_4px_rgba(78,168,255,0.35)] hover:bg-accent-glow transition-all"
            >
              Start Generating
              <ArrowRight size={16} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#how-it-works"
              className="font-mono text-[13.5px] text-steel hover:text-paper transition-colors underline underline-offset-4 decoration-line"
            >
              see how it works
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
