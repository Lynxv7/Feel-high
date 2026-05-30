export function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-4 pb-[calc(8rem+env(safe-area-inset-bottom))] pt-14 sm:px-8 sm:pb-32 sm:pt-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end md:gap-12">
          <div>
            <h3 className="text-display text-5xl leading-none min-[380px]:text-6xl sm:text-8xl">
              FEEL <span className="text-[var(--color-ember)]">HIGH</span>
            </h3>
            <p
              className="mt-6 text-sm text-white/40 max-w-sm leading-relaxed"
              data-i18n="footer.genre"
            >
              Tech House · Melodic · Afro · Organic · Techno · House · Bass · Brazilian Soul.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm sm:gap-x-12">
            <a
              href="https://soundcloud.com/feelhighmusic"
              target="_blank"
              rel="noreferrer"
              className="text-white/60 hover:text-white transition"
              data-i18n="nav.soundcloud"
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
            <a
              href="#sound"
              className="text-white/60 hover:text-white transition"
              data-i18n="footer.sound"
            >
              Som
            </a>
            <a
              href="https://linktr.ee/feelhighmusic"
              target="_blank"
              rel="noreferrer"
              className="text-white/60 hover:text-white transition"
              data-i18n="footer.bookings"
            >
              Contratações
            </a>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-3 text-overline sm:mt-20 sm:flex-row">
          <span data-i18n="footer.rights">© {new Date().getFullYear()} FEEL HIGH</span>
          <span data-i18n="footer.tagline">Guiado por sentimentos · Mundial</span>
        </div>
      </div>
    </footer>
  );
}
