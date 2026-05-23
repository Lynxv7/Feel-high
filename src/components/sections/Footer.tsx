export function Footer() {
  return (
    <footer className="relative px-6 sm:px-10 pb-32 pt-20 border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div>
            <h3 className="text-display text-6xl sm:text-8xl leading-none">
              FEEL <span className="text-[var(--color-ember)]">HIGH</span>
            </h3>
            <p className="mt-6 text-sm text-white/40 max-w-sm leading-relaxed">
              Tech House · Melodic · Afro · Organic · Techno · House · Bass · Brazilian Soul.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm">
            <a
              href="https://soundcloud.com/feelhighmusic"
              target="_blank"
              rel="noreferrer"
              className="text-white/60 hover:text-white transition"
            >
              SoundCloud
            </a>
            <a
              href="https://instagram.com/feelhighmusic"
              target="_blank"
              rel="noreferrer"
              className="text-white/60 hover:text-white transition"
            >
              Instagram
            </a>
            <a href="#sound" className="text-white/60 hover:text-white transition">
              Sound
            </a>
            <a
              href="https://linktr.ee/feelhighmusic"
              target="_blank"
              rel="noreferrer"
              className="text-white/60 hover:text-white transition"
            >
              Bookings
            </a>
          </div>
        </div>
        <div className="mt-20 flex flex-col sm:flex-row justify-between gap-3 text-overline">
          <span>© {new Date().getFullYear()} FEEL HIGH</span>
          <span>Drive by feelings · Worldwide</span>
        </div>
      </div>
    </footer>
  );
}
