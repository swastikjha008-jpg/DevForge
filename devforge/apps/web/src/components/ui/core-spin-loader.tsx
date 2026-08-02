"use client";

import React, { useEffect, useState } from "react";

const STATES = [
  "Reading prompt...",
  "Scaffolding files...",
  "Wiring routes...",
  "Installing deps...",
  "Packaging...",
];

export function CoreSpinLoader() {
  const [loadingText, setLoadingText] = useState(STATES[0]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % STATES.length;
      setLoadingText(STATES[i]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* base glow */}
        <div className="absolute inset-0 rounded-full blur-xl animate-pulse bg-accent/15" />

        {/* outer dashed ring */}
        <div className="absolute inset-0 rounded-full border border-dashed border-accent/30 animate-[spin_10s_linear_infinite]" />

        {/* main arc */}
        <div
          className="absolute inset-1 rounded-full border-2 border-transparent border-t-accent animate-[spin_2s_linear_infinite]"
          style={{ boxShadow: "0 0 8px rgba(78,168,255,0.5)" }}
        />

        {/* reverse arc */}
        <div
          className="absolute inset-3 rounded-full border-2 border-transparent border-b-accent-dim animate-[spin_3s_linear_infinite_reverse]"
          style={{ boxShadow: "0 0 8px rgba(28,95,204,0.45)" }}
        />

        {/* inner fast ring */}
        <div className="absolute inset-5 rounded-full border border-transparent border-l-paper/50 animate-[spin_1s_ease-in-out_infinite]" />

        {/* orbital dot */}
        <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-glow"
            style={{ boxShadow: "0 0 6px rgba(159,216,255,0.9)" }}
          />
        </div>

        {/* center core */}
        <div
          className="absolute w-1.5 h-1.5 rounded-full animate-pulse bg-paper"
          style={{ boxShadow: "0 0 8px rgba(234,241,251,0.8)" }}
        />
      </div>

      <div className="flex flex-col items-center h-5 justify-center">
        <span key={loadingText} className="spin-loader-text font-mono text-[10.5px] tracking-[0.25em] uppercase text-accent-glow">
          {loadingText}
        </span>
      </div>
    </div>
  );
}
