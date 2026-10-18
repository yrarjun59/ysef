"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useLocale } from "./LocaleContext";
import { withBasePath } from "../paths";

const slides = [
  {
    src: withBasePath("/reference-carousel/magazine-jestha.jpg"),
    title: "के गर्दैछ, स्वरोजगार कोष ?",
    titleEn: "What is the Self-Employment Fund doing?",
    description: "स्वरोजगार सन्देश — ज्येष्ठ",
    descriptionEn: "Self-employment message — Jestha edition",
    alt: "स्वरोजगार सन्देश ज्येष्ठ अंकको आवरण",
    altEn: "Cover of the Jestha issue of the Self-Employment Message magazine",
    fit: "contain",
  },
  {
    src: withBasePath("/reference-carousel/minister-office-appointment.jpg"),
    title: "युवा, श्रम तथा रोजगार मन्त्रीको पदबहाली",
    titleEn: "Minister for Youth, Labour and Employment assumes office",
    description: "मिति २०८२/१२/२७",
    descriptionEn: "27 Chaitra 2082",
    alt: "पदबहाली कार्यक्रममा सहभागी मन्त्री र अधिकारीहरू",
    altEn: "Minister and officials at an appointment ceremony",
    fit: "cover",
  },
  {
    src: withBasePath("/reference-carousel/minister-assumes-office.jpg"),
    title: "युवा तथा खेलकुद मन्त्रीको पदबहाली",
    titleEn: "Minister for Youth and Sports assumes office",
    description: "कोषका सार्वजनिक कार्यक्रम",
    descriptionEn: "Public programmes at the Fund",
    alt: "पदबहाली कार्यक्रममा सहभागीहरू",
    altEn: "Participants at an official appointment ceremony",
    fit: "cover",
  },
  {
    src: withBasePath("/reference-carousel/youth-programme-briefing.jpg"),
    title: "जेन्जी युवा लक्षित कार्यक्रम प्रस्तुतिकरण",
    titleEn: "Presentation of a programme for Gen Z youth",
    description: "मन्त्रीज्यू, कोषका पदाधिकारी र युवासहितको छलफल",
    descriptionEn: "Discussion with the minister, Fund officials, and young people",
    alt: "कार्यक्रमबारे छलफल गरिरहेका पदाधिकारीहरू",
    altEn: "Officials discussing a youth programme",
    fit: "cover",
  },
  {
    src: withBasePath("/reference-carousel/committee-meeting.jpg"),
    title: "कोषका कार्यक्रमबारे जानकारी",
    titleEn: "Briefing on the Fund’s programmes",
    description: "नीति र कार्यक्रमसम्बन्धी भेटघाट",
    descriptionEn: "A meeting on policy and programmes",
    alt: "बैठकमा सहभागी पदाधिकारीहरू",
    altEn: "Officials attending a meeting",
    fit: "cover",
  },
  {
    src: withBasePath("/reference-carousel/oath-and-appointment.jpeg"),
    title: "पद तथा गोपनीयताको शपथ ग्रहण",
    titleEn: "Oath of office and confidentiality",
    description: "कार्यकारी उपाध्यक्षको पदबहाली",
    descriptionEn: "Appointment of the executive vice-chairperson",
    alt: "शपथ ग्रहण कार्यक्रममा सहभागी पदाधिकारीहरू",
    altEn: "Officials at an oath-taking ceremony",
    fit: "cover",
  },
  {
    src: withBasePath("/reference-carousel/board-meeting-59.jpeg"),
    title: "सञ्चालक समितिको ५९औँ बैठक",
    titleEn: "59th meeting of the Board of Directors",
    description: "मिति २०८२/०५/१२",
    descriptionEn: "12 Bhadra 2082",
    alt: "सञ्चालक समितिको बैठक",
    altEn: "Board of Directors meeting",
    fit: "cover",
  },
  {
    src: withBasePath("/reference-carousel/minister-briefing.jpeg"),
    title: "युवा तथा खेलकुद मन्त्रीसमक्ष कोषको ब्रिफिङ",
    titleEn: "Fund briefing to the Minister for Youth and Sports",
    description: "कोषका कार्यक्रमबारे जानकारी",
    descriptionEn: "An overview of the Fund’s programmes",
    alt: "मन्त्री र कोषका प्रतिनिधिबीचको भेट",
    altEn: "Meeting between the minister and Fund representatives",
    fit: "cover",
  },
] as const;

export default function HomepageCarousel() {
  const [active, setActive] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { lang, t } = useLocale();
  const current = slides[active];
  const go = (index: number) => setActive((index + slides.length) % slides.length);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsPlaying(!motionPreference.matches);
    const stopForReducedMotion = (event: MediaQueryListEvent) => {
      if (event.matches) setIsPlaying(false);
    };
    motionPreference.addEventListener("change", stopForReducedMotion);
    return () => motionPreference.removeEventListener("change", stopForReducedMotion);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => setActive((index) => (index + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  return (
    <section className="hero-carousel" aria-roledescription={t("छवि स्लाइडर", "carousel")} aria-label={t("कोषका कार्यक्रमका तस्बिरहरू", "Photos from Fund programmes")} onFocusCapture={() => setIsPlaying(false)} onMouseEnter={() => setIsPlaying(false)}>
      <div className="hero-carousel-image">
        <Image
          key={current.src}
          src={current.src}
          alt={lang === "ne" ? current.alt : current.altEn}
          fill
          priority={active === 0}
          sizes="(max-width: 900px) 100vw, 48vw"
          className={`hero-carousel-photo hero-carousel-photo-${current.fit}`}
        />
      </div>
      <div className="hero-carousel-wash" aria-hidden="true" />
      <div className="hero-carousel-caption" aria-live={isPlaying ? "off" : "polite"} aria-atomic="true">
        <span className="hero-carousel-caption-copy">
          <strong>{lang === "ne" ? current.title : current.titleEn}</strong>
          <small>{lang === "ne" ? current.description : current.descriptionEn}</small>
        </span>
        <span className="hero-carousel-count">{active + 1} / {slides.length}</span>
      </div>
      <div className="hero-carousel-controls">
        <button type="button" onClick={() => go(active - 1)} aria-label={t("अघिल्लो तस्बिर", "Previous slide")}><ChevronLeft size={18} aria-hidden="true" /></button>
        <button type="button" className="hero-carousel-toggle" onClick={() => setIsPlaying((playing) => !playing)} aria-label={isPlaying ? t("स्लाइड रोक्नुहोस्", "Pause slideshow") : t("स्लाइड चलाउनुहोस्", "Play slideshow")} aria-pressed={isPlaying}>{isPlaying ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}</button>
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            className={`hero-carousel-dot ${index === active ? "is-active" : ""}`}
            onClick={() => go(index)}
            aria-label={t(`${index + 1} नम्बरको तस्बिर देखाउनुहोस्`, `Show slide ${index + 1}`)}
            aria-current={index === active ? "true" : undefined}
          />
        ))}
        <button type="button" onClick={() => go(active + 1)} aria-label={t("अर्को तस्बिर", "Next slide")}><ChevronRight size={18} aria-hidden="true" /></button>
      </div>
    </section>
  );
}
