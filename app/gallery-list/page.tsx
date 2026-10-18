"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Images } from "lucide-react";
import { galleryAlbums } from "../data";
import { useLocale } from "../components/LocaleContext";
import styles from "./gallery-list.module.css";

const sourceAlbum: Record<string, string> = {
  "skills-employment-fair": "https://ysef.gov.np/gallery/detail/18/",
  "ministry-meeting": "https://ysef.gov.np/gallery/detail/17/",
  "kathmandu-partnership": "https://ysef.gov.np/gallery/detail/15/",
  "training-loan-agreement": "https://ysef.gov.np/gallery/detail/14/",
  "recovery-facilitator-training": "https://ysef.gov.np/gallery/detail/13/",
  "audit-meeting": "https://ysef.gov.np/gallery/detail/11/",
};

const perPage = 6;

export default function GalleryListPage() {
  const { lang, t } = useLocale();
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(galleryAlbums.length / perPage);
  const visibleAlbums = galleryAlbums.slice((page - 1) * perPage, page * perPage);

  return <div className="inner-page">
    <div className="page-intro-band">
      <div className="wrap">
        <div className="breadcrumbs"><Link href="/">{t("गृह पृष्ठ", "Home")}</Link><span>/</span><Link href="/gallery">{t("मिडिया केन्द्र", "Media center")}</Link><span>/</span><span>{t("तस्बिर ग्यालरी", "Photo gallery")}</span></div>
        <span className="eyebrow">{t("कार्यक्रम र गतिविधि", "EVENTS AND ACTIVITIES")}</span>
        <h1>{t("तस्बिर ग्यालरी", "Photo gallery")}</h1>
        <p>{t("कोषका कार्यक्रम, तालिम, साझेदारी र सार्वजनिक भेटघाटका तस्बिरहरू हेर्नुहोस्।", "Browse photographs from the Fund’s programmes, training, partnerships, and public events.")}</p>
      </div>
    </div>

    <section className={`wrap inner-content ${styles.content}`} aria-labelledby="gallery-list-heading">
      <div className={styles.headingRow}>
        <div>
          <span className="eyebrow">{t("तस्बिर अभिलेख", "PHOTO ARCHIVE")}</span>
          <h2 id="gallery-list-heading">{t("कार्यक्रमका तस्बिरहरू", "Photographs from YSEF")}</h2>
          <p>{t("प्रत्येक एल्बमको मूल विवरण र थप तस्बिरका लागि आधिकारिक YSEF साइट खोल्नुहोस्।", "Open the official YSEF site for each album’s original details and additional photographs.")}</p>
        </div>
        <a className="button button-outline" href="https://ysef.gov.np/gallery-list/" target="_blank" rel="noopener noreferrer">
          {t("आधिकारिक ग्यालरी", "Official gallery")}<ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>

      <div className={styles.sampleNotice} role="note">
        <span className={styles.sampleIcon}><Images size={18} aria-hidden="true" /></span>
        <p><strong>{t("नमूना पूर्वावलोकन", "Illustrative sample content")}</strong> — {t("यो पुनःडिजाइन प्रोटोटाइपमा सार्वजनिक साइटका एल्बम शीर्षक र स्थानीय सन्दर्भ तस्बिर प्रयोग गरिएको छ। मिति र पूर्ण एल्बम आधिकारिक साइटमा पुष्टि गर्नुहोस्।", "This redesign prototype uses album titles and locally stored reference photos from the public site. Confirm dates and full albums on the official source.")}</p>
      </div>

      <div className={styles.grid}>
        {visibleAlbums.map((album, index) => {
          const officialUrl = sourceAlbum[album.id] ?? "https://ysef.gov.np/gallery-list/";
          return <article className={styles.card} key={album.id}>
            <a className={styles.imageLink} href={officialUrl} target="_blank" rel="noopener noreferrer" aria-label={`${lang === "ne" ? album.title : album.titleEn} — ${t("आधिकारिक साइटमा खोल्नुहोस्", "open on official site")}`}>
              <Image src={album.image} alt={lang === "ne" ? album.imageAlt : album.imageAltEn} fill sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 33vw" />
              <span className={styles.photoCount}>{lang === "ne" ? `${album.photoCount} तस्बिर` : `${album.photoCount} photos`}</span>
            </a>
            <div className={styles.cardCopy}>
              <span className={styles.albumIndex}>{String((page - 1) * perPage + index + 1).padStart(2, "0")}</span>
              <h3><a href={officialUrl} target="_blank" rel="noopener noreferrer">{lang === "ne" ? album.title : album.titleEn}</a></h3>
              <a className={styles.albumLink} href={officialUrl} target="_blank" rel="noopener noreferrer">
                {t("आधिकारिक एल्बम हेर्नुहोस्", "View official album")}<ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </article>;
        })}
      </div>

      <nav className={styles.pagination} aria-label={t("ग्यालरी पृष्ठहरू", "Gallery pages")}>
        <button type="button" className={styles.pageArrow} onClick={() => setPage((n) => Math.max(1, n - 1))} disabled={page === 1} aria-label={t("अघिल्लो पृष्ठ", "Previous page")}><ArrowLeft size={17} /></button>
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => <button key={n} type="button" onClick={() => setPage(n)} aria-current={page === n ? "page" : undefined} className={page === n ? styles.currentPage : styles.pageNumber}>{n}</button>)}
        <button type="button" className={styles.pageArrow} onClick={() => setPage((n) => Math.min(pageCount, n + 1))} disabled={page === pageCount} aria-label={t("अर्को पृष्ठ", "Next page")}><ArrowRight size={17} /></button>
        <span className={styles.pageSummary}>{t(`पृष्ठ ${page} / ${pageCount}`, `Page ${page} of ${pageCount}`)}</span>
      </nav>
    </section>
  </div>;
}
