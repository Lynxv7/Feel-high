import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const channels = [
  { label: "Bookings", value: "bookings@feelhigh.music", href: "mailto:bookings@feelhigh.music" },
  { label: "Collabs & Press", value: "hello@feelhigh.music", href: "mailto:hello@feelhigh.music" },
  { label: "Instagram", value: "@feelhighmusic", href: "https://instagram.com/feelhighmusic" },
];

export function Contact() {
  return (
    <section id="contact" className="relative py-32 sm:py-48 px-6 sm:px-10 overflow-hidden">
      <div className="absolute inset-0 bg-glow-ember opacity-60 pointer-events-none" />
      <div className="relative mx-auto max-w-5xl text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-overline"
        >
          05 / Contact
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="text-display text-5xl sm:text-7xl md:text-8xl mt-6 leading-[0.9]"
        >
          Let's create moments
          <br />
          through <span className="italic text-[var(--color-ember-soft)]">music</span>.
        </motion.h2>

        <div className="mt-20 grid sm:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/10 text-left">
          {channels.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="group relative bg-[oklch(0.09_0.012_40)] hover:bg-[oklch(0.12_0.014_40)] transition-colors p-8 flex flex-col gap-6"
            >
              <span className="text-overline">{c.label}</span>
              <div className="flex items-center justify-between gap-4">
                <span className="text-lg sm:text-xl font-medium truncate">{c.value}</span>
                <ArrowUpRight className="h-5 w-5 text-white/40 group-hover:text-[var(--color-ember)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
