"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Images, Play, X } from "lucide-react";
import { galleryAlbums } from "../data";
import { useLocale } from "../components/LocaleContext";

export default function GalleryPage() {
  const { lang, t } = useLocale();
  const [activeTab, setActiveTab] = useState("photos");
  const [selected, setSelected] = useState<number | null>(null);
  const current = selected === null ? null : galleryAlbums[selected];
  useEffect(() => {
    const syncAlbum = () => {
      const albumId = window.location.hash.slice(1);
      const index = galleryAlbums.findIndex((album) => album.id === albumId);
      if (index >= 0) setSelected(index);
    };
    syncAlbum();
    window.addEventListener("hashchange", syncAlbum);
    return () => window.removeEventListener("hashchange", syncAlbum);
  }, []);
  useEffect(() => {
    if (!current) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowRight") setSelected((index) => (index === null ? 0 : (index + 1) % galleryAlbums.length));
      if (event.key === "ArrowLeft") setSelected((index) => (index === null ? 0 : (index + galleryAlbums.length - 1) % galleryAlbums.length));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [current]);
  return <div className="inner-page">
    <div className="page-intro-band"><div className="wrap"><div className="breadcrumbs"><Link href="/">{t("गृह पृष्ठ", "Home")}</Link><span>/</span><span>{t("मिडिया केन्द्र", "Media center")}</span></div><span className="eyebrow">{t("कार्यक्रमका झलक", "FROM FUND EVENTS")}</span><h1>{t("तस्बिर र भिडियो", "Photos and videos")}</h1><p>{t("कोषका कार्यक्रम, तालिम, साझेदारी र सार्वजनिक भेटघाटका दृश्यहरू।", "Browse public photos from the Fund’s programmes, training, partnerships, and events.")}</p></div></div>
    <section className="wrap inner-content gallery-page">
      <div className="gallery-toolbar"><div className="filter-tabs" role="group" aria-label={t("मिडिया प्रकार", "Media type")}><button type="button" aria-pressed={activeTab === "photos"} className={activeTab === "photos" ? "selected" : ""} onClick={() => setActiveTab("photos")}><Images size={15} />{t("तस्बिरहरू", "Photos")}</button><button type="button" id="videos" aria-pressed={activeTab === "videos"} className={activeTab === "videos" ? "selected" : ""} onClick={() => setActiveTab("videos")}><Play size={14} />{t("भिडियोहरू", "Videos")}</button></div><a className="text-link" href="https://ysef.gov.np/gallery-list/" target="_blank" rel="noopener noreferrer">{t("मूल तस्बिर ग्यालरी", "Original photo gallery")}<ArrowUpRight size={15} /></a></div>
      {activeTab === "photos" ? <><div className="gallery-grid">{galleryAlbums.map((album, index) => <button type="button" className="gallery-card" id={album.id} key={album.id} onClick={() => setSelected(index)}><span className="gallery-image"><Image src={album.image} alt={lang === "ne" ? album.imageAlt : album.imageAltEn} fill sizes="(max-width:700px) 45vw, 30vw" /></span><span className="gallery-card-copy"><strong>{lang === "ne" ? album.title : album.titleEn}</strong><small>{lang === "ne" ? `${album.photoCount} तस्बिरहरू` : `${album.photoCount} photos`}</small></span></button>)}</div><p className="content-sample-note">{t("तस्बिरहरू सार्वजनिक YSEF गृहपृष्ठको ग्यालरी पूर्वावलोकनबाट हुन्। पूर्ण एल्बमको लागि मूल साइट खोल्नुहोस्।", "Photos are from the public YSEF homepage gallery preview. Open the source site for complete albums.")}</p></> : <div className="video-library-card"><span className="video-library-icon"><Play size={22} /></span><div><span className="eyebrow">{t("मूल साइटको भिडियो संग्रह", "OFFICIAL VIDEO ARCHIVE")}</span><h2>{t("YSEF का भिडियोहरू", "YSEF video library")}</h2><p>{t("मूल साइटको भिडियो पृष्ठमा उपलब्ध कार्यक्रम र जानकारीमूलक सामग्री हेर्नुहोस्।", "Visit the original video page for event recordings and information videos.")}</p><a className="button button-primary" href="https://ysef.gov.np/pages/videos1/" target="_blank" rel="noopener noreferrer">{t("भिडियो संग्रह खोल्नुहोस्", "Open video archive")}<ArrowUpRight size={15} /></a></div></div>}
    </section>
    {current && <div className="gallery-modal-scrim" role="presentation" onClick={(event) => { if (event.target === event.currentTarget) setSelected(null); }}><section className="gallery-modal" role="dialog" aria-modal="true" aria-labelledby="gallery-modal-title"><div className="gallery-modal-top"><span>{selected! + 1} / {galleryAlbums.length}</span><button type="button" className="icon-button" onClick={() => setSelected(null)} aria-label={t("बन्द गर्नुहोस्", "Close")}><X size={20} /></button></div><div className="gallery-modal-image"><Image src={current.image} alt={lang === "ne" ? current.imageAlt : current.imageAltEn} fill sizes="90vw" /></div><div className="gallery-modal-caption"><div><h2 id="gallery-modal-title">{lang === "ne" ? current.title : current.titleEn}</h2><p>{lang === "ne" ? `${current.photoCount} तस्बिरहरू · सार्वजनिक ग्यालरी पूर्वावलोकन` : `${current.photoCount} photos · public gallery preview`}</p></div><div className="gallery-modal-arrows"><button type="button" className="icon-button" onClick={() => setSelected((selected! + galleryAlbums.length - 1) % galleryAlbums.length)} aria-label={t("अघिल्लो एल्बम", "Previous album")}><ArrowLeft size={19} /></button><button type="button" className="icon-button" onClick={() => setSelected((selected! + 1) % galleryAlbums.length)} aria-label={t("अर्को एल्बम", "Next album")}><ArrowRight size={19} /></button></div></div></section></div>}
  </div>;
}
