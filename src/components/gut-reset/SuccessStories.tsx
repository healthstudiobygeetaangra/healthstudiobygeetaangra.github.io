import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { successStories } from "@/data/gutResetWebinar";
import { cardClassName, fadeInUp } from "./shared";

const SuccessStories = () => {
  return (
    <motion.section {...fadeInUp} className={cardClassName}>
      <h2 className="font-serif text-3xl text-[#2F2B28]">Success Stories</h2>
      <div className="mt-4 space-y-3">
        {successStories.map((story) => (
          <article
            key={story.name}
            className="rounded-2xl border border-[#E7E1D8] bg-[#FCFBF8] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-[#2F2B28]">{story.name}</p>
              <div className="flex items-center gap-1 text-[#B6864B]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
            </div>
            <p className="mt-2 text-sm text-[#5F5851]">{story.quote}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#2EAF54]">
              {story.result}
            </p>
          </article>
        ))}
      </div>
    </motion.section>
  );
};

export default SuccessStories;
