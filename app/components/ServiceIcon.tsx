import { BriefcaseBusiness, GraduationCap, Handshake, Landmark, ShieldCheck, ShoppingBag, Sparkles, WalletCards } from "lucide-react";
import type { Service } from "../data";
export default function ServiceIcon({ name, size = 25 }: { name: Service["icon"]; size?: number }) {
  const props = { size, strokeWidth: 1.8, "aria-hidden": true as const };
  if (name === "wallet") return <WalletCards {...props} />;
  if (name === "shield") return <ShieldCheck {...props} />;
  if (name === "graduation") return <GraduationCap {...props} />;
  if (name === "market") return <ShoppingBag {...props} />;
  if (name === "spark") return <Sparkles {...props} />;
  if (name === "partner") return <Handshake {...props} />;
  return <BriefcaseBusiness {...props} />;
}
