import { useState, useRef, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Chandan Vig",
    review: "Geeta Mam expertise about weight management is impeccable. She believes in providing logical solutions rather burdening yourself with supplements which might be hefty for your pocket.",
    rating: 5
  },
  {
    name: "Tripti Chopra",
    review: "Grateful to Geeta Mam. After joining with her, an inner feeling of satisfaction is there that now I am on right path and will achieve my health goals in right and effective way. Thank you so much mam for guiding me.",
    rating: 5
  },
  {
    name: "Sandeep Kaithel",
    review: "I am very grateful to my coach Geeta Angra for helping me set goals and monitor my health very well ♥️ love you 😍 mam …",
    rating: 5
  },
  {
    name: "Surpal Kaur",
    review: "I started my Gut Health program with Geeta ma'am and later converted to the weightloss program. In approx 2 months I felt changes in my body - my bloating stopped, vomiting after eating stopped. My weight and inches are changing day by day. I am very happy now!",
    rating: 5
  },
  {
    name: "Laksh",
    review: "Before having Nutrition Guidance I felt lazy and weak. But after getting guidance and knowledge, my metabolism got boosted which gives me required energy. Now gym is my daily routine. My appetite increased making my body fit and energetic. Thanks to Geeta mam!",
    rating: 5
  },
  {
    name: "Hema",
    review: "After taking nutrition for 1 month, my finger pain is 80% better. My energy level is high. I'm a homemaker and now I enjoy doing household work without anger or frustration. Work speed has also increased. Geeta mam's efficiency encouraged me a lot. Thanks to Geeta mam!",
    rating: 5
  }
];

const TestimonialsCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const cardWidth = 356; // 340px card + 16px gap

  const checkScrollability = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      
      // Calculate active index based on scroll position
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(newIndex, testimonials.length - 1));
    }
  }, []);

  useEffect(() => {
    checkScrollability();
    window.addEventListener('resize', checkScrollability);
    return () => window.removeEventListener('resize', checkScrollability);
  }, [checkScrollability]);

  // Auto-scroll functionality
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 10;
        
        if (isAtEnd) {
          // Scroll back to start
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
        setTimeout(checkScrollability, 300);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, checkScrollability]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -cardWidth : cardWidth,
        behavior: 'smooth'
      });
      setTimeout(checkScrollability, 300);
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      setTimeout(checkScrollability, 300);
    }
  };

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-card overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Clients Review
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from our satisfied clients who transformed their health
          </p>
        </div>

        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Fade gradient edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />

          {/* Navigation Buttons */}
          <button
            onClick={() => scroll('left')}
            className={cn(
              "absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-background/95 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center transition-all duration-300 border border-border",
              canScrollLeft 
                ? "opacity-100 hover:bg-primary hover:text-primary-foreground hover:scale-110 hover:shadow-xl" 
                : "opacity-0 pointer-events-none"
            )}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          
          <button
            onClick={() => scroll('right')}
            className={cn(
              "absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-background/95 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center transition-all duration-300 border border-border",
              canScrollRight 
                ? "opacity-100 hover:bg-primary hover:text-primary-foreground hover:scale-110 hover:shadow-xl" 
                : "opacity-0 pointer-events-none"
            )}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            onScroll={checkScrollability}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-8 md:px-16 py-4"
          >
            {testimonials.map((testimonial, idx) => (
              <div 
                key={idx}
                className={cn(
                  "flex-shrink-0 w-[340px] bg-background p-6 rounded-3xl shadow-soft border border-border/50 transition-all duration-500",
                  "hover:shadow-warm hover:-translate-y-2 hover:border-primary/20",
                  activeIndex === idx && "scale-[1.02] shadow-warm border-primary/30"
                )}
              >
                {/* Quote icon */}
                <div className="text-4xl text-primary/20 mb-2">"</div>
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 fill-primary text-primary transition-transform hover:scale-110" 
                    />
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-6 italic leading-relaxed min-h-[80px]">
                  {testimonial.review}
                </p>
                
                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Active Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToIndex(idx)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  activeIndex === idx 
                    ? "w-8 bg-primary" 
                    : "w-2 bg-primary/30 hover:bg-primary/50"
                )}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
