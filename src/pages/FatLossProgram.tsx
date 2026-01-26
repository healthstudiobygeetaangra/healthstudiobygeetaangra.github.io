import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Flame, Star, AlertTriangle, MessageCircle } from "lucide-react";
import Footer from "@/components/Footer";
import LeadCaptureDialog from "@/components/LeadCaptureDialog";

const FatLossProgram = () => {
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

  const programFeatures = [
    "Your Own Coach",
    "Custom Diet Plan",
    "Daily Diet Check",
    "Group Workout Sessions",
    "Weekly Check-In",
    "Lifestyle Tune-Up",
    "Community Connection",
    "Stay-on-Track Diet Support",
  ];

  const bonuses = [
    "Free body composition analysis",
    "Free nutrition bundle worth ₹18,000",
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
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary/10 via-background to-orange-50">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Flame className="w-5 h-5" />
            <span className="font-semibold">Signature Program</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Sustainable Fat Loss
          </h1>
          <p className="text-xl md:text-2xl text-primary font-semibold mb-4">
            HIGH METABOLISM SLIMMING PROCESS
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A science-backed weight loss program focused on your metabolism and hormones for healthy, sustainable results.
          </p>
        </div>
      </section>

      {/* Program Description */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-3xl p-6 md:p-10 shadow-soft mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                About This Program
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  This weight loss program <span className="text-foreground font-semibold">"HIGH METABOLISM SLIMMING PROCESS"</span> works on your metabolism and hormones. It is ideal for anyone seeking healthy, sustainable weight loss and long-term lifestyle change, especially those managing conditions like:
                </p>
                <ul className="grid md:grid-cols-2 gap-2 my-4">
                  {["Diabetes", "Thyroid issues", "PCOD/PCOS", "Post-pregnancy weight gain", "Pre-menopause", "Menopause", "Other health concerns"].map((condition, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{condition}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  The approach focuses on identifying and managing <span className="text-foreground font-medium">root causes</span> rather than chasing quick fixes or guaranteed kilo targets. Weight loss is multifactorial and varies from person to person based on diet, medical history, activity, stress, sleep, mindset, and overall health.
                </p>
                <p>
                  The program emphasizes <span className="text-foreground font-medium">balanced, nutritious, non-restrictive eating</span> and lifestyle modification instead of crash diets, pills, or calorie obsession, ensuring changes are realistic and sustainable for life.
                </p>
                <p>
                  With guidance from a qualified, supportive team, clients are educated to make small yet powerful changes, follow plans comfortably without feeling "on a diet."
                </p>
              </div>
            </div>

            {/* What You Get */}
            <div className="bg-card rounded-3xl p-6 md:p-10 shadow-soft mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                What You Get
              </h2>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {programFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-primary/5 rounded-xl">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground font-medium">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Bonuses Included
                </h3>
                <div className="space-y-3">
                  {bonuses.map((bonus, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                      <Star className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                      <span className="text-foreground font-medium">{bonus}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing Plans */}
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
              Choose Your Plan
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {/* Basic Plan */}
              <div className="bg-card rounded-3xl p-6 md:p-8 shadow-soft border-2 border-border hover:border-primary/50 transition-colors">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">Basic</h3>
                  <p className="text-muted-foreground mb-4">6 Months Program</p>
                  <div className="text-4xl font-bold text-primary">
                    ₹36,000
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">One-time payment</p>
                </div>
                <Button
                  variant="wellness"
                  size="lg"
                  className="w-full gap-2"
                  onClick={() => handleEnrollClick("Sustainable Fat Loss - Basic (6 Months)", "₹36,000")}
                >
                  <MessageCircle className="w-5 h-5" />
                  Enroll Now
                </Button>
              </div>

              {/* Advanced Plan */}
              <div className="bg-card rounded-3xl p-6 md:p-8 shadow-soft border-2 border-primary relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Recommended
                  </span>
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">Advanced</h3>
                  <p className="text-muted-foreground mb-4">8 Months Program</p>
                  <div className="text-4xl font-bold text-primary">
                    ₹48,000
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">One-time payment</p>
                </div>
                <Button
                  variant="wellness"
                  size="lg"
                  className="w-full gap-2"
                  onClick={() => handleEnrollClick("Sustainable Fat Loss - Advanced (8 Months)", "₹48,000")}
                >
                  <MessageCircle className="w-5 h-5" />
                  Enroll Now
                </Button>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-3xl p-6 md:p-10">
              <div className="flex items-start gap-4 mb-6">
                <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0" />
                <h2 className="text-2xl font-bold text-foreground">
                  Important: Points to Note
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">We do not promise instant results or magic weight loss.</strong> We do not work on the numbers, but on your overall health.
                </p>
                <p>
                  We <strong className="text-foreground">DO NOT guarantee</strong> 5, 10 or 20 kilo weight loss programs. A body can safely lose a few kilos and inches in a month, however weight loss is multi-factorial and results vary from person to person. It depends on your diet, medical history, activity level, stress levels, water intake, sleep patterns, mental health, mindset, belief and the trust level, just to name a few.
                </p>
                <p>
                  The weight will not bounce back as long as you remain self-disciplined. The diet plans that we design are not short-term diets that you follow for temporary results. Instead, it is a combination of diet and lifestyle plan, where we prescribe food which you can sustain for lifelong, and hence get permanent outcomes resulting in a lifestyle change. Make sure you set realistic goals before you embark on this journey with us.
                </p>
                <p className="font-medium text-foreground">
                  Pause/Hold facility only for 6-8 months.
                </p>
                <div className="border-t border-amber-300 dark:border-amber-700 pt-4 mt-4">
                  <p className="font-semibold text-foreground mb-3">Refund Policy:</p>
                  <p>
                    Once you have paid for a program, <strong className="text-foreground">no refund policy applied</strong>. Due to the nature of services involved, no refund is provided under any circumstances.
                  </p>
                </div>
                <ul className="space-y-3 mt-4">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>You are consulting with qualified dietitians and clinical nutritionists. Though we provide you with diet and nutrition advice after body analysis and a health assessment, it in no manner replaces or substitutes the services of a physician or a doctor.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>We are providing you with an opportunity to turn around your life. This effort involves an investment of our time, and as a wise person once said, "Time is money." We charge for our expertise in the field and expect you to respect it. We are not indebted to you in any way for the money you pay us, nor can it be used to take advantage of us in any manner.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>The time and effort that both parties put in will be beneficial only if there is sincerity and mutual respect toward each other. While we are committed to putting our best efforts forward in your journey, cooperation from your side is equally important.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>You agree to take full responsibility for your own actions and understand that the dietitians can only guide you and cannot control what you consume versus what has been prescribed.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-wellness">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Transform Your Health?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Start your sustainable fat loss journey today with personalized guidance and expert support.
          </p>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90 gap-2"
            onClick={() => handleEnrollClick("Sustainable Fat Loss Program", "₹36,000 - ₹48,000")}
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

export default FatLossProgram;
