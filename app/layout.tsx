import type { Metadata } from "next";
import "@fontsource/mukta/300.css";
import "@fontsource/mukta/400.css";
import "@fontsource/mukta/500.css";
import "@fontsource/mukta/600.css";
import "@fontsource/mukta/700.css";
import "@fontsource/mukta/800.css";
import "./globals.css";
import { LocaleProvider } from "./components/LocaleContext";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
export const metadata: Metadata = {
  title: "Youth and Small Entrepreneur Self-Development Fund | YSEF",
  description: "Services, notices, and resources from the Youth and Small Entrepreneur Self-Development Fund. Redesign prototype.",
  icons: {
    icon: [{ url: "/ysef-emblem.png", type: "image/png", sizes: "512x512" }],
    shortcut: "/ysef-emblem.png",
    apple: "/ysef-emblem.png",
  },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ne"><body id="top"><LocaleProvider><SiteHeader /><main id="main-content">{children}</main><SiteFooter /></LocaleProvider></body></html>;
}
