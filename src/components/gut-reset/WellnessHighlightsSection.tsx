import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import successStoryTileBg from "@/assets/Success_Story__Image_tile.png";
import whatYouWillAchieveBg from "@/assets/What_you_will_acheive.png";
import { webinarTestimonials } from "@/data/gutResetWebinar";
import { fadeInUp } from "./shared";

const WellnessHighlightsSection = () => {
  const [desktopIndex, setDesktopIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const maxDesktopIndex = Math.max(0, webinarTestimonials.length - 3);
  const maxMobileIndex = Math.max(0, webinarTestimonials.length - 1);

  const scrollTestimonialsDesktop = (direction: "left" | "right") => {
    setDesktopIndex((previous) => {
      if (direction === "left") {
        return previous === 0 ? maxDesktopIndex : previous - 1;
      }
      return previous === maxDesktopIndex ? 0 : previous + 1;
    });
  };

  const scrollTestimonialsMobile = (direction: "left" | "right") => {
    setMobileIndex((previous) => {
      if (direction === "left") {
        return previous === 0 ? maxMobileIndex : previous - 1;
      }
      return previous === maxMobileIndex ? 0 : previous + 1;
    });
  };

  const visibleDesktopTestimonials = webinarTestimonials.slice(desktopIndex, desktopIndex + 3);
  const visibleMobileTestimonial = webinarTestimonials[mobileIndex];

  return (
    <div className="space-y-3 lg:space-y-2">
      <motion.section
        {...fadeInUp}
        className="overflow-hidden rounded-[24px] border border-[#d9e0d2] bg-white shadow-[0_12px_30px_rgba(69,91,66,0.12)]"
      >
        <img
          src={whatYouWillAchieveBg}
          alt="What You'll Achieve"
          className="block h-auto w-full max-w-none object-contain"
        />
      </motion.section>

      <motion.section
        {...fadeInUp}
        className="relative overflow-hidden rounded-[24px] border border-[#e3ddd2] p-3 shadow-[0_14px_28px_rgba(47,43,40,0.1)] md:p-3"
      >
        <img
          src={successStoryTileBg}
          alt="Success stories background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(255,250,245,0.55)] backdrop-blur-[1.5px]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,241,232,0.42)_0%,rgba(255,250,245,0.2)_50%,rgba(248,241,232,0.4)_100%)]" />

        <button
          type="button"
          aria-label="Previous testimonials"
          onClick={() => scrollTestimonialsDesktop("left")}
          className="absolute left-4 top-4 z-20 hidden h-10 w-10 items-center justify-center rounded-xl border border-[#e4dfd3] bg-[#f4efe6]/90 text-[#2F2B28] shadow-sm transition hover:bg-white lg:flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next testimonials"
          onClick={() => scrollTestimonialsDesktop("right")}
          className="absolute right-4 top-4 z-20 hidden h-10 w-10 items-center justify-center rounded-xl border border-[#e4dfd3] bg-[#f4efe6]/90 text-[#2F2B28] shadow-sm transition hover:bg-white lg:flex"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="relative z-10 hidden grid-cols-3 gap-2 pb-1 pt-11 lg:grid xl:gap-3">
          {visibleDesktopTestimonials.map((testimonial) => (
            <article
              key={`${desktopIndex}-${testimonial.name}-${testimonial.quote}`}
              className="flex flex-1 items-center justify-center rounded-2xl border border-white/45 bg-white/[0.18] px-3 py-3 text-center shadow-[0_8px_24px_rgba(47,43,40,0.08)] backdrop-blur-[2.5px]"
            >
              <div>
                <p className="mx-auto max-w-[14ch] font-serif text-[2rem] font-semibold leading-[1.1] italic text-[#2b2118] [text-shadow:0_1px_2px_rgba(255,255,255,0.4)] [text-wrap:balance]">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p className="mt-2 font-serif text-[1.65rem] font-semibold leading-[1.08] italic text-[#2b2118] [text-shadow:0_1px_2px_rgba(255,255,255,0.35)]">
                  - {testimonial.name}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div
          className="relative z-10 px-2 pb-1 pt-11 text-center lg:hidden"
          onTouchStart={(event) => setTouchStartX(event.touches[0]?.clientX ?? null)}
          onTouchEnd={(event) => {
            if (touchStartX === null) {
              return;
            }
            const endX = event.changedTouches[0]?.clientX ?? touchStartX;
            const delta = touchStartX - endX;
            if (Math.abs(delta) > 40) {
              scrollTestimonialsMobile(delta > 0 ? "right" : "left");
            }
            setTouchStartX(null);
          }}
        >
          <article
            key={`${mobileIndex}-${visibleMobileTestimonial.name}`}
            className="mx-auto w-full max-w-[28rem] rounded-2xl border border-white/45 bg-white/[0.2] px-4 py-4 shadow-[0_8px_24px_rgba(47,43,40,0.08)] backdrop-blur-[2.5px]"
          >
            <p className="mx-auto max-w-[18ch] font-serif text-4xl font-semibold leading-[1.15] italic text-[#2b2118] [text-shadow:0_1px_2px_rgba(255,255,255,0.4)] [text-wrap:balance]">
              &ldquo;{visibleMobileTestimonial.quote}&rdquo;
            </p>
            <p className="mt-3 font-serif text-3xl font-semibold leading-[1.1] italic text-[#2b2118] [text-shadow:0_1px_2px_rgba(255,255,255,0.35)]">
              - {visibleMobileTestimonial.name}
            </p>
          </article>
        </div>

        <button
          type="button"
          aria-label="Previous testimonials"
          onClick={() => scrollTestimonialsMobile("left")}
          className="absolute left-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-xl border border-[#e4dfd3] bg-[#f4efe6]/90 text-[#2F2B28] shadow-sm transition hover:bg-white lg:hidden"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next testimonials"
          onClick={() => scrollTestimonialsMobile("right")}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-xl border border-[#e4dfd3] bg-[#f4efe6]/90 text-[#2F2B28] shadow-sm transition hover:bg-white lg:hidden"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </motion.section>
    </div>
  );
};

export default WellnessHighlightsSection;
