"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Accessibility, AlignCenter, AlignLeft, AlignRight, BookOpenCheck, Check, Contrast, ImageOff, MousePointer2, Palette, Pause, RotateCcw, SpellCheck2, Type, X } from "lucide-react";
import { useLocale } from "./LocaleContext";

type TextAlign = "default" | "left" | "center" | "right";
type Saturation = "normal" | "low" | "high";
type Settings = {
  textScale: 100 | 110 | 120 | 130;
  highContrast: boolean;
  textAlign: TextAlign;
  colorFilter: boolean;
  textSpacing: boolean;
  lineHeight: boolean;
  systemFont: boolean;
  saturation: Saturation;
  dyslexiaFriendly: boolean;
  biggerCursor: boolean;
  hideImages: boolean;
  pauseAnimations: boolean;
};

const STORAGE_KEY = "ysef-accessibility-settings-v1";
const defaults: Settings = {
  textScale: 100,
  highContrast: false,
  textAlign: "default",
  colorFilter: false,
  textSpacing: false,
  lineHeight: false,
  systemFont: false,
  saturation: "normal",
  dyslexiaFriendly: false,
  biggerCursor: false,
  hideImages: false,
  pauseAnimations: false,
};

export default function AccessibilityWidget() {
  const { t } = useLocale();
  const [settings, setSettings] = useState<Settings>(defaults);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setSettings({ ...defaults, ...JSON.parse(saved) as Partial<Settings> });
    } catch {
      // The menu remains usable for this visit when browser storage is unavailable.
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    root.style.zoom = settings.textScale + "%";
    body.dataset.a11yContrast = settings.highContrast ? "on" : "off";
    body.dataset.a11yAlign = settings.textAlign;
    body.dataset.a11yColorFilter = settings.colorFilter ? "on" : "off";
    body.dataset.a11yTextSpacing = settings.textSpacing ? "on" : "off";
    body.dataset.a11yLineHeight = settings.lineHeight ? "on" : "off";
    body.dataset.a11yFont = settings.systemFont ? "system" : "default";
    body.dataset.a11ySaturation = settings.saturation;
    body.dataset.a11yDyslexia = settings.dyslexiaFriendly ? "on" : "off";
    body.dataset.a11yCursor = settings.biggerCursor ? "large" : "default";
    body.dataset.a11yImages = settings.hideImages ? "hidden" : "shown";
    body.dataset.a11yMotion = settings.pauseAnimations ? "paused" : "normal";
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Settings still apply until the page is closed.
    }
  }, [settings]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  function update<K extends keyof Settings>(key: K, value: Settings[K]) {
    setSettings((current) => ({ ...current, [key]: value }));
  }

  function toggle(key: "highContrast" | "colorFilter" | "textSpacing" | "lineHeight" | "systemFont" | "dyslexiaFriendly" | "biggerCursor" | "hideImages" | "pauseAnimations") {
    update(key, !settings[key]);
  }

  const toggleLabels: Array<{ key: Parameters<typeof toggle>[0]; ne: string; en: string; icon: ReactNode }> = [
    { key: "highContrast", ne: "उच्च कन्ट्रास्ट", en: "High contrast", icon: <Contrast size={20} aria-hidden="true" /> },
    { key: "colorFilter", ne: "रङ फिल्टर", en: "Color filter", icon: <Palette size={20} aria-hidden="true" /> },
    { key: "textSpacing", ne: "अक्षर र शब्द दूरी", en: "Text spacing", icon: <SpellCheck2 size={20} aria-hidden="true" /> },
    { key: "lineHeight", ne: "पङ्क्ति दूरी", en: "Line height", icon: <AlignLeft size={20} aria-hidden="true" /> },
    { key: "systemFont", ne: "प्रणाली फन्ट", en: "System font", icon: <Type size={20} aria-hidden="true" /> },
    { key: "dyslexiaFriendly", ne: "डिस्लेक्सिया मैत्री", en: "Dyslexia friendly", icon: <BookOpenCheck size={20} aria-hidden="true" /> },
    { key: "biggerCursor", ne: "ठूलो कर्सर", en: "Bigger cursor", icon: <MousePointer2 size={20} aria-hidden="true" /> },
    { key: "hideImages", ne: "तस्बिर लुकाउनुहोस्", en: "Hide images", icon: <ImageOff size={20} aria-hidden="true" /> },
    { key: "pauseAnimations", ne: "एनिमेसन रोक्नुहोस्", en: "Pause animations", icon: <Pause size={20} aria-hidden="true" /> },
  ];

  const saturationLabels: Record<Saturation, string> = {
    normal: t("सामान्य", "Normal"),
    low: t("कम", "Low"),
    high: t("धेरै", "High"),
  };

  return <div className="accessibility-widget">
    {open && <section className="accessibility-panel" id="accessibility-panel" aria-label={t("पहुँचयोग्यता उपकरणहरू", "Accessibility tools")}>
      <div className="accessibility-panel-heading">
        <span className="accessibility-panel-title"><Accessibility size={19} aria-hidden="true" />{t("पहुँचयोग्यता उपकरणहरू", "Accessibility tools")}</span>
        <div className="accessibility-panel-actions">
          <button type="button" className="a11y-reset" onClick={() => setSettings(defaults)}><RotateCcw size={14} aria-hidden="true" />{t("सबै रिसेट", "Reset all")}</button>
          <button type="button" className="a11y-close" onClick={() => setOpen(false)} aria-label={t("पहुँचयोग्यता मेनु बन्द गर्नुहोस्", "Close accessibility menu")}><X size={18} aria-hidden="true" /></button>
        </div>
      </div>

      <div className="a11y-text-size">
        <span className="a11y-setting-copy"><span className="a11y-setting-icon"><Type size={20} aria-hidden="true" /></span><span>{t("अक्षरको आकार", "Text size")}</span></span>
        <div className="a11y-stepper" aria-label={t("अक्षर आकार", "Text size")}>
          <button type="button" aria-label={t("अक्षर सानो बनाउनुहोस्", "Decrease text size")} disabled={settings.textScale === 100} onClick={() => update("textScale", (settings.textScale - 10) as Settings["textScale"])}>A−</button>
          <output aria-live="polite">{settings.textScale}%</output>
          <button type="button" aria-label={t("अक्षर ठूलो बनाउनुहोस्", "Increase text size")} disabled={settings.textScale === 130} onClick={() => update("textScale", (settings.textScale + 10) as Settings["textScale"])}>A+</button>
        </div>
      </div>

      <div className="a11y-setting-group">
        <span className="a11y-group-label">{t("पढ्ने शैली", "Reading preferences")}</span>
        {toggleLabels.slice(0, 7).map(({ key, ne, en, icon }) => <button type="button" key={key} className="a11y-setting-row" role="switch" aria-checked={settings[key]} onClick={() => toggle(key)}>
          <span className="a11y-setting-copy"><span className="a11y-setting-icon">{icon}</span><span>{t(ne, en)}</span></span><span className={"a11y-switch " + (settings[key] ? "is-on" : "")} aria-hidden="true"><span /></span>
        </button>)}
        <div className="a11y-choice-row"><span>{t("पाठ मिलाउने", "Text alignment")}</span><div className="a11y-choice-group" role="group" aria-label={t("पाठ मिलाउने", "Text alignment")}>
          {(["default", "left", "center", "right"] as const).map((alignment) => <button type="button" key={alignment} aria-pressed={settings.textAlign === alignment} aria-label={alignment === "default" ? t("स्वचालित मिलान", "Automatic alignment") : alignment === "left" ? t("बायाँ मिलाउनुहोस्", "Align left") : alignment === "center" ? t("बीचमा मिलाउनुहोस्", "Align center") : t("दायाँ मिलाउनुहोस्", "Align right")} onClick={() => update("textAlign", alignment)}>{alignment === "default" ? <Type size={18} aria-hidden="true" /> : alignment === "left" ? <AlignLeft size={18} aria-hidden="true" /> : alignment === "center" ? <AlignCenter size={18} aria-hidden="true" /> : <AlignRight size={18} aria-hidden="true" />}<span>{alignment === "default" ? t("सामान्य", "Auto") : alignment === "left" ? t("बायाँ", "Left") : alignment === "center" ? t("बीच", "Center") : t("दायाँ", "Right")}</span></button>)}
        </div></div>
      </div>

      <div className="a11y-setting-group a11y-visual-group">
        <span className="a11y-group-label">{t("दृश्य प्राथमिकता", "Visual preferences")}</span>
        {toggleLabels.slice(7).map(({ key, ne, en, icon }) => <button type="button" key={key} className="a11y-setting-row" role="switch" aria-checked={settings[key]} onClick={() => toggle(key)}>
          <span className="a11y-setting-copy"><span className="a11y-setting-icon">{icon}</span><span>{t(ne, en)}</span></span><span className={"a11y-switch " + (settings[key] ? "is-on" : "")} aria-hidden="true"><span /></span>
        </button>)}
        <div className="a11y-choice-row"><span>{t("रङको तीव्रता", "Saturation")}</span><div className="a11y-choice-group" role="group" aria-label={t("रङको तीव्रता", "Saturation")}>
          {(["normal", "low", "high"] as const).map((value) => <button type="button" key={value} aria-pressed={settings.saturation === value} onClick={() => update("saturation", value)}>{saturationLabels[value]}</button>)}
        </div></div>
      </div>
      <p className="a11y-note">{t("यी विकल्पहरू यस उपकरणमा सुरक्षित हुन्छन्।", "These preferences are saved on this device.")}</p>
    </section>}

    <button ref={triggerRef} type="button" className="accessibility-trigger" aria-label={t("पहुँचयोग्यता उपकरण खोल्नुहोस्", "Open accessibility tools")} title={t("पहुँचयोग्यता उपकरण", "Accessibility tools")} aria-expanded={open} aria-controls="accessibility-panel" onClick={() => setOpen((value) => !value)}>
      <Accessibility size={21} aria-hidden="true" />
      <span className="a11y-trigger-label">{t("पहुँचयोग्यता", "Accessibility")}</span>
      <span className="a11y-trigger-short" aria-hidden="true">{t("पहुँच", "Access")}</span>
      {Object.entries(settings).some(([key, value]) => key !== "textScale" && value !== false && value !== "default" && value !== "normal") && <span className="a11y-active-dot" aria-label={t("सेटिङहरू सक्रिय", "Settings active")}><Check size={11} aria-hidden="true" /></span>}
    </button>
  </div>;
}
