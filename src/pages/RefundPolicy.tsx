import { ArrowLeft, CreditCard, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";

const RefundPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary/5 border-b border-primary/10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 gap-2 hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <CreditCard className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Refund Policy</h1>
          </div>
          <p className="text-muted-foreground mt-2">Health Studio by Geeta Angra</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground leading-relaxed">
            We strive to offer transparent and fair services.
          </p>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Consultation & Program Fees</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Fees paid for consultations or programs are <strong className="text-foreground">non-refundable</strong> once the service has been delivered</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Missed appointments without prior notice are <strong className="text-foreground">non-refundable</strong></span>
              </li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Exceptions</h2>
            <p className="text-muted-foreground mb-4">Refunds may be considered only if:</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                Service could not be delivered due to unavoidable circumstances from our side
              </li>
            </ul>
          </section>

          <section className="mt-10 bg-primary/5 border border-primary/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">Processing Time</h3>
            </div>
            <p className="text-muted-foreground">
              Any approved refunds will be processed within <strong className="text-foreground">7–10 business days</strong>.
            </p>
          </section>

          <section className="mt-10 bg-muted/50 p-6 rounded-xl">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact for Refund Requests</h2>
            <p className="text-muted-foreground mb-3">For refund requests, contact:</p>
            <a 
              href="mailto:healthstudiobygeetaangra@gmail.com"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <Mail className="w-5 h-5" />
              healthstudiobygeetaangra@gmail.com
            </a>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RefundPolicy;
