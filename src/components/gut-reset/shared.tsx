import {
  Activity,
  Apple,
  BadgeCheck,
  BatteryLow,
  Candy,
  Droplets,
  Flame,
  HeartPulse,
  Leaf,
  MoonStar,
  Salad,
  Sparkles,
  Users,
  Weight,
  type LucideIcon,
} from "lucide-react";
import type { FeatureCardItem, TrustBadgeItem } from "@/data/gutResetWebinar";

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45, ease: "easeOut" },
};

export const cardClassName =
  "rounded-[24px] border border-[#E7E1D8] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md";

const featureIconMap: Record<FeatureCardItem["icon"], LucideIcon> = {
  activity: Activity,
  users: Users,
  flame: Flame,
  "battery-low": BatteryLow,
  "moon-star": MoonStar,
  weight: Weight,
  "heart-pulse": HeartPulse,
  salad: Salad,
  candy: Candy,
  sparkles: Sparkles,
  droplets: Droplets,
  apple: Apple,
};

const trustIconMap: Record<TrustBadgeItem["icon"], LucideIcon> = {
  users: Users,
  "badge-check": BadgeCheck,
  sparkles: Sparkles,
  leaf: Leaf,
};

export const getFeatureIcon = (key: FeatureCardItem["icon"]): LucideIcon =>
  featureIconMap[key];

export const getTrustIcon = (key: TrustBadgeItem["icon"]): LucideIcon =>
  trustIconMap[key];
