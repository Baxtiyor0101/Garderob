import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Translation files
import translationUz from "./locales/uzLatin/translation.json";
import translationRu from "./locales/ru/translation.json";
import translationEn from "./locales/uzCryl/translation.json";

const resources = {
  "O‘z": { translation: translationUz },
  Ру: { translation: translationRu },
  Ўз: { translation: translationEn },
};

i18n
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // Connects i18n to React
  .init({
    resources,
    fallbackLng: "O‘z",
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
