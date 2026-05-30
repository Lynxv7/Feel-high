import { motion } from "motion/react";
import { ArrowUpRight, Play, Youtube } from "lucide-react";

const channelUrl = "https://www.youtube.com/@FeelHighDJ";
const featuredVideoUrl =
  "https://www.youtube.com/embed/jbdXAXjbT34?start=1126&rel=0&modestbranding=1&playsinline=1";

export function Live() {
  return (
    <section
      id="live"
      className="relative overflow-hidden px-4 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-40"
    >
      <div className="absolute inset-x-0 top-1/2 h-[38rem] -translate-y-1/2 bg-[radial-gradient(circle_at_74%_50%,rgba(255,107,29,0.20),transparent_38%),radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_24%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.36)_45%,transparent)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-10 sm:gap-14 lg:grid-cols-[0.42fr_0.58fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-xl"
          >
            <span className="text-overline text-[var(--color-ember)]" data-i18n="live.overline">
              CANAL OFICIAL
            </span>
            <h2 className="mt-5 text-display text-4xl leading-[0.96] min-[380px]:text-5xl sm:text-7xl sm:leading-[0.92]">
              <span data-i18n="live.title.start">Siga a jornada.</span>
              <br />
              <span className="italic text-[var(--color-ember-soft)]" data-i18n="live.title.end">
                No YouTube.
              </span>
            </h2>

            <div className="mt-7 space-y-4 text-sm leading-relaxed text-white/62 sm:mt-8 sm:text-base">
              <p data-i18n="live.description.primary">
                Sets autorais, bastidores, viagens, apresentações e a energia das pistas.
              </p>
              <p data-i18n="live.description.secondary">
                Inscreva-se e acompanhe tudo o que acontece no universo FEEL HIGH.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:items-center">
              <motion.a
                href={channelUrl}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-3 rounded-full border border-[var(--color-ember)]/60 bg-[var(--color-ember)] px-4 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-black shadow-[0_0_34px_rgba(255,107,29,0.22)] transition hover:bg-[var(--color-ember-soft)] sm:px-5 sm:text-xs sm:tracking-[0.22em]"
              >
                <Youtube className="h-4 w-4" />
                <span data-i18n="live.button">Inscrever-se no canal</span>
              </motion.a>

              <motion.a
                href={channelUrl}
                target="_blank"
                rel="noreferrer"
                whileHover={{ x: 3 }}
                className="group inline-flex items-center gap-3 text-overline text-white/55 transition hover:text-white"
                aria-label="Abrir canal @FeelHighDJ no YouTube"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full border border-white/12 bg-white/5 text-[var(--color-ember)] transition group-hover:border-[var(--color-ember)]/50 group-hover:bg-[var(--color-ember)]/10">
                  <Youtube className="h-4 w-4" />
                </span>
                @FeelHighDJ
                <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-12" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -inset-3 rounded-[1.5rem] bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,29,0.24),transparent_58%)] blur-2xl sm:-inset-6 sm:rounded-[2rem]" />
            <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.035] p-1.5 shadow-[0_30px_90px_rgba(0,0,0,0.44)] backdrop-blur-sm sm:rounded-[1.6rem] sm:p-2">
              <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl ring-1 ring-inset ring-white/10 sm:rounded-[1.6rem]" />
              <div className="pointer-events-none absolute left-3 top-3 z-20 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/55 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/72 backdrop-blur sm:left-6 sm:top-6 sm:gap-2 sm:px-3 sm:py-2 sm:text-[10px] sm:tracking-[0.22em]">
                <Play className="h-3 w-3 fill-[var(--color-ember)] text-[var(--color-ember)]" />
                YouTube Experience
              </div>
              <iframe
                title="Canal oficial FEEL HIGH no YouTube"
                src={featuredVideoUrl}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="aspect-video w-full rounded-[1rem] bg-black sm:rounded-[1.25rem]"
              />
            </div>
            <motion.a
              href={channelUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2 }}
              className="mt-4 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/35 px-4 py-3.5 text-sm text-white/60 backdrop-blur transition hover:border-[var(--color-ember)]/35 hover:text-white sm:mt-5 sm:px-5 sm:py-4"
            >
              <span className="inline-flex items-center gap-3">
                <Youtube className="h-5 w-5 text-[var(--color-ember)]" />
                <span>@FeelHighDJ</span>
              </span>
              <ArrowUpRight className="h-4 w-4" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
