"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone, UsersRound } from "lucide-react";
import { officials } from "../data";
import { useLocale } from "../components/LocaleContext";

export default function OfficialsPage() {
  const { lang, t } = useLocale();
  const minister = officials.find((official) => official.group === "leadership");
  const officeOfficials = officials.filter((official) => official.group === "staff");
  return <div className="inner-page">
    <div className="page-intro-band"><div className="wrap"><div className="breadcrumbs"><Link href="/">{t("गृह पृष्ठ", "Home")}</Link><span>/</span><Link href="/about">{t("हाम्रोबारे", "About")}</Link><span>/</span><span>{t("अधिकारी र कर्मचारी", "Officials and employees")}</span></div><span className="eyebrow">{t("कोषसँग सम्पर्क गर्ने व्यक्ति", "PEOPLE AND CONTACTS")}</span><h1>{t("अधिकारी तथा कर्मचारी", "Officials and employees")}</h1><p>{t("जिम्मेवारी हेर्नुहोस् र सही शाखासँग सम्पर्क गर्नुहोस्।", "Find the right office holder or branch contact for your question.")}</p></div></div>
    <section className="wrap inner-content officials-directory">
      <div className="detail-warning"><UsersRound size={19} /><p>{t("यो २०२६/१०/१७ मा सार्वजनिक YSEF साइटमा देखिएका विवरणको नमूना पुनःप्रस्तुति हो। पद, सम्पर्क र कर्मचारी परिवर्तन हुन सक्छन्; प्रयोग गर्नुअघि आधिकारिक सूची पुष्टि गर्नुहोस्।", "This is a prototype snapshot of entries shown on YSEF’s public site on 17 Oct 2026. Roles, contacts, and staff can change; verify the current official directory before use.")}</p></div>
      <h2>{t("मन्त्री", "Minister")}</h2>
      {minister && <article className="directory-minister-feature" id={minister.id}><div className="directory-minister-copy"><span className="minister-rank-label">{t("सरकारी नेतृत्व", "GOVERNMENT LEADERSHIP")}</span><span className="eyebrow">{t("युवा, श्रम तथा रोजगार मन्त्रालय", "MINISTRY OF YOUTH, LABOUR AND EMPLOYMENT")}</span><h3>{lang === "ne" ? minister.name : minister.nameEn}</h3><p>{lang === "ne" ? minister.role : minister.roleEn}</p>{minister.profileUrl && <a href={minister.profileUrl} target="_blank" rel="noopener noreferrer">{t("आधिकारिक परिचय खोल्नुहोस्", "Open official profile")}<ArrowUpRight size={14} /></a>}</div><div className="directory-minister-portrait"><Image src={minister.image} alt={lang === "ne" ? minister.imageAlt : minister.imageAltEn} fill sizes="(max-width:760px) 42vw, 300px" /></div></article>}
      <div className="official-directory-heading"><div><h2>{t("कार्यालयका अधिकारी", "Office officials")}</h2><p>{t("सार्वजनिक वेबसाइटमा देखाइएका शाखा सम्पर्क।", "Branch contacts shown on the public site.")}</p></div><a className="text-link" href="https://ysef.gov.np/our-team/" target="_blank" rel="noopener noreferrer">{t("मूल अधिकारी सूची", "Original directory")}<ArrowUpRight size={15} /></a></div>
      <div className="official-staff-list">{officeOfficials.map((official) => <article className="official-staff-row" id={official.id} key={official.id}><Image src={official.image} width={88} height={96} alt={lang === "ne" ? official.imageAlt : official.imageAltEn} /><div className="official-staff-copy"><h3>{lang === "ne" ? official.name : official.nameEn}</h3><p>{lang === "ne" ? official.role : official.roleEn}</p><div className="official-card-contacts">{official.phone && <a href={`tel:${official.phone}`}><Phone size={15} />{official.phone}</a>}{official.email && <a href={`mailto:${official.email}`}><Mail size={15} />{official.email}</a>}</div>{official.profileUrl && <a className="staff-profile-link" href={official.profileUrl} target="_blank" rel="noopener noreferrer">{t("पूरा विवरण", "Full profile")}<ArrowUpRight size={14} /></a>}</div></article>)}</div>
      <div className="directory-help-strip"><span>{t("सामान्य सोधपुछ", "General enquiries")}</span><a href="tel:+97714102782">{t("०१-४१०२७८२", "01-4102782")}</a><a href="mailto:info@ysef.gov.np">info@ysef.gov.np</a><Link href="/contact">{t("सम्पर्क तथा कार्यालय समय", "Contact and office hours")}<ArrowUpRight size={14} /></Link></div>
    </section>
  </div>;
}
