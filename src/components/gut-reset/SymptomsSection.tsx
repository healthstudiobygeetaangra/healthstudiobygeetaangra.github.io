import { motion } from "framer-motion";
import { symptoms } from "@/data/gutResetWebinar";
import { cardClassName, fadeInUp, getFeatureIcon } from "./shared";

const SymptomsSection = () => {
  return (
    <motion.section {...fadeInUp} className={cardClassName}>
      <h2 className="font-serif text-3xl text-[#2F2B28]">Symptoms Section</h2>
      <p className="mt-2 text-sm text-[#5F5851]">
        Are you struggling with these symptoms?
      </p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {symptoms.map((item) => {
          const Icon = getFeatureIcon(item.icon);
          return (
            <div
              key={item.title}
              className="rounded-2xl border border-[#E7E1D8] bg-[#FCFBF8] p-3 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm"
            >
              <Icon className="mx-auto h-4 w-4 text-[#B6864B]" />
              <p className="mt-2 text-xs font-medium text-[#2F2B28]">{item.title}</p>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default SymptomsSection;
