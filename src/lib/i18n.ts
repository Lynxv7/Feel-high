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
    "nav.live": "Live Experience",
    "nav.contact": "Contato",
    "nav.soundcloud": "SoundCloud",
    "hero.tagline": "Um projeto sonoro · Mundial",
    "hero.subtitle": "Música para pores do sol, pistas de dança e momentos que ficam com você.",
    "hero.scroll": "Role",
    "sound.overline": "02 / Discografia",
    "sound.title": "Discografia.",
    "sound.body":
      "A identidade vira som: faixas oficiais transmitidas direto do SoundCloud, organizadas como uma entrada no universo musical da FEEL HIGH.",
    "atmosphere.overline": "03 / Atmosfera",
    "atmosphere.title": "Luz, corpo e movimento em uma atmosfera viva.",
    "process.overline": "04 / Processo Artístico",
    "process.title": "Seis pilares de um som.",
    "process.atmosphere": "Atmosfera",
    "process.groove": "Groove",
    "process.emotion": "Emoção",
    "process.roots": "Raízes Brasileiras",
    "process.percussion": "Percussão Orgânica",
    "process.storytelling": "Narrativa",
    "live.overline": "05 / Live Experience",
    "live.title": "Onde groove, atmosfera e movimento se tornam um..",
    "live.description":
      "Uma experiência construída para ler o ambiente, elevar a energia e transformar cada transição em narrativa.",
    "contact.overline": "06 / Contato",
    "contact.title": "Vamos criar momentos através da música.",
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
    "nav.live": "Live",
    "nav.contact": "Contact",
    "nav.soundcloud": "SoundCloud",
    "hero.tagline": "A Sound Project · Worldwide",
    "hero.subtitle": "Music for sunsets, dancefloors and moments that stay with you.",
    "hero.scroll": "Scroll",
    "sound.overline": "02 / Discography",
    "sound.title": "Discography.",
    "sound.body":
      "The identity becomes sound: official tracks streamed directly from SoundCloud and arranged as an entry into the FEEL HIGH universe.",
    "atmosphere.overline": "03 / Atmosphere",
    "atmosphere.title": "Light, bodies and movement inside a living atmosphere.",
    "process.overline": "04 / Process",
    "process.title": "Six pillars of a sound.",
    "process.atmosphere": "Atmosphere",
    "process.groove": "Groove",
    "process.emotion": "Emotion",
    "process.roots": "Brazilian Roots",
    "process.percussion": "Organic Percussion",
    "process.storytelling": "Storytelling",
    "live.overline": "05 / Live Experience",
    "live.title": "Where groove, atmosphere and movement become one..",
    "live.description":
      "An experience built to read the room, raise the energy and turn each transition into narrative.",
    "contact.overline": "06 / Contact",
    "contact.title": "Let's create moments through music.",
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

  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (!key) return;
    const text = dict[key];
    if (text == null) return;
    const year = String(new Date().getFullYear());
    const resolved = text.replace("{year}", year);

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
