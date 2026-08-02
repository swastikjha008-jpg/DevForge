import React from "react";
import Marquee from "./Marquee";

const STACK =
  "React  ·  TypeScript  ·  Express  ·  Tailwind CSS  ·  Prisma  ·  PostgreSQL  ·  Gemini  ·  Next.js  ·  Node.js  ·  ";

const TechMarquee: React.FC = () => {
  return (
    <div id="stack" className="border-y border-line bg-char-raised py-5">
      <Marquee baseVelocity={2} className="font-mono text-[15px] tracking-wide text-steel">
        {STACK}
      </Marquee>
    </div>
  );
};

export default TechMarquee;
