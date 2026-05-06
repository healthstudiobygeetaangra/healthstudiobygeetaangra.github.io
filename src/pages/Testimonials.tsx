import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Heart, Quote } from "lucide-react";
import Footer from "@/components/Footer";
import { websiteTestimonials } from "@/data/websiteTestimonials";
import { newTestimonials } from "@/data/newTestimonials";

const testimonials = [...websiteTestimonials, ...newTestimonials];

const Testimonials = () => {
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
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-primary font-medium text-sm tracking-wider uppercase mb-3 block">What Our Clients Say</span>
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4 leading-tight">
              Client Testimonials
            </h1>
            <div className="w-24 h-1 bg-gradient-wellness mx-auto rounded-full mb-6"></div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Hear from our satisfied clients who transformed their health with personalized guidance
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-card p-8 rounded-3xl shadow-soft border border-border/50 transition-all duration-500 hover:shadow-warm hover:-translate-y-2 hover:border-primary/20 relative"
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6">
                  <Quote className="w-8 h-8 text-primary/20" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-primary text-primary"
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-muted-foreground mb-8 italic leading-relaxed text-lg">
                  "{testimonial.review}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-lg">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">Verified Client</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="mt-20">
            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-soft max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">100%</div>
                  <p className="text-muted-foreground">Client Satisfaction</p>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">5★</div>
                  <p className="text-muted-foreground">Average Rating</p>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">500+</div>
                  <p className="text-muted-foreground">Lives Transformed</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Write Your Own Success Story?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join hundreds of satisfied clients who have transformed their health with our personalized approach.
            </p>
            <Button
              variant="wellness"
              size="lg"
              onClick={() => navigate("/questionnaire")}
              className="gap-2"
            >
              <Heart className="w-4 h-4" />
              Start Your Journey
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Testimonials;
