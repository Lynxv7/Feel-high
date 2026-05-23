import { useEffect, useState } from "react";
import { getToggleLabel, initI18n, subscribeToLanguageChange, toggleLanguage } from "@/lib/i18n";

type Language = "pt-BR" | "en";

export function LanguageToggle() {
  const [language, setLanguage] = useState<Language>("pt-BR");

  useEffect(() => {
    const initial = initI18n();
    setLanguage(initial);
    return subscribeToLanguageChange(setLanguage);
  }, []);

  return (
    <button
      type="button"
      onClick={() => toggleLanguage()}
      className="fixed right-4 top-4 z-[70] rounded-full border border-white/20 bg-black/50 px-3 py-2 text-[11px] uppercase tracking-[0.3em] text-white/80 transition hover:text-white hover:border-white/50"
      aria-label="Language toggle"
    >
      {getToggleLabel(language)}
    </button>
  );
}
