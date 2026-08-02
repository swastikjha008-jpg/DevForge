import React from "react";
import Logo from "./Logo";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Logo />
        <p className="font-mono text-[12px] text-steel-dim text-left sm:text-right leading-relaxed">
          Built with Next.js, TypeScript, Tailwind CSS, Express, Prisma, PostgreSQL, and Gemini.
          <br />
          Designed and developed by Swastik.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
