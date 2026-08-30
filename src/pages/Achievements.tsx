import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Award, X } from "lucide-react";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

// Award ceremony images
import felicitationShawl from "@/assets/achievements/felicitation-shawl.jpeg";
import receivingTrophy from "@/assets/achievements/receiving-trophy.jpeg";
import ipacMemento from "@/assets/achievements/ipac-memento.jpeg";
import honoraryDoctorateCitation from "@/assets/achievements/honorary-doctorate-citation.jpeg";
import pressInteraction from "@/assets/achievements/press-interaction.jpeg";
import pressTable from "@/assets/achievements/press-table.jpeg";
import withHonourees from "@/assets/achievements/with-honourees.jpeg";

const stats = [
  { value: "300+", label: "Women guided" },
  { value: "11", label: "Certifications earned" },
  { value: "1", label: "Honorary Doctorate" },
];

const gallery = [
  { src: receivingTrophy, caption: "Receiving the Emerging Achievers trophy on stage." },
  { src: ipacMemento, caption: "The Iconic Peace Award Council memento, presented at the ceremony." },
  { src: felicitationShawl, caption: "Being felicitated with the ceremonial shawl." },
  { src: pressTable, caption: "With the Honorary Doctorate citation at the press interaction." },
  { src: withHonourees, caption: "With Lt. Gen. J. S. Dhillon and fellow honourees at the summit." },
  { src: pressInteraction, caption: "Speaking to the press outside the Constitution Club of India." },
];

const milestones = [
  {
    year: "Academics",
    title: "B.Sc., B.Ed., GNIIT",
    detail: "A science foundation that later shaped a root-cause approach to nutrition.",
  },
  {
    year: "2023",
    title: "FSSAI Registration",
    detail: "Health Studio by Geeta Angra formally registered with the Food Safety and Standards Authority of India.",
  },
  {
    year: "2024",
    title: "Advanced training year",
    detail: "Gut Health, Hormone Health Coaching, Functional Medicine Foundation and Dietary Supplementation.",
  },
  {
    year: "2025",
    title: "Ayurvedic Diet & Nutrition",
    detail: "Traditional wisdom added to the modern, science-backed practice.",
  },
  {
    year: "2026",
    title: "Certified Diabetic Educator & Heal India",
    detail: "Diabetic Nutrition certification and recognition under the Skill India Heal India initiative.",
  },
  {
    year: "Aug 2026",
    title: "Iconic Honorary Doctorate Award",
    detail: "Conferred by the Iconic Peace Award Council at the Emerging Achievers Awards, New Delhi.",
  },
];

const featuredDetails = [
  { label: "Occasion", value: "Emerging Achievers Awards" },
  { label: "Date", value: "22 August 2026" },
  { label: "Venue", value: "Constitution Club of India, New Delhi" },
];

const Achievements = () => {
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="gap-2 hover:bg-primary/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <span className="w-[7px] h-[7px] rounded-full bg-primary" />
            <span className="text-sm font-semibold tracking-wide uppercase text-primary">
              Honours &amp; Recognition
            </span>
          </div>
          <h1 className="font-playfair text-3xl md:text-5xl font-semibold text-foreground leading-tight mb-5">
            Awards &amp; <span className="text-primary">Achievements</span>
          </h1>
          <div className="w-24 h-1 rounded-full mx-auto mb-6 bg-gradient-wellness" />
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-xl mx-auto">
            Every honour here belongs to the women who trusted the process. These are moments of
            gratitude — for a journey that began at home, with my own family's health.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="pb-12 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-card border border-border/70 rounded-2xl px-5 py-6 text-center shadow-soft"
              >
                <div className="font-playfair text-3xl md:text-4xl font-semibold text-primary leading-none">
                  {stat.value}
                </div>
                <div className="mt-2.5 text-sm font-medium text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Honour */}
      <section className="pb-14 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-card rounded-3xl overflow-hidden border border-border/70 shadow-warm">
            <div className="grid md:grid-cols-2">
              <div className="relative min-h-[280px] md:min-h-full bg-muted">
                <img
                  src={honoraryDoctorateCitation}
                  alt="Dr. (Hon.) Geeta Angra receiving the Iconic Honorary Doctorate Award"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-7 md:p-10 flex flex-col justify-center gap-4">
                <span className="self-start px-3.5 py-1.5 rounded-full bg-secondary/40 text-secondary-foreground text-xs font-semibold tracking-wide uppercase">
                  Featured Honour
                </span>
                <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-foreground leading-tight">
                  Iconic Honorary Doctorate Award
                </h2>
                <p className="text-sm font-semibold text-primary">
                  Iconic Peace Award Council (IPAC)
                </p>
                <div className="grid gap-2.5 pt-1">
                  {featuredDetails.map((row) => (
                    <div key={row.label} className="flex gap-3 items-baseline">
                      <span className="min-w-[82px] text-xs uppercase tracking-wide text-muted-foreground">
                        {row.label}
                      </span>
                      <span className="text-sm text-foreground">{row.value}</span>
                    </div>
                  ))}
                </div>
                <blockquote className="mt-2 pl-4 border-l-[3px] border-primary font-playfair italic text-base md:text-lg leading-relaxed text-foreground">
                  Honoured with an Honorary Doctorate in recognition of my contribution to Health,
                  Nutrition, Fitness &amp; Women's Wellness, and my commitment to empowering people to
                  live healthier lives. 🌸🙏
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Moments from the Ceremony */}
      <section className="pb-14 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-foreground mb-2">
                Moments from the Ceremony
              </h2>
              <p className="text-muted-foreground text-sm">New Delhi · August 2026</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {gallery.map((shot, idx) => (
                <figure
                  key={idx}
                  onClick={() => setLightbox(idx)}
                  className="group m-0 bg-card border border-border/70 rounded-2xl overflow-hidden shadow-soft cursor-zoom-in transition-all duration-500 hover:shadow-warm hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] bg-muted overflow-hidden">
                    <img
                      src={shot.src}
                      alt={shot.caption}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="px-4 pt-4 pb-4 text-sm leading-snug text-muted-foreground">
                    {shot.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Journey So Far */}
      <section className="py-14 md:py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-9">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-foreground mb-2">
                The Journey So Far
              </h2>
              <p className="text-muted-foreground text-sm">
                Learning never stopped — here are the milestones along the way.
              </p>
            </div>
            <div className="grid gap-1">
              {milestones.map((m) => (
                <div key={m.title} className="grid grid-cols-[76px_24px_1fr] sm:grid-cols-[92px_24px_1fr] items-start">
                  <div className="py-4 pr-3 text-right text-sm font-semibold text-primary">
                    {m.year}
                  </div>
                  <div className="relative self-stretch flex justify-center">
                    <span className="absolute inset-y-0 w-0.5 bg-primary-light" />
                    <span className="relative mt-5 w-[11px] h-[11px] rounded-full bg-primary ring-4 ring-muted" />
                  </div>
                  <div className="pt-3 pb-5 pl-4">
                    <div className="text-base font-semibold text-foreground mb-1">{m.title}</div>
                    <div className="text-sm leading-relaxed text-muted-foreground">{m.detail}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-7">
              <Button
                variant="outline"
                onClick={() => navigate("/certificates")}
                className="rounded-full bg-card gap-2 hover:border-primary hover:text-primary"
              >
                <Award className="h-4 w-4" />
                View all 11 certifications
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto rounded-3xl px-7 py-10 md:px-10 md:py-14 text-center bg-gradient-wellness shadow-warm">
            <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-primary-foreground mb-3 leading-snug">
              Let the same care work for your health.
            </h2>
            <p className="text-primary-foreground/90 text-sm md:text-base leading-relaxed max-w-lg mx-auto mb-7">
              Book a free consultation and we'll look at the root cause together.
            </p>
            <div className="flex flex-wrap gap-3.5 justify-center">
              <Button
                onClick={() => navigate("/book-appointment")}
                className="rounded-full bg-white text-primary hover:bg-white/90 font-semibold"
              >
                Book a Free Consultation
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/consultant")}
                className="rounded-full border-white/70 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground font-semibold"
              >
                Meet Your Consultant
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[90] bg-black/85 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-3xl w-full max-h-[88vh] overflow-auto bg-card rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-background/80 hover:bg-background rounded-full"
              onClick={() => setLightbox(null)}
            >
              <X className="h-5 w-5" />
            </Button>
            <img
              src={gallery[lightbox].src}
              alt={gallery[lightbox].caption}
              className="w-full h-auto block"
            />
            <div className="px-6 py-5 text-sm leading-relaxed text-muted-foreground">
              {gallery[lightbox].caption}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Achievements;
