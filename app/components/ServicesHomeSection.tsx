"use client";

import { ArrowUpRight } from "lucide-react";
import { services } from "../data";
import { useLocale } from "./LocaleContext";
import ServiceIcon from "./ServiceIcon";
import styles from "./ServicesHomeSection.module.css";

const officialServicesUrl = "https://ysef.gov.np/services-list/";

export default function ServicesHomeSection() {
  const { lang, t } = useLocale();

  return (
    <section className={styles.section} id="services" aria-labelledby="home-services-title">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <div className={styles.headingCopy}>
            <span className={styles.eyebrow}>{t("हामी के गर्छौं", "WHAT WE DO")}</span>
            <h2 id="home-services-title">
              {t("आफ्नो लक्ष्यसँग मिल्ने सहयोग खोज्नुहोस्", "Find support that fits your goal")}
            </h2>
            <p>
              {t(
                "व्यवसाय सुरु गर्ने, सीप बढाउने वा साझेदारी गर्ने—आफ्नो आवश्यकताबाट सेवा छान्नुहोस्।",
                "Whether you are starting a business, building skills, or exploring a partnership, begin with what you need.",
              )}
            </p>
          </div>
          <a className={styles.allServices} href={officialServicesUrl} target="_blank" rel="noopener noreferrer">
            <span>{t("सबै सेवाहरू", "All services")}</span>
            <ArrowUpRight size={17} aria-hidden="true" />
            <span className={styles.srOnly}>{t("आधिकारिक YSEF वेबसाइटमा खुल्छ", "Opens on the official YSEF website")}</span>
          </a>
        </div>

        <div className={styles.grid}>
          {services.slice(0, 6).map((service, index) => (
            <a
              className={`${styles.card} ${styles[`card${index + 1}`]}`}
              href={officialServicesUrl}
              target="_blank"
              rel="noopener noreferrer"
              key={service.slug}
              aria-label={`${lang === "ne" ? service.title : service.titleEn} — ${t("आधिकारिक YSEF वेबसाइटमा खुल्छ", "opens on the official YSEF website")}`}
            >
              <span className={styles.cardTop}>
                <span className={styles.icon}>
                  <ServiceIcon name={service.icon} size={24} />
                </span>
                <span className={styles.tag}>{lang === "ne" ? service.tag : service.tagEn}</span>
              </span>
              <span className={styles.title}>{lang === "ne" ? service.title : service.titleEn}</span>
              <span className={styles.description}>{lang === "ne" ? service.short : service.shortEn}</span>
              <span className={styles.cardLink}>
                <span>{t("आधिकारिक विवरण हेर्नुहोस्", "View official service information")}</span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
