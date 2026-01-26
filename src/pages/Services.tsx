import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Target, Users, Award, Apple, Dumbbell, Baby, Leaf, ArrowRight, Flame, Star } from "lucide-react";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import LeadCaptureDialog from "@/components/LeadCaptureDialog";

const WHATSAPP_NUMBER = "919310178956";

const Services = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [leadDialogOpen, setLeadDialogOpen] = useState(false);
  const [selectedProgramName, setSelectedProgramName] = useState<string | undefined>(undefined);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const handleLearnMoreClick = (programName: string) => {
    setSelectedProgramName(programName);
    setLeadDialogOpen(true);
  };

  // Signature Programs (with dedicated pages)
  const signaturePrograms = [
    {
      icon: Leaf,
      title: "Gut Health Reset",
      subtitle: "Heal Your Gut. Balance Your Hormones.",
      description: "30-60 days structured healing process to restore digestive health, reduce inflammation, and balance gut bacteria naturally.",
      route: "/gut-reset-program",
      color: "green",
      iconComponent: Leaf,
    },
    {
      icon: Target,
      title: "Sustainable Fat Loss",
      subtitle: "HIGH METABOLISM SLIMMING PROCESS",
      description: "6-8 months science-backed weight management program focused on metabolism and hormones for healthy, sustainable results.",
      route: "/fat-loss-program",
      color: "primary",
      iconComponent: Flame,
    }
  ];

  // Normal Programs (WhatsApp redirect)
  const normalPrograms = [
    {
      icon: Heart,
      title: "Root-Cause Nutrition",
      description: "Personalized plans that address underlying causes — gut health, hormones, stress & metabolism — not just calories"
    },
    {
      icon: Users,
      title: "Hormonal Balance",
      description: "Specialized support for PCOD, thyroid imbalances, menopause challenges & hormonal harmony"
    },
    {
      icon: Award,
      title: "Diabetes Management",
      description: "Evidence-based nutrition guidance for blood sugar control, prevention & healthy living with diabetes"
    },
    {
      icon: Apple,
      title: "Metabolic Health",
      description: "Address fatty liver, high blood pressure & metabolic disorders through targeted nutrition strategies"
    },
    {
      icon: Baby,
      title: "Women's Wellness",
      description: "Holistic nutrition for pregnancy, postpartum recovery, and every stage of a woman's health journey"
    },
    {
      icon: Dumbbell,
      title: "Lifestyle Transformation",
      description: "Combining modern nutrition with traditional wisdom for lasting energy, confidence & sustainable change"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Lead Capture Dialog */}
      <LeadCaptureDialog
        open={leadDialogOpen}
        onOpenChange={(open) => {
          setLeadDialogOpen(open);
          if (!open) setSelectedProgramName(undefined);
        }}
        actionType="chat"
        title={selectedProgramName ? `Learn More About ${selectedProgramName}` : "Learn More About Our Programs"}
        programName={selectedProgramName}
      />

      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
      </header>

      {/* Services Section */}
      <section ref={sectionRef} className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className={cn(
            "text-center mb-12 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              All Our Services
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive wellness services tailored to your unique needs
            </p>
          </div>

          {/* Signature Programs Section */}
          <div className={cn(
            "mb-16 transition-all duration-700 delay-100",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <div className="flex items-center gap-3 mb-8">
              <Star className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Signature Programs
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {signaturePrograms.map((program, idx) => (
                <div 
                  key={idx}
                  className={cn(
                    "relative bg-card p-6 md:p-8 rounded-3xl shadow-warm border-2 transition-all duration-500",
                    "hover:shadow-xl hover:-translate-y-2",
                    program.color === "green" 
                      ? "border-green-200 dark:border-green-800 hover:border-green-400" 
                      : "border-primary/20 hover:border-primary/50",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  )}
                  style={{ transitionDelay: isVisible ? `${idx * 150}ms` : '0ms' }}
                >
                  {/* Signature Badge */}
                  <div className="absolute -top-3 left-6">
                    <span className={cn(
                      "px-4 py-1 rounded-full text-sm font-semibold",
                      program.color === "green" 
                        ? "bg-green-500 text-white" 
                        : "bg-primary text-primary-foreground"
                    )}>
                      ✨ Signature
                    </span>
                  </div>

                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mt-2",
                    program.color === "green" 
                      ? "bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20" 
                      : "bg-gradient-to-br from-primary/20 to-primary/10"
                  )}>
                    <program.iconComponent className={cn(
                      "w-8 h-8",
                      program.color === "green" ? "text-green-600" : "text-primary"
                    )} />
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                    {program.title}
                  </h3>
                  <p className={cn(
                    "text-sm font-medium mb-3",
                    program.color === "green" ? "text-green-600" : "text-primary"
                  )}>
                    {program.subtitle}
                  </p>
                  <p className="text-muted-foreground mb-6">
                    {program.description}
                  </p>
                  
                  <Button
                    variant={program.color === "green" ? "outline" : "wellness"}
                    size="lg"
                    className={cn(
                      "w-full gap-2 group",
                      program.color === "green" && "border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700"
                    )}
                    onClick={() => navigate(program.route)}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Normal Programs Section */}
          <div className={cn(
            "transition-all duration-700 delay-300",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
              Other Programs
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {normalPrograms.map((service, idx) => (
                <div 
                  key={idx}
                  className={cn(
                    "card-enhanced bg-card p-6 rounded-3xl shadow-soft transition-all duration-500",
                    "hover:shadow-warm hover:-translate-y-2",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  )}
                  style={{ transitionDelay: isVisible ? `${300 + idx * 100}ms` : '0ms' }}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2 group"
                    onClick={() => handleLearnMoreClick(service.title)}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className={cn(
            "text-center mt-12 transition-all duration-700 delay-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <Button 
              variant="wellness" 
              size="lg"
              onClick={() => navigate("/contact")}
            >
              Contact Us for More Info
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
