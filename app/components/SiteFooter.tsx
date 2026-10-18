"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock3, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { useLocale } from "./LocaleContext";
import { withBasePath } from "../paths";

const relatedLinks = [
  { href: "https://opmcm.gov.np/", ne: "प्रधानमन्त्री तथा मन्त्रिपरिषद्को कार्यालय", en: "Office of the Prime Minister" },
  { href: "https://www.nrb.org.np/", ne: "नेपाल राष्ट्र बैंक", en: "Nepal Rastra Bank" },
  { href: "https://moless.gov.np/", ne: "युवा, श्रम तथा रोजगार मन्त्रालय", en: "Ministry of Youth, Labour and Employment" },
  { href: "https://nnrfc.gov.np/", ne: "राष्ट्रिय प्राकृतिक स्रोत तथा वित्त आयोग", en: "National Natural Resources and Fiscal Commission" },
  { href: "https://giwmscdntwo.gov.np/media/files/ilovepdf_merged%20(1)_kxjfnei.pdf", ne: "राष्ट्रिय युवा नीति २०८२", en: "National Youth Policy 2082" },
  { href: "https://giwmscdnone.gov.np/media/app/public/22/posts/1691665949_27.pdf", ne: "राष्ट्रिय साइबर सुरक्षा नीति २०८०", en: "National Cyber Security Policy 2080" },
];

export default function SiteFooter() {
  const { t, lang } = useLocale();
  return <footer className="site-footer">
    <div className="footer-main wrap">
      <div className="footer-brand"><Image src={withBasePath("/ysef-emblem.png")} width={58} height={58} alt="" /><div><strong>{t("युवा तथा साना व्यवसायी स्वरोजगार कोष", "Youth and Small Entrepreneur Self-Development Fund")}</strong><span>{t("युवा, श्रम तथा रोजगार मन्त्रालय · नेपाल सरकार", "Ministry of Youth, Labour and Employment · Government of Nepal")}</span><small>{t("पुनःडिजाइन नमूना · आधिकारिक सेवा होइन", "Redesign prototype · Not an official service")}</small></div></div>
      <div className="footer-office"><h2>{t("कार्यालय र सम्पर्क", "Office and contact")}</h2><a href="https://maps.google.com/?q=Kupandol+10+Lalitpur+Nepal"><MapPin size={16} />{t("कुपण्डोल–१०, ललितपुर", "Kupandol–10, Lalitpur")}</a><a href="tel:+97714102782"><Phone size={16} />{lang === "ne" ? "०१ ४१०२७८२" : "01 4102782"}</a><a href="tel:+97714102788"><Phone size={16} />{lang === "ne" ? "०१ ४१०२७८८" : "01 4102788"}</a><a href="tel:14102782"><Phone size={16} />{t("टोल फ्री १४१०२७८२", "Toll-free 14102782")}</a><a href="mailto:info@ysef.gov.np"><Mail size={16} />info@ysef.gov.np</a><div className="footer-hours"><Clock3 size={16} /><span><strong>{t("कार्यालय समय", "Office hours")}</strong><small>{t("जाडो: सोम–शुक्र ९–४ · गर्मी: सोम–शुक्र ९–५", "Winter: Mon–Fri 9–4 · Summer: Mon–Fri 9–5")}</small><small>{t("जाडो: कार्तिक १६–माघ १५ · गर्मी: माघ १६–कार्तिक १५", "Winter: Kartik 16–Magh 15 · Summer: Magh 16–Kartik 15")}</small></span></div></div>
      <div className="footer-links"><h2>{t("छिटो पहुँच", "Explore YSEF")}</h2><Link href="/services">{t("सेवाहरू", "Services")}</Link><Link href="/notices">{t("सूचना केन्द्र", "Notice center")}</Link><Link href="/resources#publications">{t("प्रकाशन तथा डाउनलोड", "Publications and downloads")}</Link><Link href="/gallery">{t("तस्बिर तथा भिडियो", "Photos and videos")}</Link><Link href="/gallery-list">{t("तस्बिर सङ्ग्रह सूची", "Photo album list")}</Link><Link href="/officials">{t("अधिकारी तथा कर्मचारी", "Officials and staff")}</Link><Link href="/about#charter">{t("नागरिक बडापत्र", "Citizen charter")}</Link><Link href="/contact">{t("सम्पर्क तथा प्रतिक्रिया", "Contact and feedback")}</Link><a href="https://register.ysefgov.com/apply" target="_blank" rel="noopener noreferrer">{t("अनलाइन दर्ता", "Online registration")}<ExternalLink size={13} /></a></div>
      <div className="footer-links footer-related-links"><h2>{t("महत्त्वपूर्ण लिङ्कहरू", "Important links")}</h2>{relatedLinks.map((item) => <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer">{lang === "ne" ? item.ne : item.en}<ExternalLink size={12} /></a>)}<a href="https://www.facebook.com/profile.php?id=61583042134791" target="_blank" rel="noopener noreferrer">Facebook<ExternalLink size={12} /></a></div>
    </div>
    <div className="footer-bottom"><div className="wrap footer-bottom-inner"><span>© {new Date().getFullYear()} {t("युवा तथा साना व्यवसायी स्वरोजगार कोष", "YSEF")}</span><span>{t("पुनःडिजाइन नमूना · आधिकारिक सेवा होइन", "Redesign prototype · Not an official service")}</span><a href="#top">{t("माथि जानुहोस्", "Back to top")} <ArrowUpRight size={14} /></a></div></div>
  </footer>;
}
