import { motion } from "motion/react";
import { Pause, Play } from "lucide-react";
import { usePlayer } from "@/components/player/PlayerProvider";
import { Waveform } from "@/components/player/Waveform";
import { getTrackSubtitle } from "@/lib/tracks";

export function Sound() {
  const p = usePlayer();
  return (
    <section id="sound" className="relative px-4 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-36">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[oklch(0.1_0.018_40)] to-transparent pointer-events-none" />
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="mb-10 flex flex-col items-start justify-between gap-6 sm:mb-14 lg:mb-16 lg:flex-row lg:items-end"
        >
          <div>
            <span className="text-overline" data-i18n="sound.overline">
              02 / Discografia
            </span>
            <h2 className="mt-4 text-display text-5xl min-[380px]:text-6xl sm:text-8xl">
              <span data-i18n="sound.title">Discografia</span>
              <span className="italic text-[var(--color-ember-soft)]">.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-white/55">
            <span data-i18n="sound.body">
              A identidade vira som: faixas oficiais transmitidas direto do SoundCloud, organizadas
              como uma entrada no universo musical do FEEL HIGH.
            </span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {p.tracks.map((t, i) => {
            const isCurrent = p.currentTrack?.id === t.id;
            const isPlaying = isCurrent && p.isPlaying;
            return (
              <motion.button
                key={t.id}
                type="button"
                onClick={() => p.toggle(t.soundcloudUrl as Parameters<typeof p.toggle>[0])}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: i * 0.08 }}
                className={`group relative overflow-hidden rounded-xl border text-left transition-all duration-500 sm:rounded-2xl ${
                  isCurrent
                    ? "border-[var(--color-ember)]/50 shadow-[0_0_60px_-15px_var(--color-ember)]"
                    : "border-white/10 hover:border-white/25"
                }`}
              >
                <div className="relative aspect-[1/1.12] overflow-hidden sm:aspect-[4/5]">
                  <img
                    src={t.cover}
                    alt={t.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  <div
                    className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.74_0.2_42/0.25),transparent_70%)] transition-opacity duration-700 ${
                      isCurrent ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                    }`}
                  />

                  <div className="absolute top-4 right-4">
                    <div
                      className={`grid h-11 w-11 place-items-center rounded-full border backdrop-blur-md transition-all sm:h-12 sm:w-12 ${
                        isCurrent
                          ? "bg-[var(--color-ember)] border-[var(--color-ember)] text-black"
                          : "bg-black/40 border-white/20 text-white group-hover:bg-white group-hover:text-black"
                      }`}
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4 fill-current" />
                      ) : (
                        <Play className="h-4 w-4 fill-current translate-x-[1px]" />
                      )}
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <div className="mb-3 flex items-center gap-2 text-overline">
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      <span className="h-px flex-1 bg-white/20" />
                      <span>{getTrackSubtitle(t)}</span>
                    </div>
                    <h3 className="mb-3 break-words text-display text-2xl leading-[0.95] sm:text-3xl">
                      {t.title}
                    </h3>
                    <div className="h-6">
                      <Waveform active={isPlaying} bars={36} />
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
