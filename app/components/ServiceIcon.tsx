import { BadgePercent, BriefcaseBusiness, GraduationCap, HandCoins, Handshake, ShieldCheck, ShoppingBag, WalletCards } from "lucide-react";
import type { Service } from "../data";
export default function ServiceIcon({ name, size = 25 }: { name: Service["icon"]; size?: number }) {
  const props = { size, strokeWidth: 1.8, "aria-hidden": true as const };
  if (name === "insurance") return <ShieldCheck {...props} />;
  if (name === "loan") return <WalletCards {...props} />;
  if (name === "subsidy") return <BadgePercent {...props} />;
  if (name === "market") return <ShoppingBag {...props} />;
  if (name === "business") return <BriefcaseBusiness {...props} />;
  if (name === "training") return <GraduationCap {...props} />;
  if (name === "partner") return <Handshake {...props} />;
  return <HandCoins {...props} />;
}
