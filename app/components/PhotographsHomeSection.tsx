"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight, Images } from "lucide-react";
import { galleryAlbums } from "../data";
import { useLocale } from "./LocaleContext";
import styles from "./PhotographsHomeSection.module.css";

const GALLERY_LIST_URL = "/gallery-list";

// Detail pages observed on the official YSEF gallery. Entries without a
// confidently matched detail page go to the official album index.
const albumUrls: Record<string, string> = {
  "skills-employment-fair": "https://ysef.gov.np/gallery/detail/18/",
  "ministry-meeting": "https://ysef.gov.np/gallery/detail/17/",
  "kathmandu-partnership": "https://ysef.gov.np/gallery/detail/15/",
  "training-loan-agreement": "https://ysef.gov.np/gallery/detail/14/",
  "recovery-facilitator-training": "https://ysef.gov.np/gallery/detail/13/",
  "audit-meeting": "https://ysef.gov.np/gallery/detail/11/",
};

export default function PhotographsHomeSection() {
  const { lang, t } = useLocale();
  const albums = galleryAlbums.slice(0, 4);
  const featuredAlbum = albums[0];

  return (
    <section className={styles.section} aria-labelledby="home-photographs-title">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <div className={styles.headingCopy}>
            <span className={styles.eyebrow}><Images size={15} aria-hidden="true" />{t("तस्बिर सङ्ग्रह", "PHOTO GALLERY")}</span>
            <h2 id="home-photographs-title">{t("कार्यक्रमका तस्बिरहरू", "Photographs from YSEF programmes")}</h2>
            <p>{t("कोषका कार्यक्रम, बैठक र साझेदारीका झलकहरू हेर्नुहोस्।", "Explore moments from Fund programmes, meetings, and partnerships.")}</p>
          </div>
          <a className={styles.allLink} href={GALLERY_LIST_URL}>
            {t("सबै फोटो सङ्ग्रह", "View all photo albums")}<ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>

        <p className={styles.sampleNote}>
          <span className={styles.sampleBadge}>{t("डिजाइन नमुना", "REDESIGN SAMPLE")}</span>
          {t("तस्बिरहरू मूल वेबसाइटका सार्वजनिक सामग्रीबाट सङ्कलित हुन्। शीर्षकहरू उदाहरणका लागि प्रस्तुत छन्।", "Images are public reference assets from the original website; titles are illustrative in this redesign.")}
        </p>

        <div className={styles.gallery}>
          <a className={styles.feature} href={albumUrls[featuredAlbum.id] || GALLERY_LIST_URL} target="_blank" rel="noreferrer">
            <span className={styles.featureImage}>
              <Image src={featuredAlbum.image} alt={lang === "ne" ? featuredAlbum.imageAlt : featuredAlbum.imageAltEn} fill sizes="(max-width: 760px) 100vw, 56vw" />
              <span className={styles.photoCount}><Images size={14} aria-hidden="true" />{featuredAlbum.photoCount} {t("तस्बिर", "photos")}</span>
            </span>
            <span className={styles.featureCaption}>
              <span className={styles.captionMeta}>{t("कार्यक्रमको झलक", "PROGRAMME MOMENT")}</span>
              <strong>{lang === "ne" ? featuredAlbum.title : featuredAlbum.titleEn}</strong>
              <span className={styles.openAlbum}>{t("सङ्ग्रह हेर्नुहोस्", "Open album")}<ArrowUpRight size={15} aria-hidden="true" /></span>
            </span>
          </a>

          <div className={styles.albumGrid}>
            {albums.slice(1).map((album) => (
              <a className={styles.albumCard} href={albumUrls[album.id] || GALLERY_LIST_URL} target="_blank" rel="noreferrer" key={album.id}>
                <span className={styles.albumImage}>
                  <Image src={album.image} alt={lang === "ne" ? album.imageAlt : album.imageAltEn} fill sizes="(max-width: 760px) 44vw, 25vw" />
                  <span className={styles.photoCount}><Images size={13} aria-hidden="true" />{album.photoCount}</span>
                </span>
                <span className={styles.albumCaption}>
                  <strong>{lang === "ne" ? album.title : album.titleEn}</strong>
                  <span>{t("सङ्ग्रह खोल्नुहोस्", "Open album")}<ArrowUpRight size={14} aria-hidden="true" /></span>
                </span>
              </a>
            ))}
          </div>
        </div>
        <a className={styles.mobileAllLink} href={GALLERY_LIST_URL}>
          {t("सबै फोटो सङ्ग्रह हेर्नुहोस्", "Browse all photo albums")}<ArrowRight size={17} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
