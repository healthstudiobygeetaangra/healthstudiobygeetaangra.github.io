import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-wellness-new.png";
import logo from "@/assets/logo.png";
import consultantPhoto from "@/assets/consultant-photo.jpg";
import { Heart, Target, Users, Award, Mail, Phone, MapPin, ArrowRight, Menu, Sparkles, Zap, Moon, Activity, Flame, Brain, Scale, Send, MessageCircle } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import LeadCaptureDialog from "@/components/LeadCaptureDialog";

const WHATSAPP_NUMBER = "919310178956";

// Custom hook for scroll animations
const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

// Services section with scroll animations
const ServicesSection = ({ navigate, onLearnMore }: { navigate: (path: string) => void; onLearnMore: () => void }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  // Signature Programs (featured)
  const signaturePrograms = [
    {
      icon: Heart,
      title: "Gut Health Reset",
      description: "30-60 days structured healing to restore digestive health and balance gut bacteria",
      route: "/gut-reset-program",
      isSignature: true,
    },
    {
      icon: Target,
      title: "Sustainable Fat Loss",
      description: "6-8 months science-backed weight management focused on metabolism and hormones",
      route: "/fat-loss-program",
      isSignature: true,
    },
  ];

  // Other services
  const otherServices = [
    {
      icon: Users,
      title: "Hormonal & Women's Health",
      description: "Support for PCOD, thyroid, diabetes, digestive issues & hormonal imbalances",
    },
    {
      icon: Award,
      title: "Lifestyle Transformation",
      description: "Holistic guidance combining modern nutrition with traditional wisdom",
    }
  ];

  return (
    <section id="services" ref={sectionRef} className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className={cn(
          "text-center mb-12 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What We Offer
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive wellness services tailored to your unique needs
          </p>
        </div>

        {/* Signature Programs */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {signaturePrograms.map((program, idx) => (
            <div 
              key={idx}
              className={cn(
                "relative bg-card p-6 rounded-3xl shadow-warm border-2 border-primary/20 transition-all duration-500",
                "hover:shadow-xl hover:-translate-y-2 hover:border-primary/50",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              )}
              style={{ transitionDelay: isVisible ? `${idx * 100}ms` : '0ms' }}
            >
              <div className="absolute -top-3 left-4">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                  ✨ Signature Program
                </span>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mb-4 mt-2">
                <program.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {program.title}
              </h3>
              <p className="text-muted-foreground mb-4">
                {program.description}
              </p>
              <Button 
                variant="wellness" 
                size="sm"
                onClick={() => navigate(program.route)}
                className="gap-2 group"
              >
                Learn More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>

        {/* Other Services */}
        <div className="grid md:grid-cols-2 gap-6">
          {otherServices.map((service, idx) => (
            <div 
              key={idx}
              className={cn(
                "card-enhanced bg-card p-6 rounded-3xl shadow-soft transition-all duration-500",
                "hover:shadow-warm hover:-translate-y-2",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              )}
              style={{ transitionDelay: isVisible ? `${200 + idx * 100}ms` : '0ms' }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mb-4">
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
                onClick={onLearnMore}
                className="gap-2 group"
              >
                Learn More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>

        <div className={cn(
          "text-center mt-10 transition-all duration-700 delay-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate("/services")}
            className="gap-2 group hover:bg-primary hover:text-primary-foreground"
          >
            View All Services
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

// Health concern card data
const healthConcerns = [
  { icon: Sparkles, title: "Gut Health", description: "Bloating, constipation, acidity, poor digestion & low immunity" },
  { icon: Zap, title: "Energy & Sleep", description: "Fatigue, low energy, and disturbed sleep patterns" },
  { icon: Moon, title: "Hormonal Health", description: "PCOD, thyroid imbalance & menopause challenges" },
  { icon: Activity, title: "Metabolic Disorders", description: "Diabetes, high blood pressure & fatty liver" },
  { icon: Flame, title: "Pain & Inflammation", description: "Joint pain, knee pain & arthritis conditions" },
  { icon: Brain, title: "Neurological & Skin", description: "Migraine, skin issues & related concerns" },
  { icon: Scale, title: "Weight Management", description: "Weight gain & fat-loss resistance" },
];

// About section with scroll animations
const AboutSection = ({ consultantPhoto }: { consultantPhoto: string }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section id="about" ref={sectionRef} className="py-16 md:py-24 bg-card overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header with elegant typography */}
        <div className={cn(
          "text-center mb-16 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <span className="text-primary font-medium text-sm tracking-wider uppercase mb-3 block">Welcome to</span>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4 leading-tight">
            Health Studio by Geeta Angra
          </h2>
          <div className="w-24 h-1 bg-gradient-wellness mx-auto rounded-full mb-6"></div>
          <p className="font-playfair text-xl md:text-2xl text-muted-foreground italic max-w-2xl mx-auto">
            Empowering you to heal from within
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">
          {/* Left column - Image and intro */}
          <div className={cn(
            "space-y-8 transition-all duration-700 delay-200",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          )}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-wellness opacity-20 blur-3xl rounded-full"></div>
              <img 
                src={consultantPhoto} 
                alt="Health Studio by Geeta Angra" 
                className="rounded-3xl shadow-warm relative z-10 w-full hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
            
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                Health Studio by Geeta Angra is a <span className="text-foreground font-medium">holistic nutrition and lifestyle wellness centre</span> dedicated to helping individuals improve their health through root-cause healing and sustainable lifestyle changes.
              </p>
              <p>
                The studio is led by <span className="text-foreground font-medium">Nutritionist Geeta Angra</span>, a Gut, Hormonal Health & Fat Loss Nutritionist and Certified Diabetic Educator, who believes that true health comes from understanding the body, not fighting it with extreme diets or temporary solutions.
              </p>
              <p>
                At Health Studio by Geeta Angra, the approach goes beyond calorie counting. We focus on <span className="text-primary font-medium">gut health, hormonal balance, metabolic health</span>, and daily lifestyle habits that influence weight, energy, digestion, blood sugar control, and overall well-being.
                Our MPESS-based approach focuses on healing the root cause to bring long-lasting results.
              </p>
            </div>
          </div>
          
          {/* Right column - Who We Help cards */}
          <div className={cn(
            "transition-all duration-700 delay-400",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
          )}>
            <h3 className="font-playfair text-2xl md:text-3xl font-semibold text-foreground mb-2">
              Who We Help
            </h3>
            <p className="text-muted-foreground mb-8">We support individuals dealing with:</p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {healthConcerns.map((concern, idx) => (
                <div 
                  key={idx}
                  className={cn(
                    "group bg-background/60 backdrop-blur-sm border border-border/50 rounded-2xl p-4 transition-all duration-500 hover:shadow-warm hover:-translate-y-1 hover:border-primary/30",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  )}
                  style={{ transitionDelay: isVisible ? `${400 + idx * 80}ms` : '0ms' }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <concern.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm mb-1">{concern.title}</h4>
                      <p className="text-muted-foreground text-xs leading-relaxed">{concern.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Mission statement */}
            <div className={cn(
              "mt-10 relative transition-all duration-700 delay-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-wellness rounded-full"></div>
              <blockquote className="pl-6 py-2">
                <p className="font-playfair text-lg md:text-xl text-foreground italic leading-relaxed mb-4">
                  "Our mission is to empower you with personalised nutrition plans, practical lifestyle guidance, and sustainable habits so you can heal from within and live a healthier, confident, and fear-free life."
                </p>
                <footer className="text-primary font-medium">
                  — Geeta Angra & Team
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Landing = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [leadDialogOpen, setLeadDialogOpen] = useState(false);
  const [leadActionType, setLeadActionType] = useState<"chat" | "book_free" | "book_paid">("chat");

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
  ];

  const handleWhatsAppClick = () => {
    setLeadActionType("chat");
    setLeadDialogOpen(true);
  };

  const handleBookFreeClick = () => {
    setLeadActionType("book_free");
    setLeadDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Lead Capture Dialog */}
      <LeadCaptureDialog 
        open={leadDialogOpen} 
        onOpenChange={setLeadDialogOpen} 
        actionType={leadActionType}
      />

      {/* Floating WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-heartbeat"
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </button>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Mobile: Hamburger + Logo */}
          <div className="flex items-center gap-2">
            {/* Mobile Hamburger Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="h-14 w-14">
                  <Menu className="h-8 w-8" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] p-6">
                <div className="flex items-center gap-2 mb-8">
                  <img src={logo} alt="HealthStudio" className="h-12" />
                </div>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        setMobileMenuOpen(false);
                        window.location.hash = link.href;
                      }}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-border/50"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
                <div className="mt-8 pt-4 border-t border-border">
                  <Button
                    onClick={() => {
                      handleWhatsAppClick();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full gap-2 bg-green-500 hover:bg-green-600"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chat on WhatsApp
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <img src={logo} alt="HealthStudio by Geeta Angra" className="h-16 md:h-24" />
          </div>
          
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a 
                key={link.href}
                href={link.href} 
                className="text-foreground/80 hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop WhatsApp CTA */}
          <div className="hidden md:block">
            <Button 
              onClick={handleWhatsAppClick}
              className="gap-2 bg-green-500 hover:bg-green-600"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 md:space-y-8 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Your Journey to{" "}
                <span className="text-primary bg-gradient-to-r from-primary to-primary/70 bg-clip-text">Better Health</span> Starts Here
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Get personalized nutrition guidance from a certified consultant who truly cares about your wellness goals. Take the first step today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                  variant="wellness" 
                  size="lg"
                  onClick={() => navigate("/questionnaire")}
                  className="group shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Heart className="mr-2 group-hover:scale-110 transition-transform" />
                  Start Your Journey
                </Button>
                <Button 
                  variant="soft" 
                  size="lg"
                  onClick={() => navigate("/consultant")}
                  className="hover:bg-secondary/80 transition-colors"
                >
                  Meet Your Consultant
                </Button>
              </div>
            </div>
            <div className="relative animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="absolute inset-0 bg-gradient-wellness opacity-20 blur-3xl rounded-full animate-pulse"></div>
              <img 
                src={heroImage} 
                alt="Wellness lifestyle with healthy food and yoga essentials" 
                className="rounded-3xl shadow-warm relative z-10 w-full hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About the Consultant Section */}
      <AboutSection consultantPhoto={consultantPhoto} />

      {/* What We Offer Section */}
      <ServicesSection navigate={navigate} onLearnMore={handleWhatsAppClick} />

      {/* Clients Review Section */}
      <TestimonialsCarousel />

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Contact
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get in touch with us for your wellness journey
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Contact Info & Social */}
              <div className="space-y-6">
                {/* Contact Info */}
                <div className="bg-card p-6 rounded-3xl shadow-soft">
                  <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
                    <span className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </span>
                    Get In Touch
                  </h3>
                  
                  <div className="space-y-4">
                    <a 
                      href="mailto:healthstudiobygeetaangra@gmail.com"
                      className="flex items-center gap-4 p-3 rounded-xl bg-primary/5 hover:bg-primary/10 transition-all duration-300 group hover:-translate-y-1"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium text-foreground text-sm">healthstudiobygeetaangra@gmail.com</p>
                      </div>
                    </a>

                    <a 
                      href="https://wa.me/919310178956"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-3 rounded-xl bg-green-500/10 hover:bg-green-500/20 transition-all duration-300 group hover:-translate-y-1"
                    >
                      <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Phone className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">WhatsApp (Preferred)</p>
                        <p className="font-medium text-green-600">+91 9310178956</p>
                      </div>
                    </a>

                    <a 
                      href="https://maps.app.goo.gl/CGjpsRFy1aqVjk4r6?g_st=aw"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-3 rounded-xl bg-primary/5 hover:bg-primary/10 transition-all duration-300 group hover:-translate-y-1"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Studio Address</p>
                        <p className="font-medium text-foreground text-sm">J-3A, Ground Floor, Vikas Puri, New Delhi</p>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Social Links */}
                <div className="bg-card p-6 rounded-3xl shadow-soft">
                  <h3 className="text-xl font-semibold text-foreground mb-6">Connect With Us</h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <a 
                      href="https://wa.me/919310178956"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl bg-green-500/10 hover:bg-green-500/20 text-green-600 transition-all duration-300 hover:scale-105"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      <span className="font-medium text-sm">WhatsApp</span>
                    </a>
                    
                    <a 
                      href="https://www.instagram.com/healthstudiobygeetaangra?igsh=MWV3M3JqMXpxamlreQ=="
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram profile"
                      className="flex items-center gap-3 p-3 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 text-pink-600 transition-all duration-300 hover:scale-105"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      <span className="font-medium text-sm">Instagram</span>
                    </a>

                    <a 
                      href="https://www.linkedin.com/in/nutritionist-geeta-angra-2a225977"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn profile"
                      className="flex items-center gap-3 p-3 rounded-xl bg-blue-700/10 hover:bg-blue-700/20 text-blue-700 transition-all duration-300 hover:scale-105"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11.5 20h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm14 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      <span className="font-medium text-sm">LinkedIn</span>
                    </a>

                    <a 
                      href="https://www.facebook.com/share/1Cpr2fE5Ck/?mibextid=wwXIfr"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook profile"
                      className="flex items-center gap-3 p-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 transition-all duration-300 hover:scale-105"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span className="font-medium text-sm">Facebook</span>
                    </a>

                    <a 
                      href="https://youtube.com/@healthstudiobygeetaangra?si=Rz8ynlp9a8aax8LA"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube profile"
                      className="flex items-center gap-3 p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 transition-all duration-300 hover:scale-105"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      <span className="font-medium text-sm">YouTube</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column - Contact Form */}
              <div id="contact-form" className="bg-card p-6 md:p-8 rounded-3xl shadow-soft">
                <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-3">
                  <span className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Send className="w-5 h-5 text-primary" />
                  </span>
                  Send Us a Message
                </h3>
                <p className="text-muted-foreground mb-6 text-sm">
                  Fill out the form and we'll get back to you shortly.
                </p>
                <ContactForm compact />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-wellness">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Transform Your Health?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Connect with us on WhatsApp and start your personalized wellness journey today
          </p>
          <Button 
            size="lg"
            onClick={handleWhatsAppClick}
            className="shadow-warm hover:scale-105 transition-transform bg-white text-green-600 hover:bg-gray-100"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Chat on WhatsApp Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;
