import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const BookAppointment = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-soft flex flex-col">
      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 gap-2 z-10"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Book Your Appointment
            </h1>
            <p className="text-muted-foreground">
              Fill out the form below and we'll get back to you shortly.
            </p>
          </div>

          <div className="bg-card p-6 md:p-8 rounded-3xl shadow-soft">
            <ContactForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookAppointment;
