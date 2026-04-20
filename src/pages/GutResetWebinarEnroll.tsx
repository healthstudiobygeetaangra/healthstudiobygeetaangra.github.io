import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, CircleHelp, HeartPulse, Leaf, Loader2 } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import plateDecoration from "@/assets/enroll-plate-decoration.jpg";
import plantsDecoration from "@/assets/enroll-plants-decoration.jpg";
import { webinarPrice } from "@/data/gutResetWebinar";
import { startWebinarPaymentFlow } from "@/lib/webinarPaymentFlow";
import { cn } from "@/lib/utils";
import {
  createWebinarEnrollmentFormData,
  initialWebinarEnrollmentTouched,
  isWebinarEnrollmentFormSubmittable,
  sanitizePhoneNumber,
  type WebinarEnrollmentField,
  type WebinarEnrollmentFormData,
  type WebinarEnrollmentTouched,
  validateWebinarEnrollmentForm,
  type WebinarEnrollmentErrors,
} from "@/lib/webinarEnrollmentValidation";
import { fetchActiveWebinar, type WebinarEvent } from "@/services/webinarService";

interface EnrollLocationState {
  prefill?: Partial<WebinarEnrollmentFormData>;
}

const parseTimeTo24Hour = (timeText: string) => {
  const clean = timeText.replace(/IST/gi, "").trim();
  const match = clean.match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?$/i);
  if (!match) {
    return { hour: 19, minute: 0 };
  }

  let hour = Number(match[1]);
  const minute = Number(match[2] ?? "0");
  const period = match[3]?.toUpperCase();

  if (period === "PM" && hour < 12) {
    hour += 12;
  }
  if (period === "AM" && hour === 12) {
    hour = 0;
  }

  return { hour, minute };
};

const getWebinarStartDate = (webinar: WebinarEvent | null) => {
  if (!webinar?.webinar_date || !webinar.webinar_time) {
    return null;
  }

  const [year, month, day] = webinar.webinar_date.split("-").map(Number);
  if (!year || !month || !day) {
    return null;
  }

  const { hour, minute } = parseTimeTo24Hour(webinar.webinar_time);
  const utcTs = Date.UTC(year, month - 1, day, hour - 5, minute - 30, 0);
  return new Date(utcTs);
};

const formatCountdown = (remainingMs: number) => {
  if (remainingMs <= 0) {
    return "Webinar Started";
  }
  const totalSeconds = Math.floor(remainingMs / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `Starts in: ${hours}:${minutes}:${seconds}`;
};

const formatDateLabel = (dateValue: string | null) => {
  if (!dateValue) {
    return "TBA";
  }

  const date = new Date(`${dateValue}T00:00:00`);
  const day = date.getDate();
  const suffix = day % 10 === 1 && day !== 11 ? "st" : day % 10 === 2 && day !== 12 ? "nd" : day % 10 === 3 && day !== 13 ? "rd" : "th";
  const month = date.toLocaleString("en-US", { month: "short" });
  return `${month} ${day}${suffix}`;
};

const fieldStyles =
  "h-14 w-full rounded-2xl border border-[#E7E1D8] bg-white px-4 text-base text-[#2F2B28] shadow-[0_4px_14px_rgba(47,43,40,0.06)] outline-none transition-all duration-300 placeholder:text-[#8B847B] hover:border-[#d8cdbf] focus:border-[#54D68C] focus:ring-4 focus:ring-[#54D68C]/15";

const GutResetWebinarEnroll = () => {
  // Vite serves frontend only; it does not execute /api/*.ts routes.
  // Use `npm run vercel-dev` to run frontend + backend together.
  // Backend secret env vars use process.env without VITE_, while frontend-safe vars use VITE_.
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as EnrollLocationState | null;
  const [formData, setFormData] = useState<WebinarEnrollmentFormData>(() =>
    createWebinarEnrollmentFormData(locationState?.prefill),
  );
  const [fieldErrors, setFieldErrors] = useState(validateWebinarEnrollmentForm(formData));
  const [touched, setTouched] = useState<WebinarEnrollmentTouched>(initialWebinarEnrollmentTouched);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [debugWhatsappRedirectUrl, setDebugWhatsappRedirectUrl] = useState<string | null>(null);
  const [webinar, setWebinar] = useState<WebinarEvent | null>(null);
  const [isWebinarLoading, setIsWebinarLoading] = useState(true);
  const [countdownText, setCountdownText] = useState("Starts in: --:--:--");

  const isDisabled = useMemo(
    () => loading || !isWebinarEnrollmentFormSubmittable(formData),
    [formData, loading],
  );

  const markTouched = (field: WebinarEnrollmentField) =>
    setTouched((previous) => ({
      ...previous,
      [field]: true,
    }));

  const updateFormData = (field: WebinarEnrollmentField, value: string) => {
    const nextFormData = {
      ...formData,
      [field]: field === "phone" ? sanitizePhoneNumber(value) : value,
    };
    setFormData(nextFormData);
    markTouched(field);
    setFieldErrors(validateWebinarEnrollmentForm(nextFormData));
  };

  const applyErrors = (errors: WebinarEnrollmentErrors) => {
    setFieldErrors(errors);
  };

  const getInputStateClassName = (field: WebinarEnrollmentField) => {
    const shouldShowState = touched[field] || hasAttemptedSubmit;
    if (!shouldShowState) {
      return "";
    }
    if (fieldErrors[field]) {
      return "border-red-500 focus:border-red-500 focus:ring-red-500/20";
    }
    return "border-green-500 focus:border-green-500 focus:ring-green-500/20";
  };

  useEffect(() => {
    const loadWebinar = async () => {
      try {
        const activeWebinar = await fetchActiveWebinar();
        setWebinar(activeWebinar);
      } catch {
        setWebinar(null);
      } finally {
        setIsWebinarLoading(false);
      }
    };

    void loadWebinar();
  }, []);

  useEffect(() => {
    const startDate = getWebinarStartDate(webinar);
    if (!startDate) {
      setCountdownText("Starts in: --:--:--");
      return;
    }

    const updateCountdown = () => {
      setCountdownText(formatCountdown(startDate.getTime() - Date.now()));
    };

    updateCountdown();
    const interval = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(interval);
  }, [webinar]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasAttemptedSubmit(true);
    const errors = validateWebinarEnrollmentForm(formData);
    applyErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    await startWebinarPaymentFlow({
      formData,
      onPaymentSuccess: () => navigate("/gut-reset-webinar/success"),
      onProcessingChange: setLoading,
      onError: (message) => alert(message),
      onWhatsappRedirectUrlChange: setDebugWhatsappRedirectUrl,
    });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F8F5EF] font-sans text-[#2F2B28]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(182,134,75,0.09),transparent_34%),radial-gradient(circle_at_80%_85%,rgba(84,214,140,0.07),transparent_34%)]" />
      <div className="pointer-events-none absolute left-[-70px] bottom-16 h-52 w-52 rounded-full bg-[#dcebd8]/55 blur-3xl" />
      <div className="pointer-events-none absolute right-[-60px] top-24 h-60 w-60 rounded-full bg-[#efe3d5]/80 blur-3xl" />
      <Leaf className="pointer-events-none absolute left-8 top-24 hidden h-16 w-16 text-[#B6864B]/30 lg:block" />
      <Leaf className="pointer-events-none absolute left-10 bottom-28 hidden h-20 w-20 text-[#6dad80]/35 lg:block" />
      <Leaf className="pointer-events-none absolute left-28 bottom-10 hidden h-12 w-12 -rotate-12 text-[#8fb998]/40 lg:block" />
      <Leaf className="pointer-events-none absolute right-14 top-28 hidden h-16 w-16 text-[#7bad8a]/30 lg:block" />
      <div className="pointer-events-none absolute bottom-16 right-8 hidden h-10 w-10 rotate-12 rounded-full bg-gradient-to-br from-white/90 to-[#f0e5d7] shadow-sm lg:block" />

      <header className="relative border-b border-[#E7E1D8] bg-white/75 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-5">
          <div className="flex items-center gap-2.5">
            <HeartPulse className="h-6 w-6 text-[#B6864B]" />
            <p className="font-serif text-3xl leading-none">Gut Health Hub</p>
          </div>
        </div>
      </header>

      <section className="relative mx-auto max-w-6xl px-4 pb-8 pt-8 md:pt-10">
        <motion.img
          src={plateDecoration}
          alt="Decorative avocado plate"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 0.9, y: [0, -8, 0] }}
          transition={{
            opacity: { duration: 0.8, ease: "easeOut" },
            y: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
          className="pointer-events-none absolute right-[-130px] top-[-32px] z-0 w-[180px] select-none rounded-[32px] object-cover opacity-60 shadow-xl sm:right-[-100px] sm:w-[230px] sm:opacity-75 lg:right-[-60px] lg:w-[300px] lg:opacity-90"
        />
        <motion.img
          src={plantsDecoration}
          alt="Decorative indoor plants"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 0.86, y: [0, -6, 0] }}
          transition={{
            opacity: { duration: 0.9, delay: 0.15, ease: "easeOut" },
            y: { duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
          className="pointer-events-none absolute bottom-[42px] left-[-190px] z-0 w-[170px] select-none rounded-[32px] object-cover opacity-45 shadow-xl sm:left-[-150px] sm:w-[220px] sm:opacity-60 lg:left-[-120px] lg:w-[280px] lg:opacity-80"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative z-10 rounded-[24px] border border-[#E7E1D8] bg-white/90 p-5 shadow-[0_18px_45px_rgba(47,43,40,0.08)] md:p-8"
        >
          <div className="mb-6 flex flex-wrap items-center gap-3 md:mb-8">
            {["1. Info", "2. Progress", "3. Step"].map((step, index) => (
              <div key={step} className="flex items-center gap-3">
                <span className={`text-2xl font-medium ${index === 0 ? "text-[#2F2B28]" : "text-[#9a938b]"}`}>
                  {step}
                </span>
                {index < 2 ? (
                  <span
                    className={`h-[3px] w-14 rounded-full ${
                      index === 0 ? "bg-[#2F2B28]" : "bg-[#ddd6cc]"
                    }`}
                  />
                ) : null}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h1 className="font-serif text-5xl leading-tight tracking-tight">Reserve Your Webinar Spot</h1>
              <p className="mt-3 text-xl text-[#5F5851]">
                Fill in your details below to continue and unlock your webinar access.
              </p>

              <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="mt-7 rounded-2xl border border-[#E7E1D8] bg-[#f2ede4] p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="flex items-center gap-2 font-serif text-3xl">
                    <CircleHelp className="h-5 w-5 text-[#B6864B]" />
                    Webinar Details
                  </h2>
                  {webinar?.banner_image ? (
                    <img
                      src={webinar.banner_image}
                      alt="Webinar banner"
                      className="h-14 w-24 rounded-xl border border-[#E7E1D8] object-cover"
                    />
                  ) : null}
                </div>

                {isWebinarLoading ? (
                  <div className="mt-4 space-y-2">
                    <div className="h-5 w-full animate-pulse rounded bg-white/80" />
                    <div className="h-5 w-2/3 animate-pulse rounded bg-white/70" />
                  </div>
                ) : webinar ? (
                  <div className="mt-4 space-y-1 text-lg text-[#3f3a35]">
                    <p className="font-semibold">{webinar.title ?? "Gut Reset Webinar"}</p>
                    <p>
                      Date: <span className="font-medium">{formatDateLabel(webinar.webinar_date)}</span> | Time:{" "}
                      <span className="font-medium">{webinar.webinar_time ?? "7 PM IST"}</span> | Duration:{" "}
                      <span className="font-medium">{webinar.duration ?? "90 mins"}</span> | Speaker:{" "}
                      <span className="font-medium">{webinar.speaker_name ?? "Geeta Angra"}</span>
                    </p>
                    <p className="font-semibold text-[#2F2B28]">{countdownText}</p>
                  </div>
                ) : (
                  <p className="mt-4 text-base text-[#6f6962]">
                    No active webinar found right now. Please proceed with enrollment and our team will share the latest schedule by email.
                  </p>
                )}
              </motion.section>

              <form id="enroll-webinar-form" onSubmit={handleSubmit} className="mt-7 space-y-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[
                    { key: "name", label: "NAME", type: "text", placeholder: "Name" },
                    { key: "email", label: "EMAIL", type: "email", placeholder: "Email" },
                    { key: "phone", label: "PHONE NUMBER", type: "tel", placeholder: "Phone Number" },
                    { key: "city", label: "CITY", type: "text", placeholder: "City" },
                  ].map((field) => {
                    const fieldKey = field.key as WebinarEnrollmentField;
                    const shouldShowError = (touched[fieldKey] || hasAttemptedSubmit) && !!fieldErrors[fieldKey];
                    return (
                      <label key={field.key} className="block space-y-1.5">
                        <span className="text-sm font-semibold tracking-wide text-[#4f4943]">{field.label}</span>
                        <input
                          required
                          type={field.type}
                          inputMode={fieldKey === "phone" ? "numeric" : undefined}
                          pattern={fieldKey === "phone" ? "\\d*" : undefined}
                          maxLength={fieldKey === "phone" ? 10 : undefined}
                          placeholder={field.placeholder}
                          value={formData[fieldKey]}
                          onChange={(event) => updateFormData(fieldKey, event.target.value)}
                          onBlur={() => {
                            markTouched(fieldKey);
                            setFieldErrors(validateWebinarEnrollmentForm(formData));
                          }}
                          className={cn(fieldStyles, getInputStateClassName(fieldKey))}
                        />
                        {shouldShowError ? <p className="text-xs text-red-600">{fieldErrors[fieldKey]}</p> : null}
                      </label>
                    );
                  })}
                </div>

                <label className="block space-y-1.5">
                  <span className="text-sm font-semibold tracking-wide text-[#4f4943]">HEALTH GOAL</span>
                  <textarea
                    required
                    placeholder="Health Goal"
                    rows={4}
                    value={formData.healthGoal}
                    onChange={(event) => updateFormData("healthGoal", event.target.value)}
                    onBlur={() => {
                      markTouched("healthGoal");
                      setFieldErrors(validateWebinarEnrollmentForm(formData));
                    }}
                    className={cn(
                      "w-full rounded-2xl border border-[#E7E1D8] bg-white px-4 py-4 text-base text-[#2F2B28] shadow-[0_4px_14px_rgba(47,43,40,0.06)] outline-none transition-all duration-300 placeholder:text-[#8B847B] hover:border-[#d8cdbf] focus:border-[#54D68C] focus:ring-4 focus:ring-[#54D68C]/15",
                      getInputStateClassName("healthGoal"),
                    )}
                  />
                  {(touched.healthGoal || hasAttemptedSubmit) && fieldErrors.healthGoal ? (
                    <p className="text-xs text-red-600">{fieldErrors.healthGoal}</p>
                  ) : null}
                </label>
              </form>
            </div>

            <div className="lg:col-span-5">
              <motion.aside
                whileHover={{ scale: 1.012 }}
                transition={{ duration: 0.25 }}
                className="rounded-[24px] border border-[#E7E1D8] bg-[#f9f6ee] p-6 shadow-[0_18px_35px_rgba(47,43,40,0.1)] lg:sticky lg:top-8"
              >
                <h2 className="font-serif text-4xl">Webinar + Module Access</h2>
                <p className="mt-2 font-serif text-6xl leading-none">₹{webinarPrice}</p>

                <ul className="mt-6 space-y-3">
                  {[
                    "Webinar Recording",
                    "Bonus PDFs",
                    "Meal Plan Sample",
                    "WhatsApp Support",
                    "Access Sent by Email After Payment",
                  ].map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-base text-[#4f4943]">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#49C47D]" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {["Razorpay", "Visa", "Mastercard", "UPI"].map((provider) => (
                    <span
                      key={provider}
                      className="rounded-xl border border-[#E7E1D8] bg-white px-4 py-2 text-base font-semibold text-[#4f4943]"
                    >
                      {provider}
                    </span>
                  ))}
                </div>

                <button
                  type="submit"
                  form="enroll-webinar-form"
                  disabled={isDisabled}
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#54D68C] to-[#49C47D] px-6 py-4 text-xl font-semibold text-white shadow-[0_12px_22px_rgba(73,196,125,0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_26px_rgba(73,196,125,0.4)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:from-[#91dfb4] disabled:to-[#91dfb4] disabled:opacity-60"
                >
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
                  Reserve Now – ₹{webinarPrice}
                </button>

                {debugWhatsappRedirectUrl ? (
                  <a
                    href={debugWhatsappRedirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 bg-green-500 px-4 py-2 text-white rounded inline-flex w-full items-center justify-center"
                  >
                    Open WhatsApp
                  </a>
                ) : null}
              </motion.aside>
            </div>
          </div>
        </motion.div>

        <footer className="pb-4 pt-8 text-center text-sm text-[#6f6962]">
          <Link to="/terms" className="transition-colors hover:text-[#2F2B28]">
            Terms &amp; Conditions
          </Link>{" "}
          |{" "}
          <Link to="/privacy-policy" className="transition-colors hover:text-[#2F2B28]">
            Privacy Policy
          </Link>
        </footer>
      </section>
    </main>
  );
};

export default GutResetWebinarEnroll;
