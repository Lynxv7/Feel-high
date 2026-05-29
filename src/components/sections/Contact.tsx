import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Instagram, Link, Mail, Youtube } from "lucide-react";

const channels = [
  {
    label: "Bookings",
    Icon: Link,
    value: "Feel High Music",
    href: "https://linktr.ee/feelhighmusic",
  },
  {
    label: "Collabs & Press",
    Icon: Mail,
    value: "feelhighoficial@gmail.com",
    href: "mailto:feelhighoficial@gmail.com",
  },
  {
    label: "Instagram",
    Icon: Instagram,
    value: "@feelhighmusic",
    href: "https://instagram.com/feelhighmusic",
  },
  {
    label: "YouTube",
    Icon: Youtube,
    value: "@FeelHighDJ",
    href: "https://www.youtube.com/@FeelHighDJ",
  },
];

export function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const emailTo = "feelhighoficial@gmail.com";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const subject = `Contato pelo site - ${name.trim()}`;
    const body = [`Nome: ${name.trim()}`, `Telefone: ${phone.trim()}`, "", message.trim()]
      .filter(Boolean)
      .join("\n");

    const mailto = `mailto:${emailTo}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

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
          data-i18n="contact.overline"
        >
          06 / Contato
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="text-display text-5xl sm:text-7xl md:text-8xl mt-6 leading-[0.9]"
        >
          Vamos criar momentos
          <br />
          através da <span className="italic text-[var(--color-ember-soft)]">música</span>.
        </motion.h2>

        <div className="mt-20 grid gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/10 text-left">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px">
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
                <span className="text-overline flex items-center gap-2">
                  <c.Icon className="h-4 w-4 text-white/50" aria-hidden="true" />
                  {c.label}
                </span>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-lg sm:text-xl font-medium truncate">{c.value}</span>
                  <ArrowUpRight className="h-5 w-5 text-white/40 group-hover:text-[var(--color-ember)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
                </div>
              </motion.a>
            ))}
          </div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid gap-6 bg-[oklch(0.09_0.012_40)] p-8 sm:p-10"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-overline">Contato direto</p>
                <h3 className="text-2xl sm:text-3xl font-medium mt-3">Fale com o Feel High</h3>
              </div>
              <ArrowUpRight className="h-6 w-6 text-[var(--color-ember)]" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <label className="flex flex-col gap-2">
                <span className="text-overline">Nome *</span>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  placeholder="Seu nome"
                  className="h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-base text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-ember)]/60"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-overline">Telefone *</span>
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  required
                  placeholder="(00) 00000-0000"
                  className="h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-base text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-ember)]/60"
                />
              </label>
            </div>

            <label className="flex flex-col gap-2">
              <span className="text-overline">Mensagem</span>
              <textarea
                name="message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Conte como podemos ajudar"
                rows={5}
                className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-base text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-ember)]/60"
              />
            </label>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-sm text-white/50">
                Envio via seu app de email. Campos de nome e telefone sao obrigatorios.
              </p>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full border border-[var(--color-ember)]/60 bg-[oklch(0.18_0.03_45/0.7)] px-6 py-3 text-sm uppercase tracking-[0.32em] text-[var(--color-ember)] transition hover:border-[var(--color-ember)]"
              >
                Enviar
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
