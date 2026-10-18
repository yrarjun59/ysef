"use client";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, CircleHelp, Search } from "lucide-react";
import { services } from "../data";
import { useLocale } from "../components/LocaleContext";
import ServiceIcon from "../components/ServiceIcon";
export default function ServicesPage() {
  const { lang, t } = useLocale();
  return <div className="inner-page">
    <div className="page-intro-band"><div className="wrap"><div className="breadcrumbs"><Link href="/">{t("गृह पृष्ठ", "Home")}</Link><span>/</span><span>{t("सेवाहरू", "Services")}</span></div><span className="eyebrow">{t("कार्यक्रम तथा सहयोग", "PROGRAMMES & SUPPORT")}</span><h1>{t("तपाईंको लक्ष्यका लागि सही सेवा खोज्नुहोस्", "Find the right support for your goal")}</h1><p>{t("व्यक्तिगत उद्यमी, कर्जा लिएका व्यक्ति र साझेदार संस्थाका लागि उपलब्ध सेवाहरू बुझ्नुहोस्।", "Explore services for individual entrepreneurs, borrowers, and partner institutions.")}</p></div></div>
    <section className="wrap inner-content">
      <div className="service-filter-intro"><div><span className="eyebrow">{t("६ सेवा क्षेत्र", "6 AREAS OF SUPPORT")}</span><h2>{t("सेवा छान्नुहोस्", "Browse services")}</h2></div><div className="service-search-hint"><Search size={17} /><span>{t("खोजीका लागि माथिको खोजी बटन प्रयोग गर्नुहोस्", "Use the search button above to find a service")}</span></div></div>
      <div className="service-grid service-grid-page">{services.map((service, i) => <Link className={`service-card service-card-${i + 1}`} href={`/services/${service.slug}`} key={service.slug}><div className="service-card-top"><span className="service-icon"><ServiceIcon name={service.icon} /></span><span className="service-tag">{lang === "ne" ? service.tag : service.tagEn}</span></div><h3>{lang === "ne" ? service.title : service.titleEn}</h3><p>{lang === "ne" ? service.short : service.shortEn}</p><span className="card-link">{t("सेवाबारे बुझ्नुहोस्", "Understand this service")}<ArrowRight size={15} /></span></Link>)}</div>
      <div className="help-strip"><span className="help-strip-icon"><CircleHelp size={20} /></span><span><strong>{t("कुन सेवा तपाईंका लागि हो भनेर निश्चित हुनुहुन्न?", "Not sure which service is right for you?")} </strong><small>{t("हामीलाई सम्पर्क गर्नुहोस् वा पहिलेका सूचना हेर्नुहोस्।", "Contact the office or review current notices.")}</small></span><Link href="/contact">{t("सहयोग लिनुहोस्", "Get help")}<ArrowRight size={15} /></Link></div>
    </section>
  </div>;
}
