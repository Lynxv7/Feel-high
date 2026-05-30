type Language = "pt-BR" | "en";

type Dictionary = Record<string, string>;

type Translations = Record<Language, Dictionary>;

const STORAGE_KEY = "feelhigh.lang";
const LANG_EVENT = "feelhigh:lang";

const translations: Translations = {
  "pt-BR": {
    "nav.artist": "Artista",
    "nav.sound": "Discografia",
    "nav.atmosphere": "Atmosfera",
    "nav.process": "Processo",
    "nav.live": "YouTube",
    "nav.contact": "Contato",
    "nav.soundcloud": "SoundCloud",
    "hero.tagline": "Um projeto sonoro · Mundial",
    "hero.subtitle": "Música para pores do sol, pistas de dança e momentos que ficam com você.",
    "hero.scroll": "Role",
    "sound.overline": "02 / Discografia",
    "sound.title": "Discografia",
    "sound.body":
      "A identidade vira som: faixas oficiais transmitidas direto do SoundCloud, organizadas como uma entrada no universo musical da FEEL HIGH.",
    "atmosphere.overline": "03 / Atmosfera",
    "atmosphere.title.start": "Luz, corpo e movimento em uma",
    "atmosphere.title.emphasis": "atmosfera viva",
    "atmosphere.title.end": ".",
    "artist.overline": "01 / O Artista",
    "artist.title.start": "Uma identidade construída sobre",
    "artist.title.emphasis": "groove",
    "artist.title.end": ", atmosfera e calor brasileiro.",
    "process.overline": "04 / Estilo Feel High",
    "process.title": "Os pilares do estilo Feel High.",
    "process.atmosphere": "Atmosfera",
    "process.groove": "Groove",
    "process.emotion": "Emoção",
    "process.roots": "Brasilidade",
    "process.percussion": "Percussão Orgânica",
    "process.storytelling": "Narrativa",
    "live.overline": "CANAL OFICIAL",
    "live.title.start": "Siga a jornada.",
    "live.title.end": "No YouTube.",
    "live.description.primary":
      "Sets autorais, bastidores, viagens, apresentações e a energia das pistas.",
    "live.description.secondary":
      "Inscreva-se e acompanhe tudo o que acontece no universo FEEL HIGH.",
    "live.button": "Inscrever-se no canal",
    "contact.overline": "06 / Contato",
    "contact.title.start": "Vamos criar momentos",
    "contact.title.middle": "através da",
    "contact.title.emphasis": "música",
    "contact.title.end": ".",
    "contact.form.overline": "Contato direto",
    "contact.form.title": "Fale com o Feel High",
    "contact.form.nameLabel": "Nome *",
    "contact.form.phoneLabel": "Telefone *",
    "contact.form.messageLabel": "Mensagem",
    "contact.form.namePlaceholder": "Seu nome",
    "contact.form.phonePlaceholder": "(00) 00000-0000",
    "contact.form.messagePlaceholder": "Conte como podemos ajudar",
    "contact.form.helper":
      "Envio via seu app de email. Campos de nome e telefone são obrigatórios.",
    "contact.form.submit": "Enviar",
    "contact.email.subject": "Contato pelo site - {name}",
    "contact.email.body.name": "Nome:",
    "contact.email.body.phone": "Telefone:",
    "contact.email.body.message": "Mensagem:",
    "footer.genre":
      "Tech House · Melodic · Afro · Organic · Techno · House · Bass · Brazilian Soul.",
    "footer.sound": "Som",
    "footer.bookings": "Contratações",
    "footer.rights": "© {year} FEEL HIGH",
    "footer.tagline": "Guiado por sentimentos · Mundial",
    "overlay.cta": "Entre no Universo!",
  },
  en: {
    "nav.artist": "Artist",
    "nav.sound": "Discography",
    "nav.atmosphere": "Atmosphere",
    "nav.process": "Process",
    "nav.live": "YouTube",
    "nav.contact": "Contact",
    "nav.soundcloud": "SoundCloud",
    "hero.tagline": "A Sound Project · Worldwide",
    "hero.subtitle": "Music for sunsets, dancefloors and moments that stay with you.",
    "hero.scroll": "Scroll",
    "sound.overline": "02 / Discography",
    "sound.title": "Discography",
    "sound.body":
      "The identity becomes sound: official tracks streamed directly from SoundCloud and arranged as an entry into the FEEL HIGH universe.",
    "atmosphere.overline": "03 / Atmosphere",
    "atmosphere.title.start": "Light, bodies and movement inside a",
    "atmosphere.title.emphasis": "living atmosphere",
    "atmosphere.title.end": ".",
    "artist.overline": "01 / The Artist",
    "artist.title.start": "An identity built on",
    "artist.title.emphasis": "groove",
    "artist.title.end": ", atmosphere and Brazilian warmth.",
    "process.overline": "04 / Feel High Style",
    "process.title": "The pillars of the Feel High style.",
    "process.atmosphere": "Atmosphere",
    "process.groove": "Groove",
    "process.emotion": "Emotion",
    "process.roots": "Brazilian Roots",
    "process.percussion": "Organic Percussion",
    "process.storytelling": "Storytelling",
    "live.overline": "OFFICIAL CHANNEL",
    "live.title.start": "Follow the journey.",
    "live.title.end": "On YouTube.",
    "live.description.primary":
      "Original sets, backstage moments, travels, performances and the energy of the dancefloor.",
    "live.description.secondary":
      "Subscribe and follow everything happening inside the FEEL HIGH universe.",
    "live.button": "Subscribe to the channel",
    "contact.overline": "06 / Contact",
    "contact.title.start": "Let's create moments",
    "contact.title.middle": "through",
    "contact.title.emphasis": "music",
    "contact.title.end": ".",
    "contact.form.overline": "Direct contact",
    "contact.form.title": "Talk to Feel High",
    "contact.form.nameLabel": "Name *",
    "contact.form.phoneLabel": "Phone *",
    "contact.form.messageLabel": "Message",
    "contact.form.namePlaceholder": "Your name",
    "contact.form.phonePlaceholder": "+00 00000-0000",
    "contact.form.messagePlaceholder": "Tell us how we can help",
    "contact.form.helper": "Sent via your email app. Name and phone fields are required.",
    "contact.form.submit": "Send",
    "contact.email.subject": "Website contact - {name}",
    "contact.email.body.name": "Name:",
    "contact.email.body.phone": "Phone:",
    "contact.email.body.message": "Message:",
    "footer.genre":
      "Tech House · Melodic · Afro · Organic · Techno · House · Bass · Brazilian Soul.",
    "footer.sound": "Sound",
    "footer.bookings": "Bookings",
    "footer.rights": "© {year} FEEL HIGH",
    "footer.tagline": "Drive by feelings · Worldwide",
    "overlay.cta": "Enter the universe",
  },
};

let currentLanguage: Language = "pt-BR";

function isLanguage(value: string | null): value is Language {
  return value === "pt-BR" || value === "en";
}

function setHtmlLang(language: Language) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = language;
}

function notify(language: Language) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(LANG_EVENT, { detail: { language } }));
}

export function applyTranslations(language: Language) {
  if (typeof document === "undefined") return;
  const dict = translations[language];

  document.querySelectorAll<HTMLElement>("[data-i18n], [data-i18n-placeholder]").forEach((node) => {
    const key = node.dataset.i18n;
    const year = String(new Date().getFullYear());
    const resolve = (value: string) => value.replace("{year}", year);

    const placeholderKey = node.dataset.i18nPlaceholder;
    if (placeholderKey) {
      const placeholderText = dict[placeholderKey];
      if (placeholderText != null && "placeholder" in node) {
        node.setAttribute("placeholder", resolve(placeholderText));
      }
    }

    if (!key) return;
    const text = dict[key];
    if (text == null) return;
    const resolved = resolve(text);

    if (node.dataset.i18nLetters === "true") {
      node.textContent = "";
      const fragment = document.createDocumentFragment();
      resolved.split("").forEach((char, index) => {
        const span = document.createElement("span");
        span.textContent = char;
        if (char === " ") {
          span.className = "inline-block";
          span.style.width = "0.6em";
        } else {
          span.className = "audio-reveal-letter inline-block";
          span.style.animationDelay = `${index * 60}ms`;
        }
        fragment.appendChild(span);
      });
      node.appendChild(fragment);
      return;
    }

    node.textContent = resolved;
  });
}

export function translate(key: string, language: Language = currentLanguage) {
  return translations[language]?.[key] ?? key;
}

export function setLanguage(language: Language, persist = true) {
  currentLanguage = language;
  setHtmlLang(language);
  applyTranslations(language);

  if (persist && typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, language);
  }

  notify(language);
}

export function initI18n() {
  if (typeof window === "undefined") return currentLanguage;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  const language = isLanguage(stored) ? stored : "pt-BR";
  setLanguage(language, false);
  return language;
}

export function getCurrentLanguage() {
  return currentLanguage;
}

export function getToggleLabel(language: Language) {
  return language === "pt-BR" ? "EN" : "PT";
}

export function toggleLanguage() {
  const next = currentLanguage === "pt-BR" ? "en" : "pt-BR";
  setLanguage(next);
}

export function subscribeToLanguageChange(handler: (language: Language) => void) {
  if (typeof window === "undefined") return () => undefined;
  const listener = (event: Event) => {
    const custom = event as CustomEvent<{ language: Language }>;
    handler(custom.detail.language);
  };
  window.addEventListener(LANG_EVENT, listener);
  return () => window.removeEventListener(LANG_EVENT, listener);
}
