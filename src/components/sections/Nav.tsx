import { motion } from "motion/react";

const links = [
  { href: "#sound", label: "Som", key: "nav.sound" },
  { href: "#atmosphere", label: "Atmosfera", key: "nav.atmosphere" },
  { href: "#live", label: "Ao vivo", key: "nav.live" },
  { href: "#process", label: "Processo", key: "nav.process" },
  { href: "#contact", label: "Contato", key: "nav.contact" },
];

export function Nav() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="fixed top-0 inset-x-0 z-40"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 py-5 flex items-center justify-between">
        <a href="#top" className="font-display text-xl tracking-tight">
          FEEL <span className="text-[var(--color-ember)]">HIGH</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-overline">
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
        <a
          href="https://soundcloud.com/feelhighmusic"
          target="_blank"
          rel="noreferrer"
          className="text-overline px-3 py-2 rounded-full border border-white/15 hover:border-white/40 hover:bg-white/5 transition"
          data-i18n="nav.soundcloud"
        >
          SoundCloud
        </a>
      </div>
    </motion.header>
  );
}
