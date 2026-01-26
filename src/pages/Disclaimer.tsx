import { ArrowLeft, AlertTriangle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";

const Disclaimer = () => {
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
            <AlertTriangle className="w-8 h-8 text-amber-500" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Disclaimer</h1>
          </div>
          <p className="text-muted-foreground mt-2">Health Studio by Geeta Angra</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          {/* Important Notice Banner */}
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-6 mb-10">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200 mb-2">Important Notice</h3>
                <p className="text-amber-700 dark:text-amber-300">
                  The information provided on this website and through consultations is for educational and informational purposes only.
                </p>
              </div>
            </div>
          </div>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Please Note</h2>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>It is <strong className="text-foreground">not a substitute for medical advice</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>We are <strong className="text-foreground">not doctors or licensed medical practitioners</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong className="text-foreground">Always consult your physician</strong> before making changes to diet, exercise, or lifestyle</span>
              </li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Results Disclaimer</h2>
            <p className="text-muted-foreground">
              Health Studio by Geeta Angra does not guarantee specific results. Outcomes vary based on individual factors.
            </p>
          </section>

          <section className="mt-10 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <Phone className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">Medical Emergency</h3>
                <p className="text-red-700 dark:text-red-300">
                  In case of a medical emergency, contact a healthcare professional immediately.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Disclaimer;
