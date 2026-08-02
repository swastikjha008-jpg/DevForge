import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  withWordmark?: boolean;
  size?: number;
}

/**
 * DevForge mark: a hexagonal "forged plate" — sharp machined corners,
 * deliberately breaking from the rounded language everywhere else on the
 * page — housing a terminal chevron + cursor. Forged metal, holding code.
 */
const Logo: React.FC<LogoProps> = ({ className, withWordmark = true, size = 30 }) => {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M16 1.5L29.09 9V23L16 30.5L2.91 23V9L16 1.5Z"
          fill="url(#hexFill)"
          stroke="url(#hexStroke)"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M12.5 11.5L18 16L12.5 20.5"
          stroke="url(#iconGrad)"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="19.5" y="19" width="6.5" height="2.3" rx="1.15" fill="url(#iconGrad)" />
        <defs>
          <radialGradient id="hexFill" cx="0.32" cy="0.22" r="0.95">
            <stop stopColor="#17233A" />
            <stop offset="1" stopColor="#0A0E17" />
          </radialGradient>
          <linearGradient id="hexStroke" x1="2.91" y1="1.5" x2="29.09" y2="30.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4EA8FF" />
            <stop offset="1" stopColor="#1C5FCC" />
          </linearGradient>
          <linearGradient id="iconGrad" x1="12.5" y1="11.5" x2="26" y2="21.3" gradientUnits="userSpaceOnUse">
            <stop stopColor="#9FD8FF" />
            <stop offset="1" stopColor="#4EA8FF" />
          </linearGradient>
        </defs>
      </svg>
      {withWordmark && (
        <span className="font-mono font-bold text-[17px] tracking-tight text-paper">
          dev<span className="text-accent">forge</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
