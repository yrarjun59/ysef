"use client";

import { ArrowRight, ArrowUpRight, Bell, CalendarDays } from "lucide-react";
import { notices } from "../data";
import { useLocale } from "./LocaleContext";
import styles from "./HighlightsHomeSection.module.css";

const HIGHLIGHTS_URL = "https://ysef.gov.np/category/highlights-content/";

export default function HighlightsHomeSection() {
  const { lang, t } = useLocale();

  return (
    <section className={styles.section} aria-labelledby="home-highlights-title">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <div className={styles.headingCopy}>
            <span className={styles.eyebrow}><Bell size={15} aria-hidden="true" />{t("मुख्य जानकारी", "KEY INFORMATION")}</span>
            <h2 id="home-highlights-title">{t("मुख्य सूचना तथा जानकारी", "Highlights and important information")}</h2>
            <p>{t("कोषका सूचना र जानकारीको सूची हेर्नुहोस्।", "Browse notices and information published by the Fund.")}</p>
          </div>
          <a className={styles.allLink} href={HIGHLIGHTS_URL}>
            {t("सबै मुख्य सूचना", "See all highlights")}<ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>

        <p className={styles.sampleNotice}>
          <span className={styles.sampleBadge}>{t("नमूना सामग्री", "SAMPLE CONTENT")}</span>
          {t("यहाँका शीर्षक र मितिहरू उदाहरणका लागि मात्र हुन्; हालको सूचना वा अवस्था जनाउँदैनन्।", "Titles and dates below are illustrative and do not represent live notices or current status.")}
        </p>

        <ul className={styles.list}>
          {notices.slice(0, 3).map((notice) => (
            <li key={notice.slug}>
              <a className={styles.card} href={(notice as typeof notice & { sourceUrl?: string }).sourceUrl || HIGHLIGHTS_URL}>
                <span className={styles.cardIcon} aria-hidden="true"><CalendarDays size={20} /></span>
                <span className={styles.cardBody}>
                  <span className={styles.meta}>{lang === "ne" ? notice.type : notice.typeEn} <span aria-hidden="true">·</span> {t("उदाहरण", "Illustrative")}</span>
                  <strong>{lang === "ne" ? notice.title : notice.titleEn}</strong>
                  <span className={styles.summary}>{lang === "ne" ? notice.summary : notice.summaryEn}</span>
                  <span className={styles.date}>{lang === "ne" ? notice.date : notice.dateEn}</span>
                </span>
                <ArrowUpRight className={styles.arrow} size={18} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
        <a className={styles.mobileAllLink} href={HIGHLIGHTS_URL}>{t("सबै मुख्य सूचना हेर्नुहोस्", "View all highlights")}<ArrowRight size={17} aria-hidden="true" /></a>
      </div>
    </section>
  );
}
