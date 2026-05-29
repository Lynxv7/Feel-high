import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { BookOpen, Drum, Heart, Leaf, Waves, Disc3 } from "lucide-react";
import { getCurrentLanguage, subscribeToLanguageChange } from "@/lib/i18n";

type Language = "pt-BR" | "en";

const pillars = [
  {
    t: "process.atmosphere",
    d: {
      "pt-BR":
        "Cada som nasce de um ambiente: luz, temperatura e sensacao antes da primeira batida.",
      en: "Every sound starts with a room, a light and a feeling before the first beat.",
    },
    Icon: Waves,
  },
  {
    t: "process.groove",
    d: {
      "pt-BR": "Fluido, paciente e feito para o corpo responder antes da mente explicar.",
      en: "Fluid, patient and made for the body to answer before the mind explains.",
    },
    Icon: Disc3,
  },
  {
    t: "process.emotion",
    d: {
      "pt-BR": "Harmonias que respiram, crescem devagar e deixam espaço para sentir.",
      en: "Harmonies that breathe, grow slowly and leave space for feeling.",
    },
    Icon: Heart,
  },
  {
    t: "process.roots",
    d: {
      "pt-BR": "Calor, sotaque ritmico e uma brasilidade elegante dentro da pista.",
      en: "Warmth, rhythmic accent and elegant Brazilian identity inside the dancefloor.",
    },
    Icon: Leaf,
  },
  {
    t: "process.percussion",
    d: {
      "pt-BR": "Mãos, madeira, pele e textura organica por baixo dos sintetizadores.",
      en: "Hands, wood, skin and organic texture beneath the synthesizers.",
    },
    Icon: Drum,
  },
  {
    t: "process.storytelling",
    d: {
      "pt-BR": "Sets que se revelam como capitulos, nao como uma simples playlist.",
      en: "Sets that unfold like chapters, not like a simple playlist.",
    },
    Icon: BookOpen,
  },
];

const translations: Record<string, Record<string, string>> = {
  "pt-BR": {
    "process.atmosphere": "Atmosfera",
    "process.groove": "Groove",
    "process.emotion": "Emoção",
    "process.roots": "Raizes Brasileiras",
    "process.percussion": "Percussao Organica",
    "process.storytelling": "Narrativa",
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

function getPillarTitle(key: string, language: Language): string {
  return translations[language]?.[key] || key;
}

function getPillarDescription(description: (typeof pillars)[number]["d"], language: Language) {
  return description[language] || description["pt-BR"];
}

export function Process() {
  const [language, setLanguage] = useState<Language>(getCurrentLanguage());

  useEffect(() => subscribeToLanguageChange(setLanguage), []);

  return (
    <section id="process" className="relative px-6 py-28 sm:px-10 sm:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,oklch(0.74_0.2_42/0.08),transparent_48%)] pointer-events-none" />
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-3xl mb-20"
        >
          <span className="text-overline" data-i18n="process.overline">
            04 / Processo Artístico
          </span>
          <h2 className="text-display text-5xl sm:text-7xl mt-4" data-i18n="process.title">
            Seis pilares de um som.
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.div
              key={p.t}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.07 }}
              className="group relative min-h-[208px] overflow-hidden border border-white/10 bg-[oklch(0.075_0.01_40/0.72)] p-7 transition-colors duration-500 hover:border-[var(--color-ember)]/35 hover:bg-[oklch(0.1_0.014_40/0.86)] sm:p-8"
            >
              <div className="flex items-start justify-between gap-6">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-[var(--color-ember)] transition group-hover:border-[var(--color-ember)]/45 group-hover:bg-[var(--color-ember)]/10">
                  <p.Icon className="h-4 w-4" />
                </span>
                <span className="text-overline text-white/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-display text-3xl mb-3">{getPillarTitle(p.t, language)}</h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {getPillarDescription(p.d, language)}
                </p>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--color-ember)]/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
