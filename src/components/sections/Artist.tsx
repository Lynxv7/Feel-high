import { motion } from "motion/react";
import portrait from "@/assets/portrait-studio.png";

const genres = [
  "Organic House",
  "Afro House",
  "Melodic Grooves",
  "Sunset Energy",
  "Atmosfera Brasileira",
];

export function Artist() {
  return (
    <section
      id="artist"
      className="relative overflow-hidden px-4 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-36"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_45%,oklch(0.74_0.2_42/0.16),transparent_42%),radial-gradient(ellipse_at_82%_62%,oklch(0.58_0.16_32/0.08),transparent_38%)] pointer-events-none" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 sm:gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <motion.figure
          initial={{ opacity: 0, y: 36, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="group relative mx-auto w-full max-w-[420px] overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] sm:max-w-[520px]"
        >
          <div className="aspect-[4/5]">
            <img
              src={portrait}
              alt="FEEL HIGH em retrato cinematográfico"
              className="h-full w-full object-cover object-center transition-transform duration-[1.6s] ease-out group-hover:scale-[1.04]"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,oklch(0.74_0.2_42/0.18),transparent_58%)] opacity-80" />
          <figcaption className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 text-overline sm:bottom-5 sm:left-5 sm:right-5">
            <span>FEEL HIGH</span>
            <span>Araxá, Brasil</span>
          </figcaption>
        </motion.figure>

        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1, delay: 0.12 }}
          className="max-w-3xl"
        >
          <span className="text-overline" data-i18n="artist.overline">
            01 / The Artist
          </span>
          <h2 className="mt-5 text-display text-4xl leading-[0.98] min-[380px]:text-5xl sm:mt-6 sm:text-7xl lg:text-8xl">
            <span data-i18n="artist.title.start">Uma identidade construída sobre</span>{" "}
            <span
              className="italic text-[var(--color-ember-soft)]"
              data-i18n="artist.title.emphasis"
            >
              groove
            </span>
            <span data-i18n="artist.title.end">, atmosfera e calor brasileiro.</span>
          </h2>

          <div className="mt-8 grid gap-4 border-l border-white/10 pl-4 text-sm leading-7 text-white/65 sm:mt-10 sm:gap-5 sm:pl-6 sm:text-lg sm:leading-8">
            <p>
              FEEL HIGH nasce entre a energia do pôr do sol e a pulsação da pista. Um som que
              aproxima brasilidade, textura orgânica e uma musicalidade cinematográfica feita para
              criar presença.
            </p>
            <p>
              Cada faixa procura esse ponto de tensão elegante: groove quente, camadas melódicas e
              uma atmosfera emocional que transforma movimento em memória.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2.5 sm:mt-10 sm:gap-3">
            {genres.map((genre, index) => (
              <motion.span
                key={genre}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.06 }}
                className="rounded-full border border-white/12 bg-white/[0.02] px-3 py-2 text-[0.68rem] uppercase tracking-[0.16em] text-white/58 transition hover:border-[var(--color-ember)]/60 hover:bg-[var(--color-ember)]/10 hover:text-white sm:px-4 sm:text-xs sm:tracking-[0.24em]"
              >
                {genre}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}
