import { motion } from "motion/react";
import img1 from "@/assets/dj-purple.jpg";
import img2 from "@/assets/dj-wedding.jpg";
import img3 from "@/assets/dj-neon.png";
import img4 from "@/assets/portrait-orange.png";
import img5 from "@/assets/portrait-studio.png";
import img6 from "@/assets/portrait-amber.png";
import img7 from "@/assets/hero-sunrise.png";

const shots = [
  { src: img1, caption: "Smoke · Strobes", ratio: "aspect-[3/4]" },
  { src: img7, caption: "Sunrise Set", ratio: "aspect-[4/5]" },
  { src: img3, caption: "Mainstage · Pixels", ratio: "aspect-[3/4]" },
  { src: img4, caption: "Studio Glow", ratio: "aspect-[4/5]" },
  { src: img2, caption: "Wedding Floor", ratio: "aspect-[3/4]" },
  { src: img5, caption: "Off Stage", ratio: "aspect-[4/5]" },
  { src: img6, caption: "Amber Hours", ratio: "aspect-[3/4]" },
];

export function Atmosphere() {
  return (
    <section id="atmosphere" className="relative py-32 sm:py-40 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="text-overline">02 / Atmosphere</span>
          <h2 className="text-display text-5xl sm:text-7xl mt-4 max-w-3xl">
            A visual diary of <span className="italic text-[var(--color-ember-soft)]">light, dust and bodies</span>.
          </h2>
        </motion.div>
      </div>

      <div className="overflow-x-auto no-scrollbar">
        <div className="flex gap-5 sm:gap-7 px-6 sm:px-10 pb-4 w-max">
          {shots.map((s, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.06 }}
              className={`group relative w-[70vw] sm:w-[26rem] ${s.ratio} flex-shrink-0 overflow-hidden rounded-xl`}
            >
              <img
                src={s.src}
                alt={s.caption}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <figcaption className="absolute bottom-4 left-4 text-overline">
                {s.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
