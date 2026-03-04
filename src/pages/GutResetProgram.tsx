import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Leaf, Star, MessageCircle, Sparkles, Brain, Heart, Activity } from "lucide-react";
import Footer from "@/components/Footer";
import LeadCaptureDialog from "@/components/LeadCaptureDialog";

const GutResetProgram = () => {
  const navigate = useNavigate();
  const [leadDialogOpen, setLeadDialogOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<{ name: string; price: string }>({
    name: "",
    price: "",
  });

  const handleEnrollClick = (programName: string, programPrice: string) => {
    setSelectedProgram({ name: programName, price: programPrice });
    setLeadDialogOpen(true);
  };

  const gutResetFeatures = [
    "2 online 1-to-1 sessions",
    "Free Nutritional bundle worth ₹3,000",
    "Free Detox drink PDF",
    "Stay on track diet",
    "WhatsApp support",
    "Weekly diet check for 30 days",
    "Your own coach",
  ];

  const gutStrengthenFeatures = [
    "4 online 1-to-1 sessions",
    "Free Nutritional bundle worth ₹7,000",
    "Free Detox drink PDF",
    "Lifestyle changes with stress management sessions",
    "Stay on track diet",
    "WhatsApp support",
    "Weekly diet check for 60 days",
    "Your own coach",
    "Free body composition analysis",
  ];

  const idealForConditions = [
    "Bloating, gas, acidity or indigestion",
    "Constipation or irregular bowel movements",
    "Food sensitivities or heaviness after meals",
    "Fatigue, brain fog or low immunity",
    "Hormonal imbalance, PCOD, thyroid issues",
    "Stubborn belly fat or difficulty losing weight",
    "Anxiety, mood swings or disturbed sleep",
  ];

  const gutControls = [
    { icon: Activity, title: "Digestion & metabolism" },
    { icon: Sparkles, title: "Hormones (estrogen, insulin, cortisol)" },
    { icon: Heart, title: "Immunity (70% immune cells are in the gut)" },
    { icon: Brain, title: "Mental health & mood (gut-brain connection)" },
  ];

  const benefits = [
    "Better digestion & less bloating",
    "Improved energy & immunity",
    "Balanced hormones",
    "Clearer skin",
    "Healthy weight loss",
    "Better sleep & mood",
    "Stronger gut & metabolism",
  ];

  const programIncludes = [
    "Personalised gut assessment",
    "Root-cause based nutrition plan",
    "Gut-friendly Indian meal plans",
    "Healing foods & lifestyle guidance",
    "Support for hormonal & metabolic balance",
    "Natural supplementation",
    "Weekly follow-ups & guidance",
    "Sustainable habits — no starvation, no extremes",
  ];

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Lead Capture Dialog */}
      <LeadCaptureDialog
        open={leadDialogOpen}
        onOpenChange={setLeadDialogOpen}
        actionType="enroll_program"
        programName={selectedProgram.name}
        programPrice={selectedProgram.price}
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

      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-green-50 via-background to-primary/5">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-6">
            <Leaf className="w-5 h-5" />
            <span className="font-semibold">Signature Program</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            🌿 Gut Health Programs
          </h1>
          <p className="text-xl md:text-2xl text-primary font-semibold mb-4">
            Heal Your Gut. Balance Your Hormones. Reset Your Health.
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            If you're struggling with bloating, acidity, constipation, gas, fatigue, stubborn weight, skin issues, or frequent mood swings — the root cause is often poor gut health.
          </p>
        </div>
      </section>

      {/* Program Description */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* What is Gut Reset */}
            <div className="bg-card rounded-3xl p-6 md:p-10 shadow-soft mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                What Is a Gut Reset?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our Gut Programs are a step-by-step, natural and science-backed approach to heal your digestive system, restore gut balance, and help your body function the way it is meant to.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                A Gut Reset/Strengthen is a structured healing process that focuses on:
              </p>
              <ul className="grid md:grid-cols-2 gap-3">
                {["Repairing the gut lining", "Improving digestion and nutrient absorption", "Reducing inflammation", "Balancing gut bacteria naturally"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                    <Leaf className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-foreground font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/20">
                <p className="text-foreground font-medium text-center">
                  This is not a crash diet or a short-term detox. It is a <span className="text-primary">personalised gut healing journey</span> designed for long-lasting results.
                </p>
              </div>
            </div>

            {/* Who Is This For */}
            <div className="bg-card rounded-3xl p-6 md:p-10 shadow-soft mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                🌱 Who Is This Program For?
              </h2>
              <p className="text-muted-foreground mb-6">This program is ideal for you if you experience:</p>
              <div className="grid md:grid-cols-2 gap-3">
                {idealForConditions.map((condition, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-primary/5 rounded-xl">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{condition}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* How Gut Health Affects Body */}
            <div className="bg-card rounded-3xl p-6 md:p-10 shadow-soft mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                🧠 How Gut Health Affects Your Whole Body
              </h2>
              <p className="text-muted-foreground mb-6">Your gut controls:</p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {gutControls.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">{item.title}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-lg font-medium text-primary">
                When your gut heals, your energy, hormones, skin, weight and mind start healing too.
              </p>
            </div>

            {/* What You Get */}
            <div className="bg-card rounded-3xl p-6 md:p-10 shadow-soft mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                🔄 What You Will Get
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {programIncludes.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-primary/5 rounded-xl">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Our Approach */}
            <div className="bg-card rounded-3xl p-6 md:p-10 shadow-soft mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                💚 Our Approach
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "Evidence-based + holistic",
                  "Indian food friendly",
                  "Focus on healing, not restriction",
                  "Suitable for working women, homemakers & menopausal women",
                  "Long-term results, not temporary fixes",
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl text-center">
                    <span className="text-foreground font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-card rounded-3xl p-6 md:p-10 shadow-soft mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                🌸 Benefits You Can Expect
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-xl">
                    <Sparkles className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Plans */}
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
              Choose Your Plan
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {/* Gut Reset Plan */}
              <div className="bg-card rounded-3xl p-6 md:p-8 shadow-soft border-2 border-border hover:border-green-500/50 transition-colors">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full mb-4">
                    <Leaf className="w-4 h-4" />
                    <span className="text-sm font-medium">30 Days</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">🌿 Gut Reset Program</h3>
                  <div className="flex items-center justify-center gap-3 mb-1">
                    <span className="text-xl md:text-2xl font-semibold text-muted-foreground line-through">
                      ₹12,000
                    </span>
                    <span className="text-4xl font-bold text-green-600">
                      ₹5,500
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">One-time payment</p>
                </div>
                <div className="space-y-2 mb-6">
                  {gutResetFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full gap-2 border-green-500 text-green-600 hover:bg-green-50"
                  onClick={() => handleEnrollClick("Gut Reset Program (30 Days)", "₹5,500")}
                >
                  <MessageCircle className="w-5 h-5" />
                  Enroll Now
                </Button>
              </div>

              {/* Gut Strengthen Plan */}
              <div className="bg-card rounded-3xl p-6 md:p-8 shadow-soft border-2 border-green-500 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Recommended
                  </span>
                </div>
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full mb-4">
                    <Leaf className="w-4 h-4" />
                    <span className="text-sm font-medium">60 Days</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">🌿 Gut Strengthen Program</h3>
                  <div className="flex items-center justify-center gap-3 mb-1">
                    <span className="text-xl md:text-2xl font-semibold text-muted-foreground line-through">
                      ₹25,000
                    </span>
                    <span className="text-4xl font-bold text-green-600">
                      ₹12,000
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">One-time payment</p>
                </div>
                <div className="space-y-2 mb-6">
                  {gutStrengthenFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button
                  size="lg"
                  className="w-full gap-2 bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => handleEnrollClick("Gut Strengthen Program (60 Days)", "₹12,000")}
                >
                  <MessageCircle className="w-5 h-5" />
                  Enroll Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-green-500 to-green-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Heal Your Gut?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Start your gut healing journey today with personalized guidance and expert support.
          </p>
          <Button
            size="lg"
            className="bg-white text-green-600 hover:bg-white/90 gap-2"
            onClick={() => handleEnrollClick("Gut Health Program", "₹5,500 - ₹12,000")}
          >
            <MessageCircle className="w-5 h-5" />
            Get Started Now
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GutResetProgram;
