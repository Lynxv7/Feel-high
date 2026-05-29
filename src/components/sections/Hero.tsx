import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import hero from "@/assets/hero-sunrise.png";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section ref={ref} id="top" className="relative min-h-svh overflow-hidden">
      {/* Background image with parallax */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={hero}
          alt="FEEL HIGH"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-background" />
        <div className="absolute inset-0 bg-glow-ember opacity-70" />
      </motion.div>

      <motion.div
        style={{ opacity, y: titleY }}
        className="relative z-10 flex min-h-svh flex-col items-center justify-center px-6 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-overline mb-8"
          data-i18n="hero.tagline"
        >
          Um projeto sonoro · Mundial
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-display text-[18vw] sm:text-[14vw] md:text-[12rem] leading-[0.85]"
        >
          FEEL
          <br />
          <span className="italic text-(--color-ember-soft)">High</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-10 max-w-md text-sm sm:text-base text-white/60 leading-relaxed"
          data-i18n="hero.subtitle"
        >
          Música para pores do sol, pistas de dança e momentos que ficam com você.
        </motion.p>

        <motion.a
          href="#sound"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-10 inset-x-0 mx-auto w-fit text-overline flex flex-col items-center gap-3 text-white/40"
        >
          <span data-i18n="hero.scroll">Role</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="block h-8 w-px bg-linear-to-b from-white/40 to-transparent"
          />
        </motion.a>
      </motion.div>
    </section>
  );
}
