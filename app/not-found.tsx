"use client";

import Link from "next/link";
import { ArrowRight, House } from "lucide-react";
import { useLocale } from "./components/LocaleContext";

export default function NotFound() {
  const { t } = useLocale();
  return <section className="wrap not-found not-found-page">
    <span className="eyebrow">404 · {t("पृष्ठ भेटिएन", "PAGE NOT FOUND")}</span>
    <h1>{t("हामीले त्यो पृष्ठ भेट्टाउन सकेनौँ।", "We couldn’t find that page.")}</h1>
    <p>{t("ठेगाना जाँच्नुहोस् वा उपलब्ध सेवाहरू, सूचना र स्रोतहरूबाट अगाडि बढ्नुहोस्।", "Check the address or continue with services, notices, and resources.")}</p>
    <div className="not-found-actions">
      <Link className="button button-primary" href="/">{t("गृह पृष्ठमा जानुहोस्", "Go to the home page")}<House size={16} /></Link>
      <Link className="text-link" href="/services">{t("सबै सेवाहरू हेर्नुहोस्", "Browse services")}<ArrowRight size={16} /></Link>
    </div>
  </section>;
}
