import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/consultant-photo.jpg";
import { trustBadges, webinarPrice } from "@/data/gutResetWebinar";
import { fadeInUp, getTrustIcon } from "./shared";

interface HeroSectionProps {
  onPrimaryCTA: () => void;
}

const HeroSection = ({ onPrimaryCTA }: HeroSectionProps) => {
  return (
    <motion.section
      {...fadeInUp}
      className="rounded-[24px] border border-[#E7E1D8] bg-white p-6 shadow-sm"
    >
      <div className="space-y-5">
        <h1 className="font-serif text-3xl leading-tight text-[#2F2B28]">
          Heal Your Gut Naturally in 30–60 Days
        </h1>
        <p className="text-sm leading-relaxed text-[#5F5851]">
          Reduce bloating, acidity, constipation, fatigue, inflammation, hormonal imbalance and stubborn weight gain with a structured wellness program by Geeta Angra.
        </p>

        <button
          type="button"
          onClick={onPrimaryCTA}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2EAF54] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#249246]"
        >
          Reserve Spot – ₹{webinarPrice}
          <ArrowRight className="h-4 w-4" />
        </button>

        <div className="overflow-hidden rounded-2xl border border-[#E7E1D8] bg-[#F8F5EF]">
          <img
            src={heroImage}
            alt="Consultant Geeta Angra"
            className="h-auto w-full object-cover object-top"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {trustBadges.map((badge) => {
            const Icon = getTrustIcon(badge.icon);
            return (
              <div
                key={badge.label}
                className="flex items-center gap-2 rounded-xl border border-[#E7E1D8] bg-[#FCFBF8] px-3 py-2 text-xs text-[#4B453F]"
              >
                <Icon className="h-4 w-4 text-[#B6864B]" />
                <span className="leading-tight">{badge.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
