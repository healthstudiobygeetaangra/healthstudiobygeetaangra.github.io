import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Check, Leaf, MessageCircle, Sparkles, HeartHandshake, Stethoscope, ClipboardList } from "lucide-react";
import Footer from "@/components/Footer";
import LeadCaptureDialog from "@/components/LeadCaptureDialog";

const OneOnOneConsultation = () => {
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

  const focusAreas = [
    "Understanding your gut health & digestion",
    "Reviewing your medical & hormonal history",
    "Identifying root causes, not just symptoms",
    "Building a realistic, Indian-food-friendly plan",
  ];

  const idealForConditions = [
    "Women above 35 dealing with bloating, gas, acidity or indigestion",
    "Perimenopause or menopause-related weight and hormone changes",
    "PCOD, thyroid or other hormonal imbalances",
    "Anyone who has tried multiple diets with no lasting results",
    "Constipation or irregular digestion",
    "Fatigue, low energy or brain fog",
    "Anyone wanting a plan built for their body, not a generic template",
  ];

  const whatYouGet = [
    "One-on-one video/call consultation with a nutritionist",
    "Personalised assessment of your gut & hormonal health",
    "Custom, Indian-friendly diet plan",
    "Clear explanation of the 'why' behind your symptoms",
    "Practical lifestyle recommendations",
    "Option to continue into a full program afterward",
    "Q&A time to ask anything about your health",
  ];

  const consultationFeatures = [
    "45–60 minute one-on-one video/call session",
    "Gut & hormonal health assessment",
    "Take-home plan summary",
    "WhatsApp support for follow-up questions",
  ];

  const consultationFollowUpFeatures = [
    "Everything in the single consultation",
    "One follow-up call after 2 weeks",
    "Plan adjusted based on your progress",
    "Priority WhatsApp support",
  ];

  const faqs = [
    {
      question: "Is this a one-time session or ongoing support?",
      answer:
        "The single consultation is a one-time session. If you'd like continued support, choose the Consultation + Follow-up option, or move into a full program afterward.",
    },
    {
      question: "Do I need any tests or reports before the call?",
      answer:
        "No reports are required to book, but if you have recent blood work, hormonal panels, or thyroid reports, sharing them beforehand helps make the consultation more precise.",
    },
    {
      question: "Will I get a written diet plan after the consultation?",
      answer:
        "Yes, you'll receive a take-home summary with the key recommendations discussed during your session.",
    },
    {
      question: "Can this help with PCOD, thyroid or menopause symptoms specifically?",
      answer:
        "Yes. The consultation is designed to look at gut health alongside hormonal factors like PCOD, thyroid and menopause, and build recommendations around your specific situation.",
    },
    {
      question: "What if I want to continue with a full program after this?",
      answer:
        "Many clients use the consultation as a starting point and then move into a longer program like Gut Reset or Gut Strengthen for structured, ongoing support.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-soft">
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
            <HeartHandshake className="w-5 h-5" />
            <span className="font-semibold">Personalised 1-1 Consultation</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            One-on-One Nutrition Consultation
          </h1>
          <p className="text-xl md:text-2xl text-primary font-semibold mb-4">
            Your Body, Your Rules — Guided by an Expert Who Listens
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            If diets haven't worked for you, or you're 35+ and dealing with gut issues, weight that won't budge, or hormonal changes — a generic plan isn't the answer. A personalised one is.
          </p>
        </div>
      </section>

      {/* Program Description */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* What Is a 1-1 Consultation */}
            <div className="bg-card rounded-3xl p-6 md:p-10 shadow-soft mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                What Is a 1-1 Consultation?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                This is a private, one-on-one session with a certified nutritionist to understand your body, your history, and your specific gut and hormonal concerns — before building a plan around them.
              </p>
              <ul className="grid md:grid-cols-2 gap-3">
                {focusAreas.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                    <Leaf className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-foreground font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/20">
                <p className="text-foreground font-medium text-center">
                  This is not a one-size-fits-all diet sheet. It's a <span className="text-primary">plan built around you</span>.
                </p>
              </div>
            </div>

            {/* Who Is This For */}
            <div className="bg-card rounded-3xl p-6 md:p-10 shadow-soft mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Who Is This Consultation For?
              </h2>
              <p className="text-muted-foreground mb-6">This consultation is ideal for you if:</p>
              <div className="grid md:grid-cols-2 gap-3">
                {idealForConditions.map((condition, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-primary/5 rounded-xl">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{condition}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What You Get */}
            <div className="bg-card rounded-3xl p-6 md:p-10 shadow-soft mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                What You Will Get
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {whatYouGet.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-primary/5 rounded-xl">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Plans */}
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
              Choose Your Consultation
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {/* Single Consultation */}
              <div className="bg-card rounded-3xl p-6 md:p-8 shadow-soft border-2 border-border hover:border-green-500/50 transition-colors">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full mb-4">
                    <ClipboardList className="w-4 h-4" />
                    <span className="text-sm font-medium">Single Session</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Single Consultation</h3>
                  <div className="flex items-center justify-center gap-3 mb-1">
                    <span className="text-4xl font-bold text-green-600">₹1,999</span>
                  </div>
                  <p className="text-sm text-muted-foreground">One-time payment</p>
                </div>
                <div className="space-y-2 mb-6">
                  {consultationFeatures.map((feature, idx) => (
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
                  onClick={() => handleEnrollClick("Single Consultation", "₹1,999")}
                >
                  <MessageCircle className="w-5 h-5" />
                  Book Now
                </Button>
              </div>

              {/* Consultation + Follow-up */}
              <div className="bg-card rounded-3xl p-6 md:p-8 shadow-soft border-2 border-green-500 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Recommended
                  </span>
                </div>
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full mb-4">
                    <Stethoscope className="w-4 h-4" />
                    <span className="text-sm font-medium">Session + Follow-up</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Consultation + Follow-up</h3>
                  <div className="flex items-center justify-center gap-3 mb-1">
                    <span className="text-4xl font-bold text-green-600">₹3,499</span>
                  </div>
                  <p className="text-sm text-muted-foreground">One-time payment</p>
                </div>
                <div className="space-y-2 mb-6">
                  {consultationFollowUpFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button
                  size="lg"
                  className="w-full gap-2 bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => handleEnrollClick("Consultation + Follow-up", "₹3,499")}
                >
                  <MessageCircle className="w-5 h-5" />
                  Book Now
                </Button>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-card rounded-3xl p-6 md:p-10 shadow-soft mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-green-500 to-green-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Understand Your Body Better?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Book your one-on-one consultation and get clarity on what's really going on — and what to do about it.
          </p>
          <Button
            size="lg"
            className="bg-white text-green-600 hover:bg-white/90 gap-2"
            onClick={() => handleEnrollClick("1-1 Consultation", "₹1,999 - ₹3,499")}
          >
            <Sparkles className="w-5 h-5" />
            Book Your Consultation
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OneOnOneConsultation;
