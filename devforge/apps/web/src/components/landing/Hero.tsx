"use client";
import React from "react";
import Link from "next/link";
import Globe from "./Globe";
import OutputCard from "./OutputCard";
import RotatingText from "./RotatingText";
import { EXAMPLE_PROMPTS } from "@/lib/prompts";

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden">
      {/* faint ambient glow behind the whole hero, echoes the globe's light */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(650px 450px at 78% 15%, rgba(78,168,255,0.16), transparent 65%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8 pt-10 pb-24 sm:pt-16 sm:pb-32">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-char-raised px-3.5 py-1.5 font-mono text-[12px] text-accent">
              <span className="text-steel-dim">$</span> npx devforge — AI-powered project generator
            </div>

            <h1 className="mt-6 font-mono font-bold text-[2.6rem] sm:text-[3.4rem] leading-[1.05] tracking-tight text-paper">
              Turn your ideas into a{" "}
              <span className="text-accent">full-stack starter</span> project.
            </h1>

            <p className="mt-6 max-w-xl text-[16px] sm:text-[17px] leading-relaxed text-steel">
              Describe your application in plain English, and generate a clean
              React + Express starter with authentication, database setup,
              Tailwind CSS, and a professional folder structure — ready for
              you to build on.
            </p>

            <div className="mt-5 flex items-center gap-2 rounded-md border border-line bg-char-raised px-4 py-3 font-mono text-[13.5px] max-w-xl">
              <span className="text-accent shrink-0">$</span>
              <span className="text-steel-dim shrink-0">build</span>
              <RotatingText
                texts={EXAMPLE_PROMPTS}
                mainClassName="text-paper overflow-hidden"
                staggerFrom="last"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-120%", opacity: 0 }}
                staggerDuration={0.01}
                splitLevelClassName="overflow-hidden"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2600}
              />
            </div>

            <div className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="/generate"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3.5 font-mono font-semibold text-[14.5px] text-char hover:bg-accent-glow transition-colors"
              >
                Generate Your Project →
              </Link>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-md border border-line px-6 py-3.5 font-mono text-[14.5px] text-paper hover:border-steel transition-colors"
              >
                View on GitHub
              </a>
            </div>
          </div>

          {/* globe as the hero's centerpiece, with the output card layered
              in front — the idea in orbit, the artifact it produces up close */}
          <div className="relative flex justify-center lg:justify-end items-center min-h-[380px]">
            <Globe size={340} className="hidden sm:flex" />
            <Globe size={220} className="flex sm:hidden" />
            <div className="absolute -bottom-6 left-0 sm:left-4 lg:left-0 scale-[0.85] sm:scale-100">
              <OutputCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
