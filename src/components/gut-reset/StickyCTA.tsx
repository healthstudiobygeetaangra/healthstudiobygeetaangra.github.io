import { webinarPrice } from "@/data/gutResetWebinar";

interface StickyCTAProps {
  onClick: () => void;
}

const StickyCTA = ({ onClick }: StickyCTAProps) => {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#E7E1D8] bg-white/95 p-3 backdrop-blur md:hidden">
      <button
        type="button"
        onClick={onClick}
        className="w-full rounded-full bg-[#2EAF54] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#249246]"
      >
        Reserve Spot – ₹{webinarPrice}
      </button>
    </div>
  );
};

export default StickyCTA;
