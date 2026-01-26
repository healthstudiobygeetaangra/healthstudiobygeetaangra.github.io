import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Clock, Phone, Sparkles, Heart, Target, HelpCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";
import LeadCaptureDialog from "@/components/LeadCaptureDialog";

const Plans = () => {
  const navigate = useNavigate();
  const [leadDialogOpen, setLeadDialogOpen] = useState(false);
  const [leadActionType, setLeadActionType] = useState<"chat" | "book_free" | "book_paid">("chat");

  const handleWhatsAppClick = () => {
    setLeadActionType("chat");
    setLeadDialogOpen(true);
  };

  const handleBookFreeCall = () => {
    setLeadActionType("book_free");
    setLeadDialogOpen(true);
  };

  const handleBookPaidCall = () => {
    setLeadActionType("book_paid");
    setLeadDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
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

      {/* Back Button */}
      <div className="container mx-auto px-4 pt-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4 hover:bg-primary/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Discovery Calls</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Choose Your Path to{" "}
            <span className="text-primary">Clarity</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're exploring or ready for real change, there's a call designed for you.
          </p>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* FREE Discovery Call */}
            <Card className="relative overflow-hidden border-2 border-muted hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
              <div className="absolute top-0 left-0 right-0 h-1 bg-muted" />
              <CardHeader className="pb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-muted rounded-full w-fit mb-4">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">FREE</span>
                </div>
                <CardTitle className="text-2xl md:text-3xl text-foreground">
                  Discovery Call
                </CardTitle>
                <p className="text-primary font-medium mt-2">Best for first connection</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Brief discussion of your main concern</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Understand if my approach is right for you</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Quick clarity on whether we should go ahead</span>
                  </div>
                  <div className="flex items-start gap-3 opacity-60">
                    <span className="h-5 w-5 flex items-center justify-center text-muted-foreground mt-0.5 flex-shrink-0">✕</span>
                    <span className="text-muted-foreground">No deep analysis</span>
                  </div>
                  <div className="flex items-start gap-3 opacity-60">
                    <span className="h-5 w-5 flex items-center justify-center text-muted-foreground mt-0.5 flex-shrink-0">✕</span>
                    <span className="text-muted-foreground">No personalised guidance</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-muted">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-medium text-foreground">Duration: 10–15 minutes</span>
                </div>

                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full gap-2"
                  onClick={handleBookFreeCall}
                >
                  <MessageCircle className="h-4 w-4" />
                  Book Free Call via WhatsApp
                </Button>
              </CardContent>
            </Card>

            {/* PAID Discovery Call */}
            <Card className="relative overflow-hidden border-2 border-primary shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/60" />
              <div className="absolute -top-1 right-4">
                <div className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-b-lg">
                  RECOMMENDED
                </div>
              </div>
              <CardHeader className="pb-4 pt-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full w-fit mb-4">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">₹999</span>
                </div>
                <CardTitle className="text-2xl md:text-3xl text-foreground">
                  Discovery Call (1-to-1)
                </CardTitle>
                <p className="text-primary font-medium mt-2">For women who want real clarity & direction</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Detailed health history (weight, hormones, gut, lifestyle)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Identify root causes, not just symptoms</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Why past diets & workouts didn't work</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Clear roadmap: what needs correction first</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Personalised guidance (diet, lifestyle & habits)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Honest advice — even if you don't take a program</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-muted">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-medium text-foreground">Duration: 45 minutes</span>
                </div>

                <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-xl">
                  <Target className="h-5 w-5 text-primary" />
                  <span className="font-medium text-foreground">Outcome: Clarity, direction & confidence</span>
                </div>

                <Button 
                  variant="wellness" 
                  size="lg" 
                  className="w-full gap-2"
                  onClick={handleBookPaidCall}
                >
                  <MessageCircle className="h-4 w-4" />
                  Book Paid Consultation — ₹999
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Paid Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <HelpCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">Why Paid?</h2>
                </div>
                
                <p className="text-lg text-muted-foreground mb-6">
                  This call uses my expertise, experience & time
                </p>

                <div className="p-6 bg-primary/5 rounded-xl border border-primary/10 mb-6">
                  <p className="text-lg italic text-foreground text-center">
                    "This one call cleared years of confusion."
                  </p>
                  <p className="text-center text-muted-foreground mt-2">— Most clients say</p>
                </div>

                <p className="text-muted-foreground text-center">
                  (If you enroll in a program, this fee can be adjusted.)
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Who Should Choose Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                👩‍⚕️ Who should choose the Paid Call?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border border-muted hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Tried many diets but no results</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Hormonal imbalance / PCOD / menopause</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Gut issues, fatigue, stubborn weight</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Women 35+ wanting sustainable healing</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-primary/30 bg-primary/5">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    Book the call if you want:
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Sparkles className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">Truth, not trends</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Heart className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">Root-cause approach</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Sparkles className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">No pressure, no fear-based talk</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-10">
              <Button 
                variant="wellness" 
                size="lg"
                className="gap-2"
                onClick={handleBookPaidCall}
              >
                <MessageCircle className="h-4 w-4" />
                Book Your Discovery Call Now — ₹999
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Plans;
