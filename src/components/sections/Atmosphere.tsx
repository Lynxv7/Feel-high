import { motion } from "motion/react";
import img1 from "@/assets/dj-purple.jpg";
import img2 from "@/assets/dj-wedding.jpg";
import img3 from "@/assets/dj-neon.png";
import img4 from "@/assets/portrait-orange.png";
import img5 from "@/assets/portrait-studio.png";
import img6 from "@/assets/portrait-amber.png";
import img7 from "@/assets/hero-sunrise.png";

const shots = [
  { src: img1, caption: "Smoke · Strobes", ratio: "aspect-[3/4]", width: "w-[68vw] sm:w-86" },
  { src: img7, caption: "Sunrise Set", ratio: "aspect-[4/5]", width: "w-[74vw] sm:w-96" },
  { src: img3, caption: "Mainstage · Pixels", ratio: "aspect-[3/4]", width: "w-[68vw] sm:w-86" },
  { src: img4, caption: "Studio Glow", ratio: "aspect-[4/5]", width: "w-[74vw] sm:w-96" },
  { src: img2, caption: "Wedding Floor", ratio: "aspect-[3/4]", width: "w-[68vw] sm:w-86" },
  { src: img5, caption: "Off Stage", ratio: "aspect-[4/5]", width: "w-[74vw] sm:w-96" },
  { src: img6, caption: "Amber Hours", ratio: "aspect-[3/4]", width: "w-[68vw] sm:w-86" },
];

const upperRow = shots;

function GalleryRow({
  items,
  duration,
  className = "",
}: {
  items: typeof shots;
  duration: number;
  className?: string;
}) {
  const frames = [...items, ...items];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="flex w-max gap-5 px-6 sm:gap-7 sm:px-10"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {frames.map((shot, index) => (
          <motion.figure
            key={`${shot.caption}-${index}`}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: (index % items.length) * 0.04 }}
            className={`group relative ${shot.width} ${shot.ratio} shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]`}
          >
            <img
              src={shot.src}
              alt={shot.caption}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.8s] ease-out group-hover:scale-110"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,oklch(0.74_0.2_42/0.16),transparent_58%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            <figcaption className="absolute bottom-4 left-4 text-overline text-white/55 transition group-hover:text-white/80">
              {shot.caption}
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </div>
  );
}

export function Atmosphere() {
  return (
    <section id="atmosphere" className="relative overflow-hidden py-32 sm:py-40">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,oklch(0.74_0.2_42/0.1),transparent_50%)] pointer-events-none" />
      <div className="relative mx-auto mb-16 max-w-7xl px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="text-overline" data-i18n="atmosphere.overline">
            03 / Atmosfera
          </span>
          <h2 className="text-display text-5xl sm:text-7xl mt-4 max-w-3xl">
            <span data-i18n="atmosphere.title.start">Luz, corpo e movimento em uma</span>{" "}
            <span
              className="italic text-[var(--color-ember-soft)]"
              data-i18n="atmosphere.title.emphasis"
            >
              atmosfera viva
            </span>
            <span data-i18n="atmosphere.title.end">.</span>
          </h2>
        </motion.div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent sm:w-40" />
        <GalleryRow items={upperRow} duration={76} />
      </div>
    </section>
  );
}
