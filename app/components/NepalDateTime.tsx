"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import NepaliDate from "nepali-date-converter";
import type { Language } from "./LocaleContext";

const timezone = "Asia/Kathmandu";

function getNepalDateTime(now: Date, lang: Language) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(now);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  const localDate = new Date(Number(values.year), Number(values.month) - 1, Number(values.day), 12);
  const bikramSambat = NepaliDate.fromAD(localDate).format("ddd DD MMMM YYYY", lang === "ne" ? "np" : "en");
  const time = new Intl.DateTimeFormat(lang === "ne" ? "ne-NP" : "en-NP", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    numberingSystem: lang === "ne" ? "deva" : "latn",
  }).format(now);

  // This reproduces the tithi shown in the original YSEF page reference.
  // A tithi is a sunrise-based lunar day, so do not infer it from the BS date.
  const tithiLabel = lang === "ne"
    ? "११४६ कौलाथ्व षष्ठी - ६"
    : "1146 Kaulā Thwa Shashthi — 6";

  return { bikramSambat, time, tithiLabel };
}

export default function NepalDateTime({ lang }: { lang: Language }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    const untilNextMinute = 60_000 - (Date.now() % 60_000);
    let minuteInterval: number | undefined;
    const firstMinuteTimeout = window.setTimeout(() => {
      update();
      minuteInterval = window.setInterval(update, 60_000);
    }, untilNextMinute);

    return () => {
      window.clearTimeout(firstMinuteTimeout);
      if (minuteInterval !== undefined) window.clearInterval(minuteInterval);
    };
  }, []);

  const dateTime = now ? getNepalDateTime(now, lang) : null;
  const label = dateTime
    ? lang === "ne"
      ? `वि.सं: ${dateTime.bikramSambat}, ${dateTime.time} बजे`
      : `BS: ${dateTime.bikramSambat} · ${dateTime.time} NPT`
    : lang === "ne"
      ? "नेपालको मिति र समय लोड हुँदैछ…"
      : "Loading Nepal date and time…";

  return (
    <div className="header-calendar-snapshot" lang={lang} aria-label={dateTime ? `${label}. ${lang === "ne" ? "नेपाल संवत तिथि" : "Nepal Sambat tithi"}: ${dateTime.tithiLabel}` : lang === "ne" ? "नेपालको वर्तमान मिति र समय" : "Current date and time in Nepal"}>
      <Image className="header-date-flag" src="/nepal-flag-animated.gif" width={50} height={68} alt="" aria-hidden="true" unoptimized priority />
      <span className="header-calendar-copy">
        <strong>{dateTime ? <time dateTime={now?.toISOString()}>{label}</time> : label}</strong>
        <small>{dateTime ? `${lang === "ne" ? "नेपाल संवत:" : "Nepal Sambat:"} ${dateTime.tithiLabel}` : lang === "ne" ? "तिथि लोड हुँदैछ…" : "Loading today's tithi…"}</small>
      </span>
    </div>
  );
}
