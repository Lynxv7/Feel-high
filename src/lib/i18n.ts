type Language = "pt-BR" | "en";

type Dictionary = Record<string, string>;

type Translations = Record<Language, Dictionary>;

const STORAGE_KEY = "feelhigh.lang";
const LANG_EVENT = "feelhigh:lang";

const translations: Translations = {
  "pt-BR": {
    "nav.sound": "Som",
    "nav.atmosphere": "Atmosfera",
    "nav.live": "Ao vivo",
    "nav.process": "Processo",
    "nav.contact": "Contato",
    "nav.soundcloud": "SoundCloud",
    "hero.tagline": "Um projeto sonoro · Mundial",
    "hero.subtitle": "Musica para pores do sol, pistas de danca e momentos que ficam com voce.",
    "hero.scroll": "Role",
    "sound.overline": "01 / Som",
    "sound.title": "A colecao.",
    "sound.body":
      "Lancamentos oficiais transmitidos direto do SoundCloud. Toque qualquer faixa e o player global acompanha o catalogo.",
    "footer.genre":
      "Tech House · Melodic · Afro · Organic · Techno · House · Bass · Brazilian Soul.",
    "footer.sound": "Som",
    "footer.bookings": "Contratacoes",
    "footer.rights": "© {year} FEEL HIGH",
    "footer.tagline": "Guiado por sentimentos · Mundial",
    "overlay.cta": "Entre no Universo!",
  },
  en: {
    "nav.sound": "Sound",
    "nav.atmosphere": "Atmosphere",
    "nav.live": "Live",
    "nav.process": "Process",
    "nav.contact": "Contact",
    "nav.soundcloud": "SoundCloud",
    "hero.tagline": "A Sound Project · Worldwide",
    "hero.subtitle": "Music for sunsets, dancefloors and moments that stay with you.",
    "hero.scroll": "Scroll",
    "sound.overline": "01 / Sound",
    "sound.title": "The collection.",
    "sound.body":
      "Official releases streamed directly through SoundCloud. Tap any track and the global player follows the catalog.",
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
