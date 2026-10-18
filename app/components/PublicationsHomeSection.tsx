"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight, BookOpen, FileBarChart2, FileText, Newspaper, ShieldCheck } from "lucide-react";
import { resources } from "../data";
import { useLocale } from "./LocaleContext";
import { withBasePath } from "../paths";
import styles from "./PublicationsHomeSection.module.css";

const PUBLICATIONS_URL = "https://ysef.gov.np/category/publications/";
const featuredIds = [
  "self-employment-message-jestha",
  "pdms-report-2083",
  "self-employment-insurance-info",
  "articles-interviews",
  "fund-booklets",
];

export default function PublicationsHomeSection() {
  const { lang, t } = useLocale();
  const items = featuredIds
    .map((id) => resources.find((resource) => resource.id === id))
    .filter((item): item is (typeof resources)[number] => Boolean(item));
  const featured = items[0];

  return (
    <section className={styles.section} id="publications" aria-labelledby="home-publications-title">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <div className={styles.headingCopy}>
            <span className={styles.eyebrow}><BookOpen size={15} aria-hidden="true" />{t("प्रकाशन तथा सामग्री", "PUBLICATIONS & MATERIALS")}</span>
            <h2 id="home-publications-title">{t("ज्ञान र उपयोगी प्रकाशन", "Publications and useful materials")}</h2>
            <p>{t("कोषका प्रतिवेदन, बुलेटिन र जानकारीमूलक सामग्री आधिकारिक स्रोतबाट खोल्नुहोस्।", "Open Fund reports, bulletins, and public information from the official source.")}</p>
          </div>
          <a className={styles.allLink} href={PUBLICATIONS_URL} target="_blank" rel="noopener noreferrer">
            {t("सबै प्रकाशन", "All publications")}<ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>

        <div className={styles.content}>
          {featured && (
            <a className={styles.featured} href={featured.sourceUrl || PUBLICATIONS_URL} target="_blank" rel="noopener noreferrer">
              <span className={styles.coverWrap}>
                <Image
                  className={styles.cover}
                  src={withBasePath("/reference-carousel/magazine-jestha.jpg")}
                  alt={lang === "ne" ? "स्वरोजगार सन्देश बुलेटिनको आवरण" : "Cover of the Self-employment Message bulletin"}
                  width={420}
                  height={560}
                  sizes="(max-width: 700px) 40vw, 250px"
                />
              </span>
              <span className={styles.featuredBody}>
                <span className={styles.kind}>{lang === "ne" ? featured.kind : featured.kindEn}</span>
                <strong className={styles.featuredTitle}>{lang === "ne" ? featured.title : featured.titleEn}</strong>
                <span className={styles.featuredMeta}>{lang === "ne" ? featured.format : featured.formatEn}</span>
                <span className={styles.featuredLink}>{t("मूल वेबसाइटमा हेर्नुहोस्", "View on the original website")}<ArrowUpRight size={15} aria-hidden="true" /></span>
              </span>
            </a>
          )}

          <div className={styles.list}>
            {items.slice(1, 4).map((item) => (
              <a className={styles.item} href={item.sourceUrl || PUBLICATIONS_URL} target="_blank" rel="noopener noreferrer" key={item.id}>
                <span className={styles.itemIcon} aria-hidden="true">
                  {item.id === "pdms-report-2083" ? <FileBarChart2 size={19} /> : item.id === "self-employment-insurance-info" ? <ShieldCheck size={19} /> : item.id === "articles-interviews" ? <Newspaper size={19} /> : <FileText size={19} />}
                </span>
                <span className={styles.itemBody}>
                  <span className={styles.itemKind}>{lang === "ne" ? item.kind : item.kindEn}</span>
                  <strong>{lang === "ne" ? item.title : item.titleEn}</strong>
                  <span className={styles.itemMeta}>{lang === "ne" ? item.format : item.formatEn}</span>
                </span>
                <ArrowUpRight className={styles.itemArrow} size={17} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <p className={styles.note}>
          <span aria-hidden="true">i</span>
          {t("यो पुनःडिजाइनको नमुना खण्ड हो। यहाँका शीर्षक र वर्गीकरण उदाहरणका लागि राखिएका हुन्। पछिल्लो संस्करण, फाइल र मिति आधिकारिक YSEF वेबसाइटमा पुष्टि गर्नुहोस्।", "Illustrative redesign content: titles and categories demonstrate the layout. Confirm the latest editions, files, and dates on the official YSEF website.")}
        </p>
      </div>
    </section>
  );
}
