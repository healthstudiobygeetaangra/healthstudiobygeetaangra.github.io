import { ArrowLeft, Mail, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
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
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Privacy Policy</h1>
          </div>
          <p className="text-muted-foreground mt-2">Health Studio by Geeta Angra</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Health Studio by Geeta Angra ("we", "our", "us") respects your privacy and is committed to protecting your personal information.
          </p>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Information We Collect</h2>
            <p className="text-muted-foreground mb-4">We may collect:</p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                Name, phone number, email address
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                Health-related information voluntarily shared via WhatsApp or forms
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                Communication details (messages, inquiries)
              </li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">Your information is used to:</p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                Respond to inquiries
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                Schedule consultations
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                Provide personalized health guidance
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                Improve our services
              </li>
            </ul>
            <p className="text-muted-foreground mt-4">
              We do not sell or share your personal information with third parties except where required by law.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Data Protection</h2>
            <p className="text-muted-foreground">
              We take reasonable steps to protect your data. However, no online platform can guarantee complete security.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Third-Party Services</h2>
            <p className="text-muted-foreground">
              Communication may occur via third-party platforms such as WhatsApp. Their privacy policies apply separately.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Your Consent</h2>
            <p className="text-muted-foreground">
              By using this website or contacting us, you consent to this Privacy Policy.
            </p>
          </section>

          <section className="mt-10 bg-primary/5 p-6 rounded-xl">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact</h2>
            <p className="text-muted-foreground mb-3">For privacy concerns, contact:</p>
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

export default PrivacyPolicy;
