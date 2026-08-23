"use client";

import { createContext, useContext, useSyncExternalStore } from "react";

type Language = "en" | "ne";
type Dictionary = Record<string, { en: string; ne: string }>;

const dictionary: Dictionary = {
  home: { en: "Home", ne: "गृहपृष्ठ" }, about: { en: "About us", ne: "हाम्रो बारेमा" }, events: { en: "Events", ne: "कार्यक्रमहरू" }, notices: { en: "Notices", ne: "सूचनाहरू" }, staff: { en: "Staff", ne: "शिक्षक तथा कर्मचारी" }, contact: { en: "Contact", ne: "सम्पर्क" }, login: { en: "Login", ne: "लगइन" },
  learn: { en: "Learn more", ne: "थप जान्नुहोस्" }, allNotices: { en: "All notices", ne: "सबै सूचनाहरू" }, viewPdf: { en: "View PDF", ne: "PDF हेर्नुहोस्" },
  welcome: { en: "Welcome to Bhanubhakta", ne: "भानुभक्तमा स्वागत छ" }, submit: { en: "Send inquiry", ne: "जिज्ञासा पठाउनुहोस्" },
};

type LanguageContextValue = { language: Language; setLanguage: (language: Language) => void; t: (key: keyof typeof dictionary) => string };
const LanguageContext = createContext<LanguageContextValue | null>(null);
const languageEvent = "school-language-change";

function readLanguage(): Language {
  if (typeof window === "undefined") return "ne";
  const saved = localStorage.getItem("school-language");
  return saved === "en" || saved === "ne" ? saved : "ne";
}

function subscribeToLanguage(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(languageEvent, callback);
  return () => { window.removeEventListener("storage", callback); window.removeEventListener(languageEvent, callback); };
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // The server snapshot guarantees the first browser render matches SSR, preventing hydration errors.
  const language = useSyncExternalStore<Language>(subscribeToLanguage, readLanguage, () => "ne");
  const setLanguage = (value: Language) => { localStorage.setItem("school-language", value); window.dispatchEvent(new Event(languageEvent)); };
  return <LanguageContext.Provider value={{ language, setLanguage, t: (key) => dictionary[key][language] }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}

export function LocalizedText({ en, ne, as: Tag = "span", className }: { en: string; ne: string; as?: "span" | "p" | "h1" | "h2" | "h3"; className?: string }) {
  const { language } = useLanguage();
  return <Tag className={className}>{language === "ne" ? ne : en}</Tag>;
}

