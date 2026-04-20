import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const GutResetWebinarSuccess = () => {
  return (
    <main className="min-h-screen bg-[#F8F5EF] px-4 py-16">
      <section className="mx-auto max-w-xl rounded-[24px] border border-[#E7E1D8] bg-white p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto h-12 w-12 text-[#2EAF54]" />
        <h1 className="mt-4 font-serif text-4xl text-[#2F2B28]">Payment Successful</h1>
        <p className="mt-3 text-sm text-[#5F5851]">
          Webinar details sent to email. Your access links and bonus resources are on the way.
        </p>
        <div className="mt-6 grid gap-3">
          <Link
            to="/gut-reset-webinar"
            className="rounded-full bg-[#2EAF54] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#249246]"
          >
            Access Webinar
          </Link>
          <Link
            to="/book-appointment?from=gut-reset-webinar"
            className="rounded-full border border-[#E7E1D8] px-5 py-3 text-sm font-semibold text-[#2F2B28] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F8F5EF]"
          >
            Book 1:1 Consultation
          </Link>
        </div>
      </section>
    </main>
  );
};

export default GutResetWebinarSuccess;
