import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { webinarPrice } from "@/data/gutResetWebinar";
import { fadeInUp } from "./shared";

interface FinalCTAProps {
  onClick: () => void;
}

const FinalCTA = ({ onClick }: FinalCTAProps) => {
  return (
    <motion.section
      {...fadeInUp}
      className="rounded-[24px] border border-[#d8eadf] bg-gradient-to-br from-[#dcefdc] to-[#cce6d2] p-6 shadow-sm"
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
    </motion.section>
  );
};

export default FinalCTA;
