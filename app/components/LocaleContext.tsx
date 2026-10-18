"use client";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
export type Language = "ne" | "en";
type LocaleContextValue = { lang: Language; setLang: (lang: Language) => void; t: (ne: string, en: string) => string };
const LocaleContext = createContext<LocaleContextValue | null>(null);
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("ne");
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const value = useMemo(() => ({ lang, setLang, t: (ne: string, en: string) => lang === "ne" ? ne : en }), [lang]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
export function useLocale() { const value = useContext(LocaleContext); if (!value) throw new Error("useLocale must be used inside LocaleProvider"); return value; }
