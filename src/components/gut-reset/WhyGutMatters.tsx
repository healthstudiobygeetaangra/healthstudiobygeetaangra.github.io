import { motion } from "framer-motion";
import { benefits } from "@/data/gutResetWebinar";
import { cardClassName, fadeInUp, getFeatureIcon } from "./shared";

const WhyGutMatters = () => {
  return (
    <motion.section {...fadeInUp} className={cardClassName}>
      <h2 className="font-serif text-3xl text-[#2F2B28]">Why Gut Health Matters</h2>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {benefits.map((benefit) => {
          const Icon = getFeatureIcon(benefit.icon);
          return (
            <article
              key={benefit.title}
              className="rounded-2xl border border-[#E7E1D8] bg-[#F8F5EF] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm"
            >
              <Icon className="h-5 w-5 text-[#2EAF54]" />
              <h3 className="mt-2 text-sm font-semibold text-[#2F2B28]">{benefit.title}</h3>
            </article>
          );
        })}
      </div>
    </motion.section>
  );
};

export default WhyGutMatters;
