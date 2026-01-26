import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Award, X } from "lucide-react";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

// Import certificate images
import hormoneHealthCoach from "@/assets/certificates/hormone-health-coach.jpeg";
import dietarySupplements from "@/assets/certificates/dietary-supplements.jpeg";
import nutrition from "@/assets/certificates/nutrition.jpeg";
import gutHealth from "@/assets/certificates/gut-health.jpeg";
import ayurvedicDiet from "@/assets/certificates/ayurvedic-diet.jpeg";
import functionalMedicine from "@/assets/certificates/functional-medicine.jpeg";
import fssaiRegistration from "@/assets/certificates/fssai-registration.jpeg";
import fssaiAnnexure from "@/assets/certificates/fssai-annexure.jpeg";
import lifestyleHealthCoaching from "@/assets/certificates/lifestyle-health-coaching.jpeg";

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
  category: "nutrition" | "health" | "regulatory";
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: "Hormone Health Coach",
    issuer: "Certified Excellence",
    date: "September 2024",
    image: hormoneHealthCoach,
    category: "health",
  },
  {
    id: 2,
    title: "Diploma in Dietary Supplements",
    issuer: "Fabulous Body Inc",
    date: "January 2024",
    image: dietarySupplements,
    category: "nutrition",
  },
  {
    id: 3,
    title: "Certificate in Nutrition",
    issuer: "Fabulous Body Inc",
    date: "May 2024",
    image: nutrition,
    category: "nutrition",
  },
  {
    id: 4,
    title: "Certificate in Gut Health",
    issuer: "Fabulous Body Inc",
    date: "August 2024",
    image: gutHealth,
    category: "health",
  },
  {
    id: 5,
    title: "Ayurvedic Diet & Nutrition",
    issuer: "Arogyam Institute",
    date: "March 2025",
    image: ayurvedicDiet,
    category: "nutrition",
  },
  {
    id: 6,
    title: "Functional Medicine Foundation",
    issuer: "VitaOne",
    date: "September 2024",
    image: functionalMedicine,
    category: "health",
  },
  {
    id: 7,
    title: "FSSAI Registration Certificate",
    issuer: "Food Safety and Standards Authority of India",
    date: "November 2023",
    image: fssaiRegistration,
    category: "regulatory",
  },
  {
    id: 8,
    title: "FSSAI Product Annexure",
    issuer: "Government of Delhi",
    date: "November 2023",
    image: fssaiAnnexure,
    category: "regulatory",
  },
  {
    id: 9,
    title: "Lifestyle and Health Coaching",
    issuer: "Yes2StayingFit",
    date: "August 2024",
    image: lifestyleHealthCoaching,
    category: "health",
  },
];

const Certificates = () => {
  const navigate = useNavigate();
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [filter, setFilter] = useState<"all" | "nutrition" | "health" | "regulatory">("all");

  const filteredCertificates = filter === "all" 
    ? certificates 
    : certificates.filter(cert => cert.category === filter);

  const categoryLabels = {
    all: "All Certificates",
    nutrition: "Nutrition",
    health: "Health & Wellness",
    regulatory: "Regulatory",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-40">
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
      <section className="py-16 md:py-20 bg-gradient-soft">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Award className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Professional Credentials</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            My <span className="text-primary">Certifications</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Committed to excellence through continuous learning and professional development 
            in nutrition, health coaching, and wellness.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-6 border-b bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {(Object.keys(categoryLabels) as Array<keyof typeof categoryLabels>).map((category) => (
              <Button
                key={category}
                variant={filter === category ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(category)}
                className={cn(
                  "rounded-full",
                  filter === category && "bg-primary text-primary-foreground"
                )}
              >
                {categoryLabels[category]}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredCertificates.map((cert, idx) => (
              <div
                key={cert.id}
                className={cn(
                  "group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-warm transition-all duration-500 cursor-pointer hover:-translate-y-2",
                  "animate-fade-in"
                )}
                style={{ animationDelay: `${idx * 100}ms` }}
                onClick={() => setSelectedCertificate(cert)}
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-foreground line-clamp-2">
                      {cert.title}
                    </h3>
                    <span className={cn(
                      "text-xs px-2 py-1 rounded-full flex-shrink-0",
                      cert.category === "nutrition" && "bg-green-100 text-green-700",
                      cert.category === "health" && "bg-blue-100 text-blue-700",
                      cert.category === "regulatory" && "bg-amber-100 text-amber-700"
                    )}>
                      {cert.category === "nutrition" && "Nutrition"}
                      {cert.category === "health" && "Health"}
                      {cert.category === "regulatory" && "Regulatory"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{cert.issuer}</p>
                  <p className="text-xs text-muted-foreground">{cert.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedCertificate && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedCertificate(null)}
        >
          <div 
            className="relative max-w-4xl w-full max-h-[90vh] bg-card rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-background/80 hover:bg-background rounded-full"
              onClick={() => setSelectedCertificate(null)}
            >
              <X className="h-5 w-5" />
            </Button>
            <div className="overflow-auto max-h-[90vh]">
              <img
                src={selectedCertificate.image}
                alt={selectedCertificate.title}
                className="w-full h-auto"
              />
              <div className="p-6 bg-card">
                <h2 className="text-xl font-bold text-foreground mb-2">
                  {selectedCertificate.title}
                </h2>
                <p className="text-muted-foreground">{selectedCertificate.issuer}</p>
                <p className="text-sm text-muted-foreground">{selectedCertificate.date}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Certificates;
