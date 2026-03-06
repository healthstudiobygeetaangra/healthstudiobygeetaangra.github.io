import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Phone, MapPin, Clock, Send, Leaf, Heart, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

import Footer from "@/components/Footer";
import logo from "@/assets/logo.png";
import ContactForm from "@/components/ContactForm";

const ContactUs = () => {
  const navigate = useNavigate();

  const handleHealthAssessment = () => {
    navigate("/questionnaire");
  };

  const heroAnimation = useScrollAnimation({ threshold: 0.1 });
  const contactCardAnimation = useScrollAnimation({ threshold: 0.1 });
  const socialCardAnimation = useScrollAnimation({ threshold: 0.1 });
  const formAnimation = useScrollAnimation({ threshold: 0.1 });
  const mapAnimation = useScrollAnimation({ threshold: 0.1 });

  const socialLinks = [
    {
      name: "WhatsApp",
      href: "https://wa.me/919310178956",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      color: "bg-green-500/10 hover:bg-green-500/20 text-green-600 hover:scale-105"
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/healthstudiobygeetaangra?igsh=MWV3M3JqMXpxamlreQ==",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      color: "bg-pink-500/10 hover:bg-pink-500/20 text-pink-600 hover:scale-105"
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/share/1Cpr2fE5Ck/?mibextid=wwXIfr",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      color: "bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 hover:scale-105"
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@healthstudiobygeetaangra?si=Rz8ynlp9a8aax8LA",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      color: "bg-red-500/10 hover:bg-red-500/20 text-red-600 hover:scale-105"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
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

      {/* Hero Section */}
      <section 
        ref={heroAnimation.ref as React.RefObject<HTMLDivElement>}
        className="relative py-20 md:py-28 overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-soft" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute top-20 right-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-1/3 w-36 h-36 bg-accent/15 rounded-full blur-3xl" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-16 left-[10%] text-primary/20 animate-pulse">
          <Leaf className="w-12 h-12" />
        </div>
        <div className="absolute top-24 right-[15%] text-secondary/30 animate-pulse" style={{ animationDelay: "0.5s" }}>
          <Heart className="w-10 h-10" />
        </div>
        <div className="absolute bottom-20 right-[10%] text-accent/25 animate-pulse" style={{ animationDelay: "1s" }}>
          <Sparkles className="w-14 h-14" />
        </div>

        <div className={`container mx-auto px-4 relative z-10 text-center scroll-fade-up ${heroAnimation.isVisible ? "visible" : ""}`}>
          <img 
            src={logo} 
            alt="Health Studio by Geeta Angra" 
            className="h-24 mx-auto mb-8 drop-shadow-lg hover:scale-105 transition-transform duration-300" 
          />
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Let's Start Your
            <span className="block text-primary mt-2">Wellness Journey</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Ready to transform your health? We're here to guide you every step of the way. 
            Reach out and let's create your personalized path to wellness.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Left Column - Contact Info & Social */}
            <div className="space-y-8">
              {/* Contact Information Card */}
              <div 
                ref={contactCardAnimation.ref as React.RefObject<HTMLDivElement>}
                className={`bg-card p-8 rounded-3xl shadow-soft space-y-5 card-enhanced scroll-fade-left ${contactCardAnimation.isVisible ? "visible" : ""}`}
              >
                <h2 className="font-playfair text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </span>
                  Contact Information
                </h2>
                
                <a 
                  href="mailto:healthstudiobygeetaangra@gmail.com"
                  className="flex items-start gap-4 p-4 rounded-2xl bg-primary/5 hover:bg-primary/10 transition-all duration-300 group hover:shadow-md hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors group-hover:scale-110">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Email</h3>
                    <p className="text-muted-foreground text-sm break-all">healthstudiobygeetaangra@gmail.com</p>
                  </div>
                </a>

                <a 
                  href="tel:+919310178956"
                  className="flex items-start gap-4 p-4 rounded-2xl bg-primary/5 hover:bg-primary/10 transition-all duration-300 group hover:shadow-md hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors group-hover:scale-110">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Phone</h3>
                    <p className="text-muted-foreground text-sm">+91 9310178956</p>
                  </div>
                </a>

                <a 
                  href="https://google.com/maps/place/Ground+Floor,+Health+Studio+by+Geeta+Angra,+Govt+School,+J+-+3A,+Guru+Virjanand+Marg,+opposite+G+Block,+Block+J,+Vikaspuri,+Delhi,+110018/@28.6402931,77.0793991,3a,75y,92.47h,78.27t/data=!3m5!1e1!3m3!1sj_UVMTESXDJyIH1axFdWLQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fpanoid%3Dj_UVMTESXDJyIH1axFdWLQ%26w%3D900%26h%3D600%26ll%3D0.0,0.0%26yaw%3D92.0%26pitch%3D12.0%26thumbfov%3D98%26cb_client%3Dgmm.iv.android!4m2!3m1!1s0x23d6d9a6da59abe3:0x94efce62f45d9703?utm_source=mstt_0&g_ep=CAESBjI2LjkuNhgAIIGBASqUASw5NDI2NzcyNyw5NDI5MjE5NSw5NDI5OTUzMiwxMDA3OTY0OTgsMTAwNzk2NTM1LDk0Mjg0NDc1LDk0MjgwNTc2LDk0MjA3Mzk0LDk0MjA3NTA2LDk0MjA4NTA2LDk0MjE4NjUzLDk0MjI5ODM5LDk0Mjc1MTY4LDk0Mjc5NjE5LDEwMDc5MTQ4MywxMDA3OTYxOTNCAklO&skid=372c3f55-f396-4bcb-9696-a31757a165fe&g_st=aw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-2xl bg-primary/5 hover:bg-primary/10 transition-all duration-300 group hover:shadow-md hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors group-hover:scale-110">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Studio Address</h3>
                    <p className="text-muted-foreground text-sm">J-3A, Ground Floor, Vikas Puri, New Delhi, 110018</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-primary/5">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Consultation Hours</h3>
                    <p className="text-muted-foreground text-sm">By Appointment Only</p>
                  </div>
                </div>
              </div>

              {/* Social Media Card */}
              <div 
                ref={socialCardAnimation.ref as React.RefObject<HTMLDivElement>}
                className={`bg-card p-8 rounded-3xl shadow-soft card-enhanced scroll-fade-left stagger-2 ${socialCardAnimation.isVisible ? "visible" : ""}`}
              >
                <h2 className="font-playfair text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center">
                    <Heart className="w-5 h-5 text-secondary-foreground" />
                  </span>
                  Connect With Us
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 ${social.color}`}
                    >
                      {social.icon}
                      <span className="font-medium">{social.name}</span>
                    </a>
                  ))}
                </div>

                {/* Inspirational Quote */}
                <div className="mt-8 p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl border border-primary/10">
                  <p className="text-muted-foreground italic text-center">
                    "Your health is an investment, not an expense. Let's build a healthier you, together."
                  </p>
                  <p className="text-primary font-medium text-center mt-2 text-sm">— Geeta Angra</p>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div 
              ref={formAnimation.ref as React.RefObject<HTMLDivElement>}
              className={`bg-card p-8 rounded-3xl shadow-soft card-enhanced scroll-fade-right ${formAnimation.isVisible ? "visible" : ""}`}
            >
              <h2 className="font-playfair text-2xl font-semibold text-foreground mb-2 flex items-center gap-3">
                <span className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Send className="w-5 h-5 text-primary" />
                </span>
                Send Us a Message
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and we'll get back to you shortly.
              </p>

              <ContactForm />

              <p className="text-center text-muted-foreground text-sm mt-4">
                Your message will open in WhatsApp for a quick response.
              </p>

              {/* Quick Actions */}
              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="font-medium text-foreground mb-4">Quick Actions</h3>
                <div className="grid gap-3">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full rounded-xl hover:bg-primary/5 hover:-translate-y-1 transition-all duration-300"
                    onClick={handleHealthAssessment}
                  >
                    Take Health Assessment
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full rounded-xl hover:bg-primary/5 hover:-translate-y-1 transition-all duration-300"
                    onClick={() => navigate("/services")}
                  >
                    View Our Services
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section 
        ref={mapAnimation.ref as React.RefObject<HTMLDivElement>}
        className={`py-16 md:py-20 scroll-fade-up ${mapAnimation.isVisible ? "visible" : ""}`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-playfair text-3xl font-semibold text-foreground text-center mb-8">
              Visit Our Studio
            </h2>
            <div className="rounded-3xl overflow-hidden shadow-soft">
              <iframe
                src="https://www.google.com/maps?q=Ground+Floor,+Health+Studio+by+Geeta+Angra,+Govt+School,+J+-+3A,+Guru+Virjanand+Marg,+opposite+G+Block,+Block+J,+Vikaspuri,+Delhi,+110018&output=embed"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Health Studio Location"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUs;
