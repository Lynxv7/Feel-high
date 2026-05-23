import { useEffect, useRef, useState } from "react";
import { usePlayer } from "./PlayerProvider";

export function AudioUnlockOverlay() {
  const p = usePlayer();
  const [isDismissing, setIsDismissing] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [revealText, setRevealText] = useState(false);
  const dismissTimeoutRef = useRef<number | null>(null);
  const label = "Entre no Universo!";

  useEffect(() => {
    const id = window.setTimeout(() => setRevealText(true), 120);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!p.hasUserInteracted) return;
    setIsDismissing(true);
    if (dismissTimeoutRef.current !== null) {
      window.clearTimeout(dismissTimeoutRef.current);
    }
    dismissTimeoutRef.current = window.setTimeout(() => {
      setIsVisible(false);
    }, 500);
  }, [p.hasUserInteracted]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[60] grid place-items-center bg-black/70 backdrop-blur-sm transition-[opacity,backdrop-filter] duration-500 ${
        isDismissing ? "opacity-0 backdrop-blur-0" : "opacity-100"
      }`}
    >
      <button
        type="button"
        onClick={() => {
          setIsDismissing(true);
          p.requestStart(true);
        }}
        className="group relative overflow-hidden rounded-full border border-[var(--color-ember)]/60 bg-[oklch(0.18_0.03_45/0.7)] px-6 py-3 text-sm uppercase tracking-[0.32em] text-[var(--color-ember)] transition hover:border-[var(--color-ember)]"
        aria-label="Ativar som"
      >
        <span
          className={`relative z-10 ${revealText ? "opacity-100" : "opacity-0"}`}
          data-i18n="overlay.cta"
          data-i18n-letters="true"
        >
          {label.split("").map((char, index) => (
            <span
              key={`${char}-${index}`}
              className={char === " " ? "inline-block" : "audio-reveal-letter inline-block"}
              style={char === " " ? { width: "0.6em" } : { animationDelay: `${index * 60}ms` }}
            >
              {char}
            </span>
          ))}
        </span>
        <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.74_0.2_42/0.35),transparent_70%)] opacity-0 transition group-hover:opacity-100" />
      </button>
    </div>
  );
}
