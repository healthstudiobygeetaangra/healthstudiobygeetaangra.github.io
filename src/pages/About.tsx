import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, Zap, Moon, Activity, Flame, Brain, Scale, Heart } from "lucide-react";
import consultantPhoto from "@/assets/consultant-photo.jpg";
import Footer from "@/components/Footer";

const healthConcerns = [
  { icon: Sparkles, title: "Gut Health", description: "Bloating, constipation, acidity, poor digestion & low immunity" },
  { icon: Zap, title: "Energy & Sleep", description: "Fatigue, low energy, and disturbed sleep patterns" },
  { icon: Moon, title: "Hormonal Health", description: "PCOD, thyroid imbalance & menopause challenges" },
  { icon: Activity, title: "Metabolic Disorders", description: "Diabetes, high blood pressure & fatty liver" },
  { icon: Flame, title: "Pain & Inflammation", description: "Joint pain, knee pain & arthritis conditions" },
  { icon: Brain, title: "Neurological & Skin", description: "Migraine, skin issues & related concerns" },
  { icon: Scale, title: "Weight Management", description: "Weight gain & fat-loss resistance" },
];

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
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

      {/* Main Content */}
      <main className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Header with elegant typography */}
          <div className="text-center mb-16">
            <span className="text-primary font-medium text-sm tracking-wider uppercase mb-3 block">About Us</span>
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4 leading-tight">
              Health Studio by Geeta Angra
            </h1>
            <div className="w-24 h-1 bg-gradient-wellness mx-auto rounded-full mb-6"></div>
            <p className="font-playfair text-xl md:text-2xl text-muted-foreground italic max-w-2xl mx-auto">
              Empowering you to heal from within
            </p>
          </div>

          {/* Main content grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">
            {/* Left column - Image and intro */}
            <div className="space-y-8">
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
                  The studio is led by <span className="text-foreground font-medium">Geeta Angra</span>, a Gut, Hormonal Health & Fat Loss Nutritionist and Certified Diabetic Educator, who believes that true health comes from understanding the body, not fighting it with extreme diets or temporary solutions.
                </p>
                <p>
                  At Health Studio by Geeta Angra, the approach goes beyond calorie counting. We focus on <span className="text-primary font-medium">gut health, hormonal balance, metabolic health</span>, and daily lifestyle habits that influence weight, energy, digestion, blood sugar control, and overall well-being.
                  Our MPESS-based approach focuses on healing the root cause to bring long-lasting results.
                </p>
              </div>
            </div>
            
            {/* Right column - Who We Help cards */}
            <div>
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-foreground mb-2">
                Who We Help
              </h2>
              <p className="text-muted-foreground mb-8">We support individuals dealing with:</p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {healthConcerns.map((concern, idx) => (
                  <div 
                    key={idx}
                    className="group bg-card border border-border/50 rounded-2xl p-4 transition-all duration-500 hover:shadow-warm hover:-translate-y-1 hover:border-primary/30"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <concern.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm mb-1">{concern.title}</h3>
                        <p className="text-muted-foreground text-xs leading-relaxed">{concern.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Mission statement */}
              <div className="mt-10 relative">
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

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-soft max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Ready to Start Your Wellness Journey?
              </h2>
              <p className="text-muted-foreground mb-6">
                Take the first step towards better health with our personalized approach.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="wellness" 
                  size="lg"
                  onClick={() => navigate("/questionnaire")}
                  className="gap-2"
                >
                  <Heart className="w-4 h-4" />
                  Start Your Journey
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate("/consultant")}
                >
                  Meet Your Consultant
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
