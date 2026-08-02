import React from "react";
import { cn } from "@/lib/utils";

interface GlobeProps {
  className?: string;
  size?: number;
}

const Globe: React.FC<GlobeProps> = ({ className, size = 340 }) => {
  return (
    <div className={cn("flex items-center justify-center", className)} aria-hidden="true">
      <style>
        {`
          @keyframes earthRotate {
            0% { background-position: 0 0; }
            100% { background-position: 400px 0; }
          }
          @keyframes twinkling { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
          @keyframes twinkling-slow { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
          @keyframes twinkling-long { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
          @keyframes twinkling-fast { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
        `}
      </style>
      <div
        className="relative rounded-full overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.2),-5px_0_8px_#c3f4ff_inset,15px_2px_25px_#000_inset,-24px_-2px_34px_#c3f4ff99_inset,250px_0_44px_#00000066_inset,150px_0_38px_#000000aa_inset]"
        style={{
          width: size,
          height: size,
          backgroundImage: "url('https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/globe.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "left",
          animation: "earthRotate 30s linear infinite",
        }}
      >
        <div
          className="absolute left-[-8px] top-[10px] w-1 h-1 bg-white rounded-full"
          style={{ animation: "twinkling 3s infinite" }}
        />
        <div
          className="absolute left-[-16px] top-[40px] w-1 h-1 bg-white rounded-full"
          style={{ animation: "twinkling-slow 2s infinite" }}
        />
        <div
          className="absolute right-[-6px] top-[90px] w-1 h-1 bg-white rounded-full"
          style={{ animation: "twinkling-long 4s infinite" }}
        />
        <div
          className="absolute left-[45%] bottom-[10px] w-1 h-1 bg-white rounded-full"
          style={{ animation: "twinkling 3s infinite" }}
        />
        <div
          className="absolute left-[15%] bottom-[30px] w-1 h-1 bg-white rounded-full"
          style={{ animation: "twinkling-fast 1.5s infinite" }}
        />
        <div
          className="absolute left-[60%] top-[-4px] w-1 h-1 bg-white rounded-full"
          style={{ animation: "twinkling-long 4s infinite" }}
        />
        <div
          className="absolute right-[10px] top-[55px] w-1 h-1 bg-white rounded-full"
          style={{ animation: "twinkling-slow 2s infinite" }}
        />
      </div>
    </div>
  );
};

export default Globe;
