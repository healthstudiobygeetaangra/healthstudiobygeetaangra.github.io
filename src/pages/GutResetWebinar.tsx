import { motion } from "framer-motion";
import { CheckCircle2, Leaf, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import EnrollmentForm from "@/components/gut-reset/EnrollmentForm";
import FAQSection from "@/components/gut-reset/FAQSection";
import FinalCTA from "@/components/gut-reset/FinalCTA";
import HeroSection from "@/components/gut-reset/HeroSection";
import ModulesSection from "@/components/gut-reset/ModulesSection";
import ProgramIncludes from "@/components/gut-reset/ProgramIncludes";
import StickyCTA from "@/components/gut-reset/StickyCTA";
import SuccessStories from "@/components/gut-reset/SuccessStories";
import SymptomsSection from "@/components/gut-reset/SymptomsSection";
import WellnessHighlightsSection from "@/components/gut-reset/WellnessHighlightsSection";
import WebinarAccessCards from "@/components/gut-reset/WebinarAccessCards";
import WhoIsThisFor from "@/components/gut-reset/WhoIsThisFor";
import WhyGutMatters from "@/components/gut-reset/WhyGutMatters";
import { webinarPrice } from "@/data/gutResetWebinar";
import { cardClassName, fadeInUp } from "@/components/gut-reset/shared";

const GutResetWebinar = () => {
  const navigate = useNavigate();

  const goToEnrollmentPage = () => navigate("/gut-reset-webinar/enroll");

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F8F5EF] text-[#2F2B28]">
      <div className="pointer-events-none absolute -left-20 -top-16 h-56 w-56 rounded-full bg-[#dbead4]/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-[#ede0cf]/70 blur-3xl" />
      <Leaf className="pointer-events-none absolute left-8 top-8 hidden h-14 w-14 text-[#B6864B]/35 xl:block" />
      <Leaf className="pointer-events-none absolute bottom-14 right-10 hidden h-16 w-16 text-[#2EAF54]/30 xl:block" />

      <main className="relative container mx-auto px-4 py-6 pb-24 md:py-10">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
          <div className="space-y-6">
            <HeroSection onPrimaryCTA={goToEnrollmentPage} />
            <ProgramIncludes />

            <motion.section {...fadeInUp} className={cardClassName}>
              <h2 className="font-serif text-3xl text-[#2F2B28]">Inside The Program</h2>
              <div className="mt-4 grid gap-3">
                {[
                  "Webinar Access",
                  "Introductory Wellness Modules",
                  "Meal Plan Sample",
                  "Anti-Inflammatory Recipes",
                  "WhatsApp Support",
                  "Hormonal Balance Tips",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-[#5F5851]">
                    <CheckCircle2 className="h-4 w-4 text-[#2EAF54]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={goToEnrollmentPage}
                className="mt-5 w-full rounded-full bg-[#2EAF54] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#249246]"
              >
                Unlock Access – ₹{webinarPrice}
              </button>
            </motion.section>
          </div>

          <div className="space-y-6">
            <SymptomsSection />
            <WhyGutMatters />
            <SuccessStories />
          </div>

          <div className="space-y-6">
            <ModulesSection />
            <WhoIsThisFor />
            <WebinarAccessCards onReserveSpot={goToEnrollmentPage} />
          </div>

          <div className="space-y-6">
            <motion.section {...fadeInUp} className={cardClassName}>
              <h2 className="font-serif text-3xl text-[#2F2B28]">Why Join This Webinar</h2>
              <div className="mt-4 rounded-2xl border border-[#d8eadf] bg-gradient-to-br from-[#dff0e1] to-[#cde7d4] p-4">
                <ul className="space-y-2 text-sm text-[#31553b]">
                  {[
                    "30–60 Day Wellness Focus",
                    "Root Cause Healing",
                    "Better Digestion",
                    "Hormonal Health",
                  ].map((point) => (
                    <li key={point} className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-[#2EAF54]" />
                      {point}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={goToEnrollmentPage}
                  className="mt-4 w-full rounded-full bg-[#2EAF54] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#249246]"
                >
                  Reserve Spot – ₹{webinarPrice}
                </button>
              </div>
            </motion.section>
            <FAQSection />
            <EnrollmentForm />
          </div>
        </div>

        <section className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-4 xl:items-stretch">
          <div className="xl:col-span-3">
            <WellnessHighlightsSection />
          </div>
          <div className="xl:col-span-1 flex">
            <FinalCTA onClick={goToEnrollmentPage} className="h-full w-full" />
          </div>
        </section>
      </main>

      <Footer />
      <StickyCTA onClick={goToEnrollmentPage} />
    </div>
  );
};

export default GutResetWebinar;
