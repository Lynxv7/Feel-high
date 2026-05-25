import { motion } from "motion/react";
import { getCurrentLanguage } from "@/lib/i18n";

const pillars = [
  {
    t: "process.atmosphere",
    d: "Every track starts with a room, a light, a feeling — before a single sound.",
  },
  { t: "process.groove", d: "Pocket-first. The body moves before the mind catches up." },
  { t: "process.emotion", d: "Melody as a slow burn. Restraint as a tool." },
  { t: "process.roots", d: "Rhythms, slang and soul carried from home into every set." },
  { t: "process.percussion", d: "Live hands, wood, skin. Texture you can almost touch." },
  { t: "process.storytelling", d: "A set is an arc — sunrise to peak to silence." },
];

const translations: Record<string, Record<string, string>> = {
  "pt-BR": {
    "process.atmosphere": "Atmosfera",
    "process.groove": "Groove",
    "process.emotion": "Emocao",
    "process.roots": "Raizes Brasileiras",
    "process.percussion": "Perceussao Organica",
    "process.storytelling": "Contacao de Historias",
  },
  en: {
    "process.atmosphere": "Atmosphere",
    "process.groove": "Groove",
    "process.emotion": "Emotion",
    "process.roots": "Brazilian Roots",
    "process.percussion": "Organic Percussion",
    "process.storytelling": "Storytelling",
  },
};

function getPillarTitle(key: string): string {
  const lang = getCurrentLanguage();
  return translations[lang]?.[key] || key;
}

export function Process() {
  return (
    <section id="process" className="relative py-32 sm:py-40 px-6 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-3xl mb-20"
        >
          <span className="text-overline" data-i18n="process.overline">
            04 / Process
          </span>
          <h2 className="text-display text-5xl sm:text-7xl mt-4">
            Six pillars, one <span className="italic text-[var(--color-ember-soft)]">language</span>
            .
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/10">
          {pillars.map((p, i) => (
            <motion.div
              key={p.t}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.07 }}
              className="group relative bg-[oklch(0.09_0.012_40)] p-8 sm:p-10 min-h-[220px] flex flex-col justify-between hover:bg-[oklch(0.11_0.014_40)] transition-colors duration-500"
            >
              <span className="text-overline">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-display text-3xl mb-3">{getPillarTitle(p.t)}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{p.d}</p>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--color-ember)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
