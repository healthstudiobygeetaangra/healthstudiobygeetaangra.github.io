import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { webinarAccessCards } from "@/data/gutResetWebinar";
import { cardClassName, fadeInUp } from "./shared";

interface WebinarAccessCardsProps {
  onReserveSpot: () => void;
}

const WebinarAccessCards = ({ onReserveSpot }: WebinarAccessCardsProps) => {
  return (
    <motion.section {...fadeInUp} className={cardClassName}>
      <h2 className="font-serif text-3xl text-[#2F2B28]">Access Pass</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-1">
        {webinarAccessCards.map((card) => (
          <article
            key={card.title}
            className={`relative rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm ${
              card.recommended
                ? "border-[#2EAF54] bg-[#F3FBF5]"
                : "border-[#E7E1D8] bg-[#FCFBF8]"
            }`}
          >
            {card.recommended ? (
              <span className="absolute -top-2 right-4 rounded-full bg-[#2EAF54] px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                Recommended
              </span>
            ) : null}
            <h3 className="text-base font-semibold text-[#2F2B28]">{card.title}</h3>
            <p className="mt-1 font-serif text-3xl text-[#2F2B28]">₹{card.price}</p>
            <ul className="mt-3 space-y-2">
              {card.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-[#5F5851]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2EAF54]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={onReserveSpot}
              className="mt-4 w-full rounded-full bg-[#2EAF54] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#249246]"
            >
              Reserve Spot – ₹{card.price}
            </button>
          </article>
        ))}
      </div>
    </motion.section>
  );
};

export default WebinarAccessCards;
