import React from "react";
import Link from "next/link";
import Logo from "./Logo";

const Header: React.FC = () => {
  return (
    <header className="relative z-10 w-full">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 py-5 flex items-center justify-between">
        <Link href="/" aria-label="DevForge home">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-8 font-mono text-[13px] text-steel">
          <a href="/#how-it-works" className="hover:text-paper transition-colors">
            how it works
          </a>
          <a href="/#features" className="hover:text-paper transition-colors">
            features
          </a>
          <a href="/#stack" className="hover:text-paper transition-colors">
            stack
          </a>
        </nav>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-line px-4 py-2 font-mono text-[12.5px] text-paper hover:border-accent hover:text-accent transition-colors"
        >
          View on GitHub
        </a>
      </div>
    </header>
  );
};

export default Header;
