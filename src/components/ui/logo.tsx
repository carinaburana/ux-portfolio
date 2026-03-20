"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Logo() {
  const [burst, setBurst] = useState(false);

  const handleEnter = () => {
    setBurst(true);
    // reset after the animation finishes
    window.setTimeout(() => setBurst(false), 450);
  };

  return (
    <Link href="/" aria-label="Go to home">
      <div
        onMouseEnter={handleEnter}
        onClick={() => (window.location.href = "/")}
        className="relative inline-flex items-center justify-center select-none"
      >
        {/* Pop on hover / tap */}
        <Image
          src="/logo_makeideasmatter.svg" // file in /public
          alt="Make Ideas Matter"
          width={110}
          height={24}
          className="h-8 w-auto object-contain transition-transform duration-200 ease-out hover:scale-[1.06] active:scale-95"
          priority
        />

        {/* Burst ring */}
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-0 rounded-full ${
            burst ? "animate-logo-burst" : ""
          }`}
        />
      </div>

      {/* Keyframes for the burst */}
      <style jsx>{`
        @keyframes logo-burst {
          0% {
            transform: scale(0.7);
            opacity: 0.55;
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.08), 0 0 0 0 rgba(0, 0, 0, 0.04);
          }
          60% {
            opacity: 0.25;
            box-shadow: 0 0 0 8px rgba(0, 0, 0, 0.06),
              0 0 0 16px rgba(0, 0, 0, 0.03);
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
            box-shadow: 0 0 0 16px rgba(0, 0, 0, 0), 0 0 0 28px rgba(0, 0, 0, 0);
          }
        }
        .animate-logo-burst {
          animation: logo-burst 450ms ease-out forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-logo-burst {
            animation: none;
          }
        }
      `}</style>
    </Link>
  );
}
