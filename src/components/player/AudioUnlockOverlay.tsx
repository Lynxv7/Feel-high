import { useEffect, useRef, useState } from "react";
import { usePlayer } from "./PlayerProvider";

export function AudioUnlockOverlay() {
  const p = usePlayer();
  const [isDismissing, setIsDismissing] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [revealText, setRevealText] = useState(false);
  const dismissTimeoutRef = useRef<number | null>(null);
  const scrollLockRef = useRef<{ htmlOverflow: string; bodyOverflow: string } | null>(null);
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

  useEffect(() => {
    if (!isVisible || p.hasUserInteracted) return;

    const html = document.documentElement;
    const body = document.body;
    scrollLockRef.current = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
    };
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    const prevent = (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const preventKeyScroll = (event: KeyboardEvent) => {
      const blockedKeys = [
        "ArrowUp",
        "ArrowDown",
        "PageUp",
        "PageDown",
        "Home",
        "End",
        " ",
        "Spacebar",
      ];
      if (blockedKeys.includes(event.key)) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    window.addEventListener("wheel", prevent, { passive: false, capture: true });
    window.addEventListener("touchmove", prevent, { passive: false, capture: true });
    window.addEventListener("scroll", prevent, { passive: false, capture: true });
    window.addEventListener("keydown", preventKeyScroll, { capture: true });

    return () => {
      window.removeEventListener("wheel", prevent, true);
      window.removeEventListener("touchmove", prevent, true);
      window.removeEventListener("scroll", prevent, true);
      window.removeEventListener("keydown", preventKeyScroll, true);
      const prev = scrollLockRef.current;
      if (prev) {
        html.style.overflow = prev.htmlOverflow;
        body.style.overflow = prev.bodyOverflow;
      }
      scrollLockRef.current = null;
    };
  }, [isVisible, p.hasUserInteracted]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[60] grid place-items-center bg-black/70 backdrop-blur-sm transition-[opacity,backdrop-filter] duration-500 ${
        isDismissing ? "opacity-0 backdrop-blur-0" : "opacity-100"
      }`}
      onPointerDown={(event) => event.stopPropagation()}
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
