"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, BookOpenText, ChevronRight, CircleHelp, FileText, Search, ShieldCheck } from "lucide-react";
import { resources, officials } from "../data";
import { useLocale } from "./LocaleContext";
import HomepageCarousel from "./HomepageCarousel";
import ServicesHomeSection from "./ServicesHomeSection";
import HighlightsHomeSection from "./HighlightsHomeSection";
import LatestNewsHomeSection from "./LatestNewsHomeSection";
import PublicationsHomeSection from "./PublicationsHomeSection";
import PhotographsHomeSection from "./PhotographsHomeSection";

export default function HomePage() {
  const { lang, t } = useLocale();
  const minister = officials.find((official) => official.group === "leadership");
  const officeOfficials = officials.filter((official) => official.group === "staff");
  return <>
    <section className="home-hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <div className="hero-kicker"><span className="kicker-mark" />{t("स्वरोजगार र उद्यम विकास", "Self-employment and enterprise development")}</div>
          <h1>{t("आफ्नो सीपबाट,\nआफ्नै व्यवसायतर्फ।", "Turn your skills\ninto your own business.")}</h1>
          <p>{t("युवा तथा साना व्यवसायी स्वरोजगार कोषका सेवा, सूचना र स्रोतहरू सजिलै खोज्नुहोस्।", "Find services, notices, and resources from the Youth and Small Entrepreneur Self-Development Fund.")}</p>
          <div className="hero-actions"><Link className="button button-primary" href="/services">{t("उपलब्ध सेवाहरू हेर्नुहोस्", "Explore services")}<ArrowRight size={17} /></Link><Link className="text-link" href="/resources">{t("फाराम खोज्नुहोस्", "Find a form")}<ChevronRight size={16} /></Link></div>
          <div className="hero-audience"><span className="audience-icon"><CircleHelp size={16} /></span><span>{t("कहाँबाट सुरु गर्ने थाहा छैन?", "Not sure where to begin?")}</span><Link href="/services">{t("सहयोगी गाइड हेर्नुहोस्", "Start with our guide")}<ArrowUpRight size={13} /></Link></div>
        </div>
        <div className="hero-visual">
          <HomepageCarousel />
          <div className="hero-side-note"><span>य</span>{t("युवा उद्यमको साथमा", "Supporting youth enterprise")}</div>
          <span className="hero-sun" aria-hidden="true" />
        </div>
      </div>
    </section>

    <section className="home-officials-section wrap" aria-labelledby="home-officials-title">
      <div className="home-officials-heading"><div><span className="eyebrow">{t("नेतृत्व र सम्पर्क", "LEADERSHIP AND CONTACTS")}</span><h2 id="home-officials-title">{t("सही व्यक्तिसँग सम्पर्क गर्नुहोस्", "Reach the right office")}</h2></div></div>
      {minister && <article className="home-minister-feature"><div className="home-minister-copy"><span className="minister-rank-label">{t("मन्त्री", "MINISTER")}</span><span className="eyebrow">{t("युवा, श्रम तथा रोजगार मन्त्रालय", "MINISTRY OF YOUTH, LABOUR AND EMPLOYMENT")}</span><h3>{lang === "ne" ? minister.name : minister.nameEn}</h3><p>{lang === "ne" ? minister.role : minister.roleEn}</p>{minister.profileUrl && <a href={minister.profileUrl} target="_blank" rel="noopener noreferrer">{t("आधिकारिक परिचय", "Official profile")}<ArrowUpRight size={15} /></a>}</div><div className="home-minister-portrait"><Image src={minister.image} fill sizes="(max-width: 700px) 38vw, 230px" alt={lang === "ne" ? minister.imageAlt : minister.imageAltEn} /></div></article>}
      <div className="home-staff-heading"><div><span className="eyebrow">{t("कोषका कार्यालय अधिकारी", "YSEF OFFICE OFFICIALS")}</span><p>{t("शाखा र सार्वजनिक सम्पर्क विवरण", "Branch roles and public contacts")}</p></div><Link href="/officials">{t("सबै अधिकारी", "All officials")}<ArrowRight size={15} /></Link></div>
      <div className="home-staff-list">{officeOfficials.map((official) => <article className="home-staff-row" key={official.id}><Image src={official.image} width={58} height={66} alt={lang === "ne" ? official.imageAlt : official.imageAltEn} /><div className="home-staff-copy"><strong>{lang === "ne" ? official.name : official.nameEn}</strong><small>{lang === "ne" ? official.role : official.roleEn}</small><div>{official.phone && <a href={`tel:${official.phone}`}>{official.phone}</a>}{official.email && <a href={`mailto:${official.email}`}>{official.email}</a>}</div></div></article>)}</div>
      <p className="home-officials-note">{t("पद र सम्पर्क परिवर्तन हुन सक्छन्। विवरण पुष्टि गर्न अधिकारी सूची हेर्नुहोस्।", "Roles and contacts can change. Check the directory to confirm current details.")}</p>
    </section>

    <section className="quick-path-section" aria-label={t("द्रुत पहुँच", "Quick access")}>
      <div className="wrap quick-path-grid">
        <div className="quick-path-intro"><span className="eyebrow">{t("सिधै सुरु गर्नुहोस्", "START HERE")}</span><strong>{t("तपाईंलाई के चाहिएको छ?", "What do you need today?")}</strong></div>
        <Link href="/services" className="quick-path-item"><span className="quick-icon"><BookOpenText size={19} /></span><span>{t("सेवाबारे बुझ्न", "Explore support")}</span><ChevronRight size={16} /></Link>
        <Link href="/notices" className="quick-path-item"><span className="quick-icon"><FileText size={19} /></span><span>{t("नयाँ सूचना हेर्न", "Read current notices")}</span><ChevronRight size={16} /></Link>
        <Link href="/resources" className="quick-path-item"><span className="quick-icon"><Search size={19} /></span><span>{t("फाराम र कागजात खोज्न", "Find forms and documents")}</span><ChevronRight size={16} /></Link>
        <Link href="/contact" className="quick-path-item"><span className="quick-icon"><CircleHelp size={19} /></span><span>{t("सहयोग माग्न", "Get help")}</span><ChevronRight size={16} /></Link>
      </div>
    </section>

    <ServicesHomeSection />

    <section className="how-section">
      <div className="wrap how-grid">
        <div className="how-intro"><span className="eyebrow eyebrow-light">{t("सजिलो बाटो", "A CLEARER WAY")}</span><h2>{t("कहाँबाट सुरु गर्ने?", "Where do I start?")}</h2><p>{t("यो नमूना मार्गले वेबसाइटमा चाहिएको जानकारी छिटो भेट्टाउन मद्दत गर्छ। कार्यक्रमका वास्तविक सर्त र प्रक्रिया आधिकारिक सूचनामा पुष्टि गर्नुहोस्।", "This sample guide helps you find information on the site. Confirm real programme terms and processes in official notices.")}</p><span className="sample-pill sample-pill-light">{t("नमूना जानकारी", "Illustrative guide")}</span></div>
        <ol className="how-steps">
          {["Choose your goal", "Check what you need", "Confirm the details"].map((step, i) => <li key={step}><span className="step-number">0{i + 1}</span><span><strong>{lang === "ne" ? ["आफ्नो लक्ष्य छान्नुहोस्", "के चाहिन्छ जाँच्नुहोस्", "विवरण पुष्टि गर्नुहोस्"][i] : step}</strong><small>{lang === "ne" ? ["सेवा, तालिम वा साझेदारीबारे छान्नुहोस्।", "सर्त, कागजात र हालको सूचना हेर्नुहोस्।", "आवेदनअघि आधिकारिक विवरण बुझ्नुहोस्।"][i] : ["Choose a service, training, or partnership path.", "Review requirements, documents, and current notices.", "Confirm official information before applying."][i]}</small></span><ChevronRight size={18} /></li>)}
        </ol>
        <span className="how-watermark" aria-hidden="true">Y</span>
      </div>
    </section>

    <HighlightsHomeSection />
    <LatestNewsHomeSection />
    <PublicationsHomeSection />
    <PhotographsHomeSection />

    <section className="resources-band">
      <div className="wrap resources-band-grid">
        <div className="resources-band-copy"><span className="eyebrow eyebrow-light">{t("फाराम तथा स्रोत", "FORMS & RESOURCES")}</span><h2>{t("आवश्यक कागजात एकै ठाउँमा", "The documents you need, in one place")}</h2><p>{t("फाराम, कार्यविधि, प्रतिवेदन र सार्वजनिक जानकारी खोज्नुहोस्।", "Find forms, procedures, reports, and public information.")}</p><Link className="button button-white" href="/resources">{t("स्रोतहरू हेर्नुहोस्", "Browse resources")}<ArrowRight size={16} /></Link></div>
        <div className="resource-preview-list">{resources.filter((resource) => resource.sourceUrl).slice(0, 3).map((resource) => <Link href={`/resources#${resource.category || resource.id}`} key={resource.id} className="resource-preview"><span className="resource-file-icon"><FileText size={20} /></span><span className="resource-preview-copy"><strong>{lang === "ne" ? resource.title : resource.titleEn}</strong><small>{lang === "ne" ? `${resource.kind} · ${resource.format}` : `${resource.kindEn} · ${resource.formatEn}`}</small></span><ArrowUpRight size={16} /></Link>)}</div>
      </div>
    </section>

    <section className="accountability-section wrap">
      <div className="accountability-copy"><span className="eyebrow">{t("खुला र जवाफदेही", "OPEN & ACCOUNTABLE")}</span><h2>{t("आफ्नो अधिकार र सार्वजनिक जानकारी थाहा पाउनुहोस्", "Know your rights and public information")}</h2><p>{t("नागरिक बडापत्र, वार्षिक प्रतिवेदन, बजेट र संस्थागत जानकारी यहाँ भेट्नुहोस्।", "Find the citizen charter, annual reports, budgets, and organizational information.")}</p></div>
      <div className="accountability-links"><Link href="/about#charter"><span className="accountability-icon"><ShieldCheck size={21} /></span><span><strong>{t("नागरिक बडापत्र", "Citizen charter")}</strong><small>{t("सेवा र जिम्मेवारीबारे जान्नुहोस्", "Understand services and responsibilities")}</small></span><ArrowUpRight size={16} /></Link><Link href="/resources"><span className="accountability-icon"><FileText size={21} /></span><span><strong>{t("प्रतिवेदन र बजेट", "Reports and budgets")}</strong><small>{t("सार्वजनिक कागजात खोज्नुहोस्", "Browse public documents")}</small></span><ArrowUpRight size={16} /></Link></div>
    </section>

    <section className="home-contact wrap"><div className="contact-icon"><CircleHelp size={24} /></div><div><h2>{t("अझै सहयोग चाहिन्छ?", "Still need help?")}</h2><p>{t("सेवा, सूचना वा फारामबारे सोध्न हामीलाई सम्पर्क गर्नुहोस्।", "Contact us with questions about services, notices, or forms.")}</p></div><Link className="button button-outline" href="/contact">{t("सम्पर्क विवरण", "Contact YSEF")}<ArrowRight size={16} /></Link></section>
  </>;
}
