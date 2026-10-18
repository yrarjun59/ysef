"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Bell, BellRing, BriefcaseBusiness, ChevronDown, ChevronUp, ExternalLink, FileText, House, Landmark, LockKeyhole, Menu, Search, X } from "lucide-react";
import { useLocale } from "./LocaleContext";
import NepalDateTime from "./NepalDateTime";
import { services, notices, resources, officials, galleryAlbums } from "../data";

const navGroups = [
  { id: "about", ne: "हाम्रोबारे", en: "About", items: [
    { href: "/about", ne: "परिचय र पृष्ठभूमि", en: "Introduction and background" },
    { href: "/officials", ne: "अधिकारी र कर्मचारी", en: "Officials and employees" },
    { href: "/about#facilitators", ne: "असुली सहजकर्ता", en: "Recovery facilitators" },
    { href: "/about#organization", ne: "संगठन संरचना", en: "Organization structure" },
    { href: "/about#charter", ne: "नागरिक बडापत्र", en: "Citizen charter" },
    { href: "/about#goals", ne: "लक्ष्य र दृष्टि", en: "Target and vision" },
    { href: "/about#board", ne: "सञ्चालक समिति", en: "Board of Directors" },
  ] },
  { id: "services", ne: "सेवाहरू", en: "Services", items: [
    { href: "/services", ne: "सबै सेवाहरू", en: "All services" },
    { href: "/services/insurance-premium", ne: "बीमा प्रिमियम", en: "Insurance premium support" },
    { href: "/services/low-interest-rate", ne: "न्यून ब्याजदर", en: "Lower interest rate" },
    { href: "/services/interest-subsidy", ne: "ब्याज अनुदान", en: "Interest subsidy" },
    { href: "/services/product-marketing", ne: "उत्पादनको बजारीकरण", en: "Product marketing" },
    { href: "/services/concessional-business-loan", ne: "सहुलियतपूर्ण व्यवसायिक कर्जा", en: "Concessional business loan" },
    { href: "/services/business-orientation", ne: "व्यवसायिक अभिमुखीकरण तालिम", en: "Business orientation training" },
  ] },
  { id: "information", ne: "सूचना केन्द्र", en: "Information", items: [
    { href: "/notices", ne: "सूचनाहरू", en: "Notices" },
    { href: "/about#disclosure", ne: "स्वतः प्रकाशन", en: "Proactive disclosure" },
    { href: "/resources#reports", ne: "वार्षिक प्रतिवेदन", en: "Annual reports" },
    { href: "/resources#budgets", ne: "बजेट", en: "Budgets" },
    { href: "/resources#useful-info", ne: "उपयोगी जानकारी", en: "Useful information" },
  ] },
  { id: "media", ne: "मिडिया केन्द्र", en: "Media center", items: [
    { href: "/notices", ne: "सूचनाहरू", en: "Notices" },
    { href: "/resources#bulletins", ne: "बुलेटिन", en: "Bulletins" },
    { href: "/resources#publications", ne: "प्रकाशनहरू", en: "Publications" },
    { href: "/gallery#videos", ne: "भिडियोहरू", en: "Videos" },
    { href: "/gallery", ne: "फोटो ग्यालरी", en: "Photo gallery" },
    { href: "/gallery-list", ne: "तस्बिर सङ्ग्रह सूची", en: "Photo album list" },
  ] },
  { id: "downloads", ne: "डाउनलोडहरू", en: "Downloads", items: [
    { href: "/resources", ne: "फाराम, प्रतिवेदन र नीतिहरू", en: "Forms, reports, and policies" },
  ] },
];
const registrationUrl = "https://register.ysefgov.com/apply";

export default function SiteHeader() {
  const { lang, setLang, t } = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [officialOpen, setOfficialOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [portalInfo, setPortalInfo] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const aboutOrContact = pathname === "/about" || pathname === "/contact";

  useEffect(() => {
    if (!mobileOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [mobileOpen]);

  useEffect(() => {
    if (!openMenu) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [openMenu]);

  const results = useMemo(() => {
    const q = query.trim().toLocaleLowerCase();
    if (!q) return [];
    return [
      ...services.filter((item) => `${item.title} ${item.titleEn} ${item.short} ${item.shortEn}`.toLocaleLowerCase().includes(q)).map((item) => ({ title: lang === "ne" ? item.title : item.titleEn, href: `/services/${item.slug}`, type: t("सेवा", "Service") })),
      ...notices.filter((item) => `${item.title} ${item.titleEn} ${item.audience} ${item.audienceEn}`.toLocaleLowerCase().includes(q)).map((item) => ({ title: lang === "ne" ? item.title : item.titleEn, href: `/notices/${item.slug}`, type: t("सूचना", "Notice") })),
      ...resources.filter((item) => `${item.title} ${item.titleEn}`.toLocaleLowerCase().includes(q)).map((item) => ({ title: lang === "ne" ? item.title : item.titleEn, href: `/resources#${item.id}`, type: t("स्रोत", "Resource") })),
      ...officials.filter((item) => `${item.name} ${item.nameEn} ${item.role} ${item.roleEn}`.toLocaleLowerCase().includes(q)).map((item) => ({ title: lang === "ne" ? item.name : item.nameEn, href: `/officials#${item.id}`, type: t("अधिकारी", "Official") })),
      ...galleryAlbums.filter((item) => `${item.title} ${item.titleEn}`.toLocaleLowerCase().includes(q)).map((item) => ({ title: lang === "ne" ? item.title : item.titleEn, href: `/gallery#${item.id}`, type: t("तस्बिर", "Photo") })),
    ].slice(0, 8);
  }, [lang, query, t]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (results[0]) router.push(results[0].href);
    else if (query.trim()) router.push(`/notices?q=${encodeURIComponent(query.trim())}`);
    setSearchOpen(false);
  }

  return <>
    <a className="skip-link" href="#main-content">{t("मुख्य सामग्रीमा जानुहोस्", "Skip to main content")}</a>
    <section className="official-banner" aria-label={t("सरकारी वेबसाइट पहिचान", "Government website identity")}>
      <div className="official-inner">
        <span className="official-mark" aria-hidden="true">🇳🇵</span>
        <span className="official-copy">An official website of the Government of Nepal</span>
        <button type="button" className="official-toggle" aria-expanded={officialOpen} onClick={() => setOfficialOpen((v) => !v)}>
          Here’s how you know
          {officialOpen ? <ChevronUp size={15} aria-hidden="true" /> : <ChevronDown size={15} aria-hidden="true" />}
        </button>
      </div>
      {officialOpen && <div className="official-details">
        <div className="official-detail-item"><span className="official-detail-icon official-detail-icon-government" aria-hidden="true"><Landmark size={17} /></span><div><strong>{t("सरकारी वेबसाइटमा .gov.np हुन्छ", "Government websites use .gov.np")}</strong><p>{t("नेपाल सरकारका वेबसाइट .gov.np डोमेनमा हुन्छन्। आधिकारिक YSEF साइट ysef.gov.np हो। यो पुनःडिजाइन स्थानीय नमूना मात्र हो।", "Nepal government websites use the .gov.np domain. The official YSEF site is ysef.gov.np. This redesign is a local prototype, not an official government service.")}</p><a className="official-reference-link" href="https://ysef.gov.np/" target="_blank" rel="noopener noreferrer">{t("आधिकारिक YSEF वेबसाइट खोल्नुहोस्", "Visit official YSEF website")}<ExternalLink size={12} aria-hidden="true" /></a></div></div>
        <div className="official-detail-item"><span className="official-detail-icon official-detail-icon-secure" aria-hidden="true"><LockKeyhole size={17} /></span><div><strong>{t("सुरक्षित वेबसाइटले HTTPS प्रयोग गर्छन्", "Secure websites use HTTPS")}</strong><p>{t("ताला चिन्ह वा https:// ले जडान सुरक्षित भएको देखाउँछ। यसले वेबसाइट सरकारी हो भनेर मात्र प्रमाणित गर्दैन। व्यक्तिगत जानकारी दिनुअघि ysef.gov.np ठेगाना जाँच्नुहोस्।", "A lock or https:// means your connection is encrypted. It does not by itself prove a site is official. Check for ysef.gov.np before sharing personal information.")}</p></div></div>
      </div>}
    </section>
    <div className="prototype-ribbon"><span className="prototype-dot" />{t("पुनःडिजाइन नमूना · आधिकारिक सरकारी सेवा होइन", "Redesign prototype · Not an official government service")}</div>
    <aside className="important-notice-strip" aria-label={t("महत्त्वपूर्ण सूचना", "Important notices")}>
      <div className="important-notice-label"><BellRing size={15} aria-hidden="true" /><strong>{t("महत्त्वपूर्ण सूचना", "Important notices")}</strong><span>{t("नमूना", "SAMPLE")}</span></div>
      <div className="important-notice-links">{notices.slice(0, 3).map((notice) => <Link key={notice.slug} href={`/notices/${notice.slug}`}>{lang === "ne" ? notice.title : notice.titleEn}</Link>)}</div>
      <Link className="important-notice-all" href="/notices">{t("सबै", "All")}<ExternalLink size={12} aria-hidden="true" /></Link>
    </aside>
    <header className="site-header">
      <div className="masthead wrap">
        <Link href="/" className="brand" aria-label={t("युवा तथा साना व्यवसायी स्वरोजगार कोष गृह पृष्ठ", "YSEF home")}>
          <Image src="/ysef-emblem.png" width={64} height={64} alt="" className="brand-emblem" priority />
          <span className="brand-text">
            <span className="brand-government">{t("नेपाल सरकार", "Government of Nepal")}</span>
            <span className="brand-ministry">{t("युवा, श्रम तथा रोजगार मन्त्रालय", "Ministry of Youth, Labour and Employment")}</span>
            <strong className="brand-title-full">{t("युवा तथा साना व्यवसायी स्वरोजगार कोष", "Youth and Small Entrepreneur Self-Development Fund")}</strong>
            <strong className="brand-title-mobile">{t("युवा स्वरोजगार कोष", "YSEF Fund")}</strong>
            <span className="brand-address">{t("कुपण्डोल–१०, ललितपुर", "Kupandol–10, Lalitpur")}</span>
          </span>
        </Link>
        <NepalDateTime lang={lang} />
        <div className="header-actions">
          <button type="button" className="utility-button" aria-label={t("खोज्नुहोस्", "Search")} aria-expanded={searchOpen} onClick={() => setSearchOpen((v) => !v)}><Search size={19} /> <span>{t("खोज्नुहोस्", "Search")}</span></button>
          <span className="utility-divider" />
          <div className="language-switch" role="group" aria-label={t("भाषा छान्नुहोस्", "Choose language")}>
            <button type="button" className={`language-option ${lang === "en" ? "is-active" : ""}`} onClick={() => setLang("en")} aria-pressed={lang === "en"} lang="en">EN</button>
            <button type="button" className={`language-option ${lang === "ne" ? "is-active" : ""}`} onClick={() => setLang("ne")} aria-pressed={lang === "ne"} lang="ne">ने</button>
          </div>
          <button type="button" className="mobile-menu-button" aria-label={mobileOpen ? t("मेनु बन्द गर्नुहोस्", "Close menu") : t("मेनु खोल्नुहोस्", "Open menu")} aria-expanded={mobileOpen} onClick={() => setMobileOpen((v) => !v)}>{mobileOpen ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
      </div>
      <nav className="mobile-app-nav" aria-label={t("मोबाइल द्रुत नेभिगेसन", "Mobile quick navigation")}>
        <Link href="/" className={pathname === "/" ? "is-active" : ""} aria-current={pathname === "/" ? "page" : undefined}><House size={19} aria-hidden="true" /><span>{t("गृह", "Home")}</span></Link>
        <Link href="/services" className={pathname === "/services" || pathname.startsWith("/services/") ? "is-active" : ""} aria-current={pathname.startsWith("/services") ? "page" : undefined}><BriefcaseBusiness size={19} aria-hidden="true" /><span>{t("सेवा", "Services")}</span></Link>
        <Link href="/notices" className={pathname === "/notices" || pathname.startsWith("/notices/") ? "is-active" : ""} aria-current={pathname.startsWith("/notices") ? "page" : undefined}><Bell size={19} aria-hidden="true" /><span>{t("सूचना", "Notices")}</span></Link>
        <Link href="/resources" className={pathname === "/resources" ? "is-active" : ""} aria-current={pathname === "/resources" ? "page" : undefined}><FileText size={19} aria-hidden="true" /><span>{t("फाराम", "Forms")}</span></Link>
        <button type="button" className={mobileOpen || aboutOrContact ? "is-active" : ""} aria-label={t("थप पृष्ठहरू खोल्नुहोस्", "Open more pages")} aria-expanded={mobileOpen} onClick={() => setMobileOpen((v) => !v)}><Menu size={19} aria-hidden="true" /><span>{t("थप", "More")}</span></button>
      </nav>
      <nav className={`main-nav ${mobileOpen ? "is-open" : ""}`} aria-label={t("मुख्य नेभिगेसन", "Main navigation")}>
        <div className="nav-inner wrap">
          {navGroups.map((group) => {
            const groupActive = group.items.some((item) => pathname === item.href.split("#")[0] || pathname.startsWith(`${item.href.split("#")[0]}/`));
            const expanded = openMenu === group.id;
            return <div className={`nav-dropdown ${expanded ? "is-expanded" : ""}`} key={group.id}>
              <button type="button" className={`nav-trigger ${groupActive ? "active" : ""}`} aria-expanded={expanded} aria-controls={`nav-menu-${group.id}`} onClick={() => setOpenMenu(expanded ? null : group.id)}>
                {t(group.ne, group.en)}<ChevronDown size={14} aria-hidden="true" />
              </button>
              {expanded && <div className="nav-menu" id={`nav-menu-${group.id}`}>
                {group.items.map((item) => <Link key={item.href} href={item.href} onClick={() => { setOpenMenu(null); setMobileOpen(false); }}>{t(item.ne, item.en)}</Link>)}
              </div>}
            </div>;
          })}
          <Link href="/contact" onClick={() => { setOpenMenu(null); setMobileOpen(false); }} className={`nav-plain ${pathname === "/contact" ? "active" : ""}`}>{t("सम्पर्क", "Contact")}</Link>
          <button type="button" className="nav-portal" onClick={() => { setMobileOpen(false); setOpenMenu(null); setPortalInfo(true); }}>{t("अनलाइन दर्ता", "Online registration")}<ExternalLink size={14} /></button>
        </div>
      </nav>
    </header>
    {mobileOpen && <button type="button" className="mobile-nav-backdrop" aria-label={t("मेनु बन्द गर्नुहोस्", "Close menu")} onClick={() => setMobileOpen(false)} />}
    {searchOpen && <div className="search-scrim" onMouseDown={(e) => { if (e.target === e.currentTarget) setSearchOpen(false); }}>
      <section className="search-panel" role="dialog" aria-modal="true" aria-labelledby="search-title">
        <div className="search-panel-heading"><div><span className="eyebrow">{t("वेबसाइट खोजी", "SITE SEARCH")}</span><h2 id="search-title">{t("के खोज्दै हुनुहुन्छ?", "What are you looking for?")}</h2></div><button className="icon-button" type="button" onClick={() => setSearchOpen(false)} aria-label={t("बन्द गर्नुहोस्", "Close search")}><X size={20} /></button></div>
        <form className="search-form" onSubmit={submitSearch}><Search size={20} /><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t("सेवा, सूचना वा फाराम खोज्नुहोस्", "Search services, notices, or forms")} aria-label={t("खोजी शब्द", "Search terms")} /><button type="submit">{t("खोज्नुहोस्", "Search")}</button></form>
        {query.trim() ? <div className="search-results" aria-live="polite">{results.length ? results.map((result) => <Link key={result.href + result.title} href={result.href} onClick={() => setSearchOpen(false)}><span><small>{result.type}</small><strong>{result.title}</strong></span><span aria-hidden="true">↗</span></Link>) : <p className="empty-search">{t("यो शब्दसँग मिल्ने सामग्री भेटिएन। अर्को शब्दबाट खोज्नुहोस्।", "No results found. Try another search term.")}</p>}</div> : <div className="search-suggestions"><span>{t("लोकप्रिय खोजी", "Popular searches")}</span>{[t("व्यवसायिक कर्जा", "Business loan"), t("बीमा फाराम", "Insurance form"), t("तालिम", "Training")].map((term) => <button key={term} type="button" onClick={() => setQuery(term)}>{term}</button>)}</div>}
      </section>
    </div>}
    {portalInfo && <div className="search-scrim" onMouseDown={(e) => { if (e.target === e.currentTarget) setPortalInfo(false); }}><section className="portal-dialog" role="dialog" aria-modal="true" aria-labelledby="portal-title"><button type="button" className="icon-button portal-close" onClick={() => setPortalInfo(false)} aria-label={t("बन्द गर्नुहोस्", "Close")}><X size={19} /></button><span className="portal-icon"><ExternalLink size={22} /></span><h2 id="portal-title">{t("अनलाइन दर्ता पोर्टल", "Online registration portal")}</h2><p>{t("यो पुनःडिजाइन नमूनाले व्यक्तिगत विवरण संकलन गर्दैन। अनलाइन आवेदनका लागि YSEF को छुट्टै दर्ता पोर्टल खुल्छ।", "This redesign prototype does not collect personal information. Online applications continue on YSEF’s separate registration portal.")}</p><a className="button button-primary" href={registrationUrl} target="_blank" rel="noopener noreferrer" onClick={() => setPortalInfo(false)}>{t("दर्ता पोर्टल खोल्नुहोस्", "Open registration portal")}<ExternalLink size={15} /></a></section></div>}
  </>;
}
