import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Instagram, Link, Mail, Youtube } from "lucide-react";
import { getCurrentLanguage, translate } from "@/lib/i18n";

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

    const language = getCurrentLanguage();
    const subject = translate("contact.email.subject", language).replace("{name}", name.trim());
    const bodyParts = [
      `${translate("contact.email.body.name", language)} ${name.trim()}`,
      `${translate("contact.email.body.phone", language)} ${phone.trim()}`,
    ];
    if (message.trim()) {
      bodyParts.push("", `${translate("contact.email.body.message", language)} ${message.trim()}`);
    }
    const body = bodyParts.join("\n");

    const mailto = `mailto:${emailTo}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-4 py-20 sm:px-8 sm:py-32 lg:px-10 lg:py-48"
    >
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
          className="mt-5 text-display text-4xl leading-[0.96] min-[380px]:text-5xl sm:mt-6 sm:text-7xl sm:leading-[0.92] md:text-8xl"
        >
          <span data-i18n="contact.title.start">Vamos criar momentos</span>
          <br />
          <span data-i18n="contact.title.middle">através da</span>{" "}
          <span
            className="italic text-[var(--color-ember-soft)]"
            data-i18n="contact.title.emphasis"
          >
            música
          </span>
          <span data-i18n="contact.title.end">.</span>
        </motion.h2>

        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left sm:mt-16 lg:mt-20">
          <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-4">
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
                className="group relative flex flex-col gap-5 bg-[oklch(0.09_0.012_40)] p-5 transition-colors hover:bg-[oklch(0.12_0.014_40)] sm:p-7 lg:p-8"
              >
                <span className="text-overline flex items-center gap-2">
                  <c.Icon className="h-4 w-4 text-white/50" aria-hidden="true" />
                  {c.label}
                </span>
                <div className="flex items-center justify-between gap-4">
                  <span className="min-w-0 truncate text-base font-medium sm:text-lg xl:text-xl">
                    {c.value}
                  </span>
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
            className="grid gap-6 bg-[oklch(0.09_0.012_40)] p-5 sm:p-8 lg:p-10"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-overline" data-i18n="contact.form.overline">
                  Contato direto
                </p>
                <h3
                  className="mt-3 text-2xl font-medium sm:text-3xl"
                  data-i18n="contact.form.title"
                >
                  Fale com o Feel High
                </h3>
              </div>
              <ArrowUpRight className="h-6 w-6 text-[var(--color-ember)]" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <label className="flex flex-col gap-2">
                <span className="text-overline" data-i18n="contact.form.nameLabel">
                  Nome *
                </span>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  placeholder="Seu nome"
                  data-i18n-placeholder="contact.form.namePlaceholder"
                  className="h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-base text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-ember)]/60"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-overline" data-i18n="contact.form.phoneLabel">
                  Telefone *
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  required
                  placeholder="(00) 00000-0000"
                  data-i18n-placeholder="contact.form.phonePlaceholder"
                  className="h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-base text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-ember)]/60"
                />
              </label>
            </div>

            <label className="flex flex-col gap-2">
              <span className="text-overline" data-i18n="contact.form.messageLabel">
                Mensagem
              </span>
              <textarea
                name="message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Conte como podemos ajudar"
                data-i18n-placeholder="contact.form.messagePlaceholder"
                rows={5}
                className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-base text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-ember)]/60"
              />
            </label>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-sm leading-6 text-white/55" data-i18n="contact.form.helper">
                Envio via seu app de email. Campos de nome e telefone são obrigatórios.
              </p>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-full border border-[var(--color-ember)]/60 bg-[oklch(0.18_0.03_45/0.7)] px-6 py-3 text-sm uppercase tracking-[0.22em] text-[var(--color-ember)] transition hover:border-[var(--color-ember)] sm:w-auto sm:tracking-[0.32em]"
                data-i18n="contact.form.submit"
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
