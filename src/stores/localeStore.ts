import { create } from "zustand";
import { persist } from "zustand/middleware";
import { translations, type Locale, type TranslationKey } from "@/lib/i18n";

interface LocaleStore {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (key: TranslationKey, vars?: Record<string, string>) => string;
}

export const useLocaleStore = create<LocaleStore>()(
  persist(
    (set, get) => ({
      locale: "fr",
      setLocale: (locale) => set({ locale }),
      toggleLocale: () =>
        set((state) => ({ locale: state.locale === "en" ? "fr" : "en" })),
      t: (key, vars) => {
        const { locale } = get();
        let text: string = translations[key]?.[locale] ?? key;
        if (vars) {
          for (const [k, v] of Object.entries(vars)) {
            text = text.replace(`{${k}}`, v);
          }
        }
        return text;
      },
    }),
    {
      name: "anas-os-locale",
      partialize: (state) => ({ locale: state.locale }),
    }
  )
);
