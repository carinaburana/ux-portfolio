"use client";

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

import Link from "next/link";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";

type Phase = "idle" | "burst" | "emoji";

export default function LogoBurst() {
  const [phase, setPhase] = useState<Phase>("idle");
  const running = useRef(false);

  const particles = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const dist = 36 + Math.random() * 18;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist;
        const delay = Math.random() * 60;
        const scale = 0.7 + Math.random() * 0.6;
        return { id: i, tx, ty, delay, scale };
      }),
    []
  );

  const trigger = () => {
    if (running.current) return;
    running.current = true;

    setPhase("burst");

    const t1 = window.setTimeout(() => setPhase("emoji"), 420);
    const t2 = window.setTimeout(() => {
      setPhase("idle");
      running.current = false;
    }, 420 + 900);
  };

  return (
    <Link href="/" aria-label="Zur Startseite">
      <div
        onMouseEnter={trigger}
        onTouchStart={trigger}
        className="relative inline-flex items-center justify-center select-none"
      >
        <div
          className={
            "relative inline-flex items-center justify-center h-8 " +
            "transition-transform duration-200 ease-out " +
            (phase === "burst" ? "scale-95" : "hover:scale-[1.06]")
          }
          style={{ width: 110 }}
        >
          {phase === "emoji" ? (
            <span
              className="text-2xl leading-none select-none animate-emoji-grow"
              role="img"
              aria-label="Keimling"
            >
              🌱
            </span>
          ) : (
            <Image
              src="/logo_makeideasmatter.svg"
              alt="Make Ideas Matter"
              width={110}
              height={24}
              className="h-8 w-auto object-contain"
              priority
            />
          )}

          {phase === "burst" && (
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              {particles.map((p) => (
                <span
                  key={p.id}
                  className="absolute left-1/2 top-1/2 block rounded-full bg-black/40 dark:bg-white/50"
                  style={
                    {
                      width: 4,
                      height: 4,
                      transform: "translate(-50%, -50%)",
                      animation: `particle-move 420ms cubic-bezier(.2,.7,.1,1) ${p.delay}ms forwards`,
                      "--tx": `${p.tx}px`,
                      "--ty": `${p.ty}px`,
                      "--scale": p.scale,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
          )}
        </div>

        <span
          aria-hidden
          className={
            "pointer-events-none absolute inset-0 rounded-full " +
            (phase === "burst" ? "animate-logo-ring" : "")
          }
        />

        <style jsx>{`
          @keyframes particle-move {
            0% {
              transform: translate(-50%, -50%) scale(var(--scale));
              opacity: 0.9;
            }
            70% {
              opacity: 0.45;
            }
            100% {
              transform: translate(
                  calc(-50% + var(--tx)),
                  calc(-50% + var(--ty))
                )
                scale(0.9);
              opacity: 0;
            }
          }
          @keyframes logo-ring {
            0% {
              transform: scale(0.7);
              opacity: 0.4;
              box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.08),
                0 0 0 0 rgba(0, 0, 0, 0.04);
            }
            60% {
              opacity: 0.22;
              box-shadow: 0 0 0 10px rgba(0, 0, 0, 0.08),
                0 0 0 18px rgba(0, 0, 0, 0.04);
            }
            100% {
              transform: scale(1.5);
              opacity: 0;
            }
          }
          .animate-logo-ring {
            animation: logo-ring 420ms ease-out forwards;
          }

          /* 🌱 Grow effect for the emoji */
          @keyframes emoji-grow {
            0% {
              transform: scale(0);
              opacity: 0;
            }
            40% {
              transform: scale(1.6);
              opacity: 1;
            }
            70% {
              transform: scale(1);
            }
            100% {
              transform: scale(0.8);
              opacity: 0;
            }
          }
          .animate-emoji-grow {
            animation: emoji-grow 900ms ease-out forwards;
            display: inline-block;
          }

          @media (prefers-reduced-motion: reduce) {
            .animate-logo-ring,
            .animate-emoji-grow {
              animation: none;
            }
            span[style*="particle-move"] {
              animation: none !important;
            }
          }
        `}</style>
      </div>
    </Link>
  );
}
