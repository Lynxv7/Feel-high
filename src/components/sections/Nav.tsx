import { useState } from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#artist", label: "Artista", key: "nav.artist" },
  { href: "#sound", label: "Discografia", key: "nav.sound" },
  { href: "#atmosphere", label: "Atmosfera", key: "nav.atmosphere" },
  { href: "#process", label: "Processo", key: "nav.process" },
  { href: "#live", label: "YouTube", key: "nav.live" },
  { href: "#contact", label: "Contato", key: "nav.contact" },
];

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="fixed inset-x-0 top-0 z-40"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-8 sm:py-5 lg:px-10">
        <a
          href="#top"
          className="font-display text-xl tracking-tight"
          onClick={() => setIsOpen(false)}
        >
          FEEL <span className="text-[var(--color-ember)]">HIGH</span>
        </a>
        <nav className="hidden items-center gap-5 text-overline lg:flex xl:gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-foreground/90 text-white/50 transition"
              data-i18n={l.key}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="https://soundcloud.com/feelhighmusic"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full border border-white/15 px-3 py-2 text-overline transition hover:border-white/40 hover:bg-white/5 sm:inline-flex"
            data-i18n="nav.soundcloud"
          >
            SoundCloud
          </a>
          <button
            type="button"
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/35 text-white/70 backdrop-blur transition hover:border-white/35 hover:text-white lg:hidden"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <motion.nav
        initial={false}
        animate={
          isOpen
            ? { opacity: 1, y: 0, pointerEvents: "auto" }
            : { opacity: 0, y: -8, pointerEvents: "none" }
        }
        transition={{ duration: 0.25 }}
        className="mx-4 overflow-hidden rounded-2xl border border-white/10 bg-black/80 px-4 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:mx-8 lg:hidden"
      >
        <div className="grid gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setIsOpen(false)}
              className="rounded-xl px-3 py-3 text-sm text-white/68 transition hover:bg-white/5 hover:text-white"
              data-i18n={l.key}
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://soundcloud.com/feelhighmusic"
            target="_blank"
            rel="noreferrer"
            onClick={() => setIsOpen(false)}
            className="mt-2 rounded-xl border border-[var(--color-ember)]/35 px-3 py-3 text-sm text-[var(--color-ember)] transition hover:bg-[var(--color-ember)]/10"
            data-i18n="nav.soundcloud"
          >
            SoundCloud
          </a>
        </div>
      </motion.nav>
    </motion.header>
  );
}
