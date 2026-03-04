import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import consultantPhoto from "@/assets/consultant-photo.jpg";
import { Award, BookOpen, Heart, Star, ArrowLeft, CheckCircle, Users, Calendar, X, Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import LeadCaptureDialog from "@/components/LeadCaptureDialog";

const Consultant = () => {
  const navigate = useNavigate();
  const [leadDialogOpen, setLeadDialogOpen] = useState(false);

  const handleBookConsultation = () => {
    setLeadDialogOpen(true);
  };

  const handleViewPrograms = () => {
    navigate('/plans');
  };

  return (
    <div className="min-h-screen bg-gradient-soft relative">
      {/* Lead Capture Dialog */}
      <LeadCaptureDialog 
        open={leadDialogOpen} 
        onOpenChange={setLeadDialogOpen} 
        actionType="book_free"
        title="Book a Free Consultation"
      />
      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 gap-2 z-10"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      {/* HERO SECTION */}
      <section className="pt-20 pb-16 md:pt-24 md:pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-2/5">
              <img 
                src={consultantPhoto} 
                alt="Geeta Angra - Gut & Hormonal Health Nutritionist"
                className="w-full max-w-sm mx-auto rounded-3xl shadow-warm"
              />
            </div>
            <div className="w-full md:w-3/5 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                Geeta Angra
              </h1>
              <p className="text-lg md:text-xl text-primary font-semibold mb-6">
                Gut & Hormonal Health Nutritionist | Certified Diabetic Educator
              </p>
              <blockquote className="text-lg md:text-xl text-muted-foreground italic mb-8 border-l-4 border-primary pl-4">
                "Healing is not about restriction. It is about understanding your body and supporting it wisely."
              </blockquote>
              <Button 
                variant="wellness" 
                size="lg"
                onClick={handleBookConsultation}
                className="hover:scale-105 transition-transform"
              >
                👉 Book a Free Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT THE CONSULTANT */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            About the Consultant
          </h2>
          
          <Card className="p-6 md:p-8 rounded-3xl shadow-soft mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              My Story
            </h3>
            <div className="space-y-4 text-foreground leading-relaxed mb-8">
              <p>
                I am a wellness professional with an academic background in B.Sc., B.Ed., and GNIIT, and advanced training in Gut Health, Hormonal Health, Ayurvedic & Modern Nutrition, Dietary Supplementation, and certified Diabetes Educator. I am also the founder of Health Studio by Geeta Angra, a space created for thoughtful, personalised, and sustainable healing.
              </p>
              <p>
                My journey into nutrition began not as a career decision, but as a life experience.
              </p>
              <p>
                Growing up, I witnessed the realities of chronic illness closely. My father lived with diabetes, and my mother bravely battled cancer. Watching their health struggles shaped my understanding early on — that true health is not built only in hospitals, but through everyday nourishment, awareness, and lifestyle choices.
              </p>
              <p>
                Later, my own body became my teacher.
              </p>
              <p>
                Despite eating "healthy" and exercising regularly at the gym, I continued to gain weight. This disconnect between effort and results led me to question conventional advice and look deeper. That search revealed what many women experience but few are told — gut health, hormones, stress, metabolism, and lifestyle matter far more than calories alone.
              </p>
              <p>
                That realisation transformed my path.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              My Approach & Values
            </h3>
            <div className="space-y-4 text-foreground leading-relaxed mb-8">
              <p>
                Today, my work is dedicated to helping women who feel frustrated, unheard, or exhausted by repeated failures with diets and workouts. At Health Studio by Geeta Angra, I offer a root-cause, science-backed, and deeply personalised approach to weight loss and overall well-being — combining modern nutrition with traditional wisdom and practical lifestyle guidance.
                Our MPESS-based approach focuses on healing the root cause to bring long-lasting results.
              </p>
              <p className="font-medium text-primary">
                ✨ My mission is to guide women toward lasting balance, confidence, and health — not through shortcuts, but through clarity, consistency, and compassion.
              </p>
            </div>

            {/* Before vs After Comparison */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Old Diet Thinking */}
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-muted to-muted/50 border-2 border-muted-foreground/20">
                <div className="absolute -top-3 left-4 bg-muted-foreground/80 text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                  Old Diet Thinking
                </div>
                <ul className="space-y-3 mt-2">
                  {[
                    "Calorie counting & restriction",
                    "One-size-fits-all meal plans",
                    "Quick fixes & fad diets",
                    "Ignoring root causes",
                    "Willpower over wisdom"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-muted-foreground">
                      <X className="w-4 h-4 text-destructive flex-shrink-0" />
                      <span className="line-through opacity-70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* My Approach */}
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/20 border-2 border-primary/30 shadow-soft">
                <div className="absolute -top-3 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                  My Approach
                </div>
                <ul className="space-y-3 mt-2">
                  {[
                    "Understanding your unique metabolism",
                    "Personalised, sustainable plans",
                    "Root-cause healing & balance",
                    "Gut health & hormonal harmony",
                    "Education & lasting transformation"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-foreground">
                      <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CREDENTIALS */}
      <section className="py-16 bg-gradient-warm">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            Credentials
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Certifications */}
            <Card className="p-6 rounded-3xl shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Certifications</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "B.Sc., B.Ed., GNIIT",
                  "Certified Diabetic Educator",
                  "Advanced Training in Gut & Hormonal Health",
                  "Ayurvedic & Modern Nutrition",
                  "Dietary Supplementation Specialist"
                ].map((cert, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="text-primary mt-1">•</span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Experience */}
            <Card className="p-6 rounded-3xl shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Experience</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Founder of Health Studio by Geeta Angra",
                  "300+ women guided successfully",
                  "Experience with lifestyle, weight, and wellness programs"
                ].map((exp, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="text-primary mt-1">•</span>
                    <span>{exp}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Specializations */}
            <Card className="p-6 rounded-3xl shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Specializations</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Weight management & fat loss",
                  "Gut health & hormonal balance",
                  "Diabetes management & prevention",
                  "Metabolic health optimization"
                ].map((spec, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="text-primary mt-1">•</span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* View All Certificates CTA */}
          <div className="mt-10 text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/certificates')}
              className="gap-2 group border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <Award className="w-5 h-5" />
              View All Certificates
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            What Clients Say
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                text: "Geeta Mam expertise about weight management is impeccable. She believes in providing logical solutions rather burdening yourself with supplements which might be hefty for your pocket.",
                name: "Chandan Vig"
              },
              {
                text: "Grateful to Geeta Mam. After joining with her, an inner feeling of satisfaction is there that now I am on right path and will achieve my health goals in right and effective way. Thank you so much mam for guiding me.",
                name: "Tripti Chopra"
              },
              {
                text: "I am very grateful to my coach Geeta Angra for helping me set goals and monitor my health very well ♥️ love you 😍 mam …",
                name: "Sandeep Kaithel"
              }
            ].map((testimonial, idx) => (
              <Card key={idx} className="p-6 rounded-3xl shadow-soft">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                <p className="text-sm font-semibold text-muted-foreground">
                  — {testimonial.name}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            FAQs – About Working With Me
          </h2>
          
          <Card className="p-6 md:p-8 rounded-3xl shadow-soft">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Who is this program best suited for?</AccordionTrigger>
                <AccordionContent>
                  This program is designed for women who feel frustrated, unheard, or exhausted by repeated failures with diets and workouts. If you've been eating "healthy" and exercising but still not seeing results, or if you're dealing with gut issues, hormonal imbalances, or unexplained weight gain — you're in the right place.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What makes your approach different from typical diet plans?</AccordionTrigger>
                <AccordionContent>
                  Unlike calorie-counting and one-size-fits-all meal plans, I focus on root-cause healing. My approach addresses gut health, hormonal balance, stress, and metabolism — because these factors matter far more than calories alone. I combine modern nutrition science with traditional wisdom for lasting transformation.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How personalized are the nutrition plans?</AccordionTrigger>
                <AccordionContent>
                  Every plan is deeply personalized based on your unique metabolism, health history, lifestyle, and goals. I don't believe in restriction — I believe in understanding your body and supporting it wisely. Your plan will be practical, sustainable, and tailored specifically to you.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Do you address gut health and hormonal issues?</AccordionTrigger>
                <AccordionContent>
                  Absolutely. Gut health and hormonal harmony are central to my practice. With advanced training in Gut Health, Hormonal Health, and as a Certified Diabetic Educator, I specialize in helping women achieve balance through targeted nutrition and lifestyle guidance.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>What kind of support will I receive during the program?</AccordionTrigger>
                <AccordionContent>
                  You'll receive ongoing guidance through regular check-ins, education to help you understand your body, and compassionate support throughout your journey. My mission is to guide you with clarity, consistency, and care — not through shortcuts, but through lasting transformation.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>Is this a substitute for medical treatment?</AccordionTrigger>
                <AccordionContent>
                  No. My guidance is educational and lifestyle-based, focused on nourishment, awareness, and healthy choices. While I work alongside medical care, this is not a substitute for professional medical advice or treatment.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center bg-gradient-wellness p-8 md:p-12 rounded-3xl shadow-warm">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Start your health transformation with the right guidance.
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Book a free consultation to understand your needs and explore a personalized 
              approach to your health goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg"
                onClick={handleBookConsultation}
                className="hover:scale-105 transition-transform"
              >
                👉 Book a Free Consultation
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleViewPrograms}
                className="bg-primary-foreground hover:bg-primary-foreground/90 text-foreground"
              >
                👉 View Programs & Plans
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Consultant;
