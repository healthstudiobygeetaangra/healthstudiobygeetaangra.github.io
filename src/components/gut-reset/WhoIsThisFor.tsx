import { motion } from "framer-motion";
import { whoIsThisFor } from "@/data/gutResetWebinar";
import { cardClassName, fadeInUp, getFeatureIcon } from "./shared";

const WhoIsThisFor = () => {
  return (
    <motion.section {...fadeInUp} className={cardClassName}>
      <h2 className="font-serif text-3xl text-[#2F2B28]">Who Is This Program For</h2>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {whoIsThisFor.map((item) => {
          const Icon = getFeatureIcon(item.icon);
          return (
            <article
              key={item.title}
              className="rounded-2xl border border-[#E7E1D8] bg-[#FCFBF8] p-3 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm"
            >
              <Icon className="mx-auto h-4 w-4 text-[#B6864B]" />
              <h3 className="mt-2 text-xs font-semibold text-[#2F2B28]">{item.title}</h3>
            </article>
          );
        })}
      </div>
    </motion.section>
  );
};

export default WhoIsThisFor;
