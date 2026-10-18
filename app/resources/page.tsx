"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Download, ExternalLink, FileText, Search, ShieldCheck } from "lucide-react";
import { resources } from "../data";
import { useLocale } from "../components/LocaleContext";

const categories = [
  { id: "all", ne: "सबै", en: "All" },
  { id: "notices", ne: "सूचना", en: "Notices" },
  { id: "forms", ne: "फाराम", en: "Forms" },
  { id: "publications", ne: "प्रकाशन", en: "Publications" },
  { id: "bulletins", ne: "बुलेटिन", en: "Bulletins" },
  { id: "reports", ne: "प्रतिवेदन", en: "Reports" },
  { id: "budgets", ne: "बजेट", en: "Budgets" },
  { id: "policies", ne: "नीति", en: "Policies" },
  { id: "useful-info", ne: "उपयोगी जानकारी", en: "Useful information" },
  { id: "accountability", ne: "जवाफदेहिता", en: "Accountability" },
  { id: "procedures", ne: "कार्यविधि", en: "Procedures" },
];

export default function ResourcesPage() {
  const { lang, t } = useLocale();
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("all");
  const [category, setCategory] = useState("all");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const syncCategory = () => {
      const target = window.location.hash.slice(1);
      setCategory(categories.some((item) => item.id === target) ? target : "all");
    };
    syncCategory();
    window.addEventListener("hashchange", syncCategory);
    return () => window.removeEventListener("hashchange", syncCategory);
  }, []);

  const visible = useMemo(() => resources.filter((item) => {
    const typeMatch = kind === "all" || item.kindEn === kind;
    const categoryMatch = category === "all" || item.category === category;
    return typeMatch && categoryMatch && `${item.title} ${item.titleEn} ${item.audience} ${item.audienceEn}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase());
  }), [kind, category, query]);
  const kinds = [...new Set(resources.map((item) => item.kindEn))];

  return <div className="inner-page">
    <div className="page-intro-band"><div className="wrap"><div className="breadcrumbs"><Link href="/">{t("गृह पृष्ठ", "Home")}</Link><span>/</span><span>{t("फाराम तथा स्रोत", "Forms & resources")}</span></div><span className="eyebrow">{t("खोज्नुहोस् र आधिकारिक स्रोत खोल्नुहोस्", "FIND AND OPEN PUBLIC SOURCES")}</span><h1>{t("फाराम, प्रतिवेदन र प्रकाशनहरू", "Forms, reports, and publications")}</h1><p>{t("YSEF का सार्वजनिक सामग्री र सम्बन्धित सरकारी नीतिहरू विषयअनुसार खोज्नुहोस्।", "Find YSEF public material and related government policies by topic.")}</p></div></div>
    <section className="wrap inner-content">
      <div className="archive-tools resource-tools"><label className="archive-search"><Search size={18} aria-hidden="true" /><input aria-label={t("कागजात वा लक्षित समूह खोज्नुहोस्", "Search documents or audience")} value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t("कागजात वा लक्षित समूह खोज्नुहोस्", "Search documents or audience")} /></label><label className="filter-select-label"><span>{t("कागजातको प्रकार", "Document type")}</span><select value={kind} onChange={(e) => setKind(e.target.value)}><option value="all">{t("सबै प्रकार", "All types")}</option>{kinds.map((item) => { const localized = resources.find((resource) => resource.kindEn === item); return <option key={item} value={item}>{lang === "ne" ? localized?.kind : item}</option>; })}</select></label></div>
      <div className="resource-category-tabs" role="group" aria-label={t("स्रोतको वर्ग", "Resource category")}>
        {categories.map((item) => <button id={item.id === "reports" || item.id === "budgets" || item.id === "publications" || item.id === "bulletins" || item.id === "useful-info" ? item.id : undefined} type="button" key={item.id} className={category === item.id ? "selected" : ""} aria-pressed={category === item.id} onClick={() => { setCategory(item.id); if (item.id === "all") history.replaceState(null, "", "/resources"); else history.replaceState(null, "", `/resources#${item.id}`); }}>{lang === "ne" ? item.ne : item.en}</button>)}
      </div>
      <div className="archive-count" aria-live="polite">{lang === "ne" ? `${visible.length} स्रोत` : `${visible.length} resources`}<span className="sample-pill">{t("मूल स्रोत तथा नमूना सामग्री", "Official sources and sample items")}</span></div>
      <div className="resource-library">{visible.map((item) => <article className="resource-item" key={item.id} id={item.id}><span className="resource-file-icon"><FileText size={22} /></span><div className="resource-item-main"><span className="resource-kind">{lang === "ne" ? item.kind : item.kindEn}</span><h2>{lang === "ne" ? item.title : item.titleEn}</h2><p>{lang === "ne" ? `लक्षित समूह: ${item.audience}` : `For: ${item.audienceEn}`}</p><small>{lang === "ne" ? item.format : item.formatEn}</small>{!item.sourceUrl && <small className="sample-source-label">{t("नमूना सामग्री", "Illustrative sample")}</small>}</div>{item.sourceUrl ? <a className="download-button" href={item.sourceUrl} target="_blank" rel="noopener noreferrer"><ExternalLink size={17} /><span>{t("आधिकारिक स्रोत खोल्नुहोस्", "Open source")}</span></a> : <button className="download-button" type="button" onClick={() => setNotice(lang === "ne" ? `${item.title} नमूना विवरण हो। यस सामग्रीको आधिकारिक फाइल उपलब्ध छैन।` : `${item.titleEn} is illustrative sample information. No official file is attached.`)}><Download size={17} /><span>{t("नमूना", "Sample")}</span></button>}</article>)}</div>
      {!visible.length && <div className="empty-state"><Search size={22} /><h2>{t("कागजात भेटिएन", "No documents found")}</h2><p>{t("अर्को शब्द वा प्रकारबाट खोज्नुहोस्।", "Try another search term or type.")}</p></div>}
      <div className="resource-security-note"><ShieldCheck size={20} /><p>{t("लिङ्कहरूले YSEF वा सम्बन्धित सरकारी मूल स्रोत खोल्छन्। आवेदनअघि मिति, संस्करण र हालको योग्यता त्यहाँ पुष्टि गर्नुहोस्।", "Links open YSEF or related government source pages. Confirm the current date, version, and eligibility before applying.")}</p></div>
      {notice && <div className="toast-note" role="status"><span>{notice}</span><button type="button" onClick={() => setNotice("")}>{t("बन्द", "Close")}</button></div>}
    </section>
  </div>;
}
