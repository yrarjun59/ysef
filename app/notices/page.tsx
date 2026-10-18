"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CalendarDays, Search } from "lucide-react";
import { notices } from "../data";
import { useLocale } from "../components/LocaleContext";
export default function NoticesPage() {
  const { lang, t } = useLocale();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    const syncQuery = () => setQuery(new URLSearchParams(window.location.search).get("q") || "");
    syncQuery();
    window.addEventListener("popstate", syncQuery);
    return () => window.removeEventListener("popstate", syncQuery);
  }, []);
  const visible = useMemo(() => notices.filter((notice) => {
    const matchesFilter = filter === "all" || (filter === "archive" ? notice.status === "archive" : notice.status !== "archive");
    const haystack = `${notice.title} ${notice.titleEn} ${notice.type} ${notice.typeEn} ${notice.audience} ${notice.audienceEn}`.toLocaleLowerCase();
    return matchesFilter && haystack.includes(query.trim().toLocaleLowerCase());
  }), [filter, query]);
  return <div className="inner-page"><div className="page-intro-band"><div className="wrap"><div className="breadcrumbs"><Link href="/">{t("गृह पृष्ठ", "Home")}</Link><span>/</span><span>{t("सूचना तथा समाचार", "Notices & updates")}</span></div><span className="eyebrow">{t("ताजा जानकारी", "LATEST INFORMATION")}</span><h1>{t("सूचना र अपडेट", "Notices and updates")}</h1><p>{t("कार्यक्रम, सेवा, तालिम र सार्वजनिक जानकारीसम्बन्धी सूचनाहरू खोज्नुहोस्।", "Find notices about programmes, services, training, and public information.")}</p></div></div>
    <section className="wrap inner-content"><div className="archive-tools"><label className="archive-search"><Search size={18} aria-hidden="true" /><input aria-label={t("सूचना वा लक्षित समूह खोज्नुहोस्", "Search notices or audience")} value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t("सूचना वा लक्षित समूह खोज्नुहोस्", "Search notices or audience")} /></label><div className="filter-tabs" role="group" aria-label={t("सूचनाको अवस्था अनुसार छनोट", "Filter notices by status")}>{[{ id: "all", ne: "सबै सूचना", en: "All notices" }, { id: "current", ne: "हालका", en: "Current" }, { id: "archive", ne: "अभिलेख", en: "Archive" }].map((item) => <button type="button" key={item.id} className={filter === item.id ? "selected" : ""} aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>{lang === "ne" ? item.ne : item.en}</button>)}</div></div>
      <div className="archive-count" aria-live="polite">{lang === "ne" ? `${visible.length} वटा सूचना` : `${visible.length} notices`}<span className="sample-pill">{t("नमूना सामग्री", "Sample content")}</span></div>
      {visible.length ? <div className="notice-list archive-list">{visible.map((notice) => <Link key={notice.slug} href={`/notices/${notice.slug}`} className="notice-row"><span className={`notice-status status-${notice.status}`}>{notice.status === "urgent" ? t("म्याद नजिक", "Deadline soon") : notice.status === "archive" ? t("अभिलेख", "Archived") : t("हालको", "Current")}</span><span className="notice-content"><strong>{lang === "ne" ? notice.title : notice.titleEn}</strong><small>{lang === "ne" ? notice.audience : notice.audienceEn}</small></span><span className="notice-date"><CalendarDays size={14} />{lang === "ne" ? notice.date : notice.dateEn}</span><ArrowRight size={16} className="notice-arrow" /></Link>)}</div> : <div className="empty-state"><Search size={22} /><h2>{t("सूचना भेटिएन", "No notices found")}</h2><p>{t("खोजी शब्द परिवर्तन गरेर फेरि प्रयास गर्नुहोस्।", "Change your search terms and try again.")}</p><button className="button button-outline" onClick={() => { setQuery(""); setFilter("all"); }}>{t("सबै सूचना देखाउनुहोस्", "Show all notices")}</button></div>}
      <p className="content-sample-note">{t("सूचना, मिति र अवस्था उदाहरणका लागि मात्र हुन्।", "Notice content, dates, and status are illustrative only.")}</p>
    </section>
  </div>;
}
