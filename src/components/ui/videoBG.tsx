"use client";
import React, { useEffect, useRef } from "react";
import ScrambledText from "./scrambledtext";

export type VideoSource = { src: string; type: string };

type OverlayKind = "none" | "dark" | "gradient";

type BackgroundVideoProps = {
  sources: VideoSource[];
  poster?: string;
  overlay?: OverlayKind;
  className?: string;
  videoClassName?: string;
  children?: React.ReactNode;
};

const overlayClass: Record<OverlayKind, string> = {
  none: "",
  dark: "bg-black/40",
  gradient: "bg-gradient-to-b from-black/50 via-black/20 to-black/60",
};

export default function BackgroundVideo({
  sources,
  poster,
  overlay = "gradient",
  className = "",
  videoClassName = "",
  children,
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handle = () => {
      const v = videoRef.current;
      if (!v) return;
      if (mql.matches) {
        v.pause();
      } else if (v.paused) {
        void v.play().catch(() => {});
      }
    };
    handle();
    mql.addEventListener?.("change", handle);
    return () => mql.removeEventListener?.("change", handle);
  }, []);

  const onError = () => {
    const v = videoRef.current;
    if (v) v.classList.add("hidden");
  };

  return (
    <section
      className={[
        "relative h-svh w-full overflow-hidden",
        "isolate",
        className,
      ].join(" ")}
      aria-label="Background video section"
    >
      <div
        className="absolute inset-0 -z-20 bg-center bg-cover"
        style={poster ? { backgroundImage: `url(${poster})` } : undefined}
        aria-hidden
      />

      <video
        ref={videoRef}
        className={[
          "absolute inset-0 -z-10 h-full w-full object-cover",
          "[filter:saturate(105%)]",
          videoClassName,
        ].join(" ")}
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        poster={poster}
        preload="auto"
        onError={onError}
      >
        {sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </video>

      {overlay !== "none" && (
        <div
          className={[
            "pointer-events-none absolute inset-0 -z-5",
            overlayClass[overlay],
          ].join(" ")}
          aria-hidden
        />
      )}

      <div className="relative z-10 flex h-full items-center justify-center">
        {children}
      </div>
    </section>
  );
}

export function HeroExample() {
  return (
    <BackgroundVideo
      sources={[{ src: "/clouds_24fps.mp4", type: "video/mp4" }]}
      poster="/clouds_24fps.mp4"
      overlay="gradient"
      className="h-[90svh]"
    >
      <div className="text-center text-white px-6">
        <h1 className="text-5xl md:text-7xl">Be free.</h1>

        <p className="mt-4 text-lg md:text-2xl/relaxed max-w-2xl mx-auto opacity-90">
          hello@carinawiedemann.com
        </p>
      </div>
    </BackgroundVideo>
  );
}
