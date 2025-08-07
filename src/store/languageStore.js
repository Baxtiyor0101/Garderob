// src/store/languageStore.js or .ts
import { create } from "zustand";
import i18n from "i18next";

const useLanguageStore = create((set) => ({
  language: "uz", // default
  setLanguage: (lang) => {
    i18n.changeLanguage(lang);
    set({ language: lang });
  },
}));

export default useLanguageStore;
