import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { webinarPrice } from "@/data/gutResetWebinar";
import { cn } from "@/lib/utils";
import { fadeInUp } from "./shared";

interface FinalCTAProps {
  onClick: () => void;
  className?: string;
}

const FinalCTA = ({ onClick, className }: FinalCTAProps) => {
  return (
    <motion.section
      {...fadeInUp}
      className={cn(
        "rounded-[24px] border border-[#d8eadf] bg-gradient-to-br from-[#dcefdc] to-[#cce6d2] p-6 shadow-sm",
        className,
      )}
    >
      <h2 className="font-serif text-3xl text-[#2F2B28]">Ready To Heal Your Gut?</h2>
      <p className="mt-2 text-sm text-[#4B453F]">
        Reserve your webinar seat today and begin your wellness journey.
      </p>
      <button
        type="button"
        onClick={onClick}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2EAF54] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#249246]"
      >
        Reserve Spot – ₹{webinarPrice}
        <ArrowRight className="h-4 w-4" />
      </button>

      <ul className="mt-4 space-y-2.5">
        {["Webinar Recording", "Bonus PDFs", "Meal Plan Sample", "WhatsApp Support"].map((item) => (
          <li key={item} className="flex items-center gap-2 text-xs font-medium text-[#2f5a3a]">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#2EAF54]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 border-t border-[#9fbea5]/45 pt-3">
        <p className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-[#3f5a44]">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-[#2f7a47]" />
          Secure &amp; Instant Access
        </p>
        <ul className="mt-2 space-y-1.5 text-[11px] leading-relaxed text-[#5a4e45]">
          <li>• Secure payment via Razorpay</li>
          <li>• Access details sent immediately after payment</li>
          <li>• Beginner friendly and vegetarian friendly</li>
        </ul>
      </div>
    </motion.section>
  );
};

export default FinalCTA;
