"use client";

import { ArrowRight, ArrowUpRight, Newspaper } from "lucide-react";
import { resources } from "../data";
import { useLocale } from "./LocaleContext";
import styles from "./LatestNewsHomeSection.module.css";

const featuredIds = ["self-employment-message-jestha", "pdms-report-2083", "articles-interviews"];

export default function LatestNewsHomeSection() {
  const { lang, t } = useLocale();
  const items = featuredIds
    .map((id) => resources.find((resource) => resource.id === id))
    .filter((resource) => resource?.sourceUrl);

  return (
    <section className={styles.section} aria-labelledby="latest-news-title">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <div className={styles.headingCopy}>
            <span className={styles.eyebrow}>{t("समाचार तथा गतिविधि", "NEWS & UPDATES")}</span>
            <h2 id="latest-news-title">{t("कोषका पछिल्ला समाचार", "Latest from the Fund")}</h2>
            <p>{t("मूल वेबसाइटमा प्रकाशित सामग्रीका केही नमूना यहाँबाट खोल्नुहोस्।", "Open a few sample entries from the original YSEF website.")}</p>
          </div>
          <a className={styles.allLink} href="https://ysef.gov.np/" target="_blank" rel="noopener noreferrer">
            {t("आधिकारिक वेबसाइटमा हेर्नुहोस्", "Visit official website")}
            <ArrowUpRight aria-hidden="true" size={17} />
          </a>
        </div>

        <div className={styles.grid}>
          {items.map((item, index) => item && (
            <a className={`${styles.card} ${index === 0 ? styles.featured : ""}`} href={item.sourceUrl} target="_blank" rel="noopener noreferrer" key={item.id}>
              <span className={styles.cardTop}>
                <span className={styles.icon}><Newspaper aria-hidden="true" size={19} /></span>
                <span className={styles.kind}>{lang === "ne" ? item.kind : item.kindEn}</span>
                <ArrowUpRight className={styles.cardArrow} aria-hidden="true" size={17} />
              </span>
              <strong>{lang === "ne" ? item.title : item.titleEn}</strong>
              <span className={styles.cardFoot}>{t("मूल वेबसाइटमा खोल्नुहोस्", "Open on original website")}<ArrowRight aria-hidden="true" size={14} /></span>
            </a>
          ))}
        </div>

        <p className={styles.note}>
          <span aria-hidden="true">i</span>
          {t("यो पुनःडिजाइनको नमूना खण्ड हो। शीर्षक र लिङ्कहरू उदाहरणका लागि हुन्; ताजा समाचार वा मिति जनाउँदैनन्।", "This is a sample section in a redesign. Titles and links are illustrative and do not indicate current news or dates.")}
        </p>
      </div>
    </section>
  );
}
