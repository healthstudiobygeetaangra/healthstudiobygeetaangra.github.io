import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { webinarPrice } from "@/data/gutResetWebinar";
import { startWebinarPaymentFlow } from "@/lib/webinarPaymentFlow";
import { cn } from "@/lib/utils";
import {
  createWebinarEnrollmentFormData,
  initialWebinarEnrollmentTouched,
  isWebinarEnrollmentFormSubmittable,
  sanitizePhoneNumber,
  type WebinarEnrollmentField,
  type WebinarEnrollmentTouched,
  validateWebinarEnrollmentForm,
} from "@/lib/webinarEnrollmentValidation";
import { cardClassName, fadeInUp } from "./shared";

const EnrollmentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(createWebinarEnrollmentFormData());
  const [fieldErrors, setFieldErrors] = useState(validateWebinarEnrollmentForm(formData));
  const [touched, setTouched] = useState<WebinarEnrollmentTouched>(initialWebinarEnrollmentTouched);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isDisabled = useMemo(
    () => isLoading || !isWebinarEnrollmentFormSubmittable(formData),
    [formData, isLoading],
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasAttemptedSubmit(true);
    const errors = validateWebinarEnrollmentForm(formData);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      navigate("/gut-reset-webinar/enroll");
      return;
    }
    await startWebinarPaymentFlow({
      formData,
      onPaymentSuccess: () => navigate("/gut-reset-webinar/success"),
      onProcessingChange: setIsLoading,
      onError: (message) => alert(message),
    });
  };

  return (
    <motion.section {...fadeInUp} id="enrollment-form" className={cardClassName}>
      <h2 className="font-serif text-3xl text-[#2F2B28]">Enrollment Form</h2>

      <div className="mt-5 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          {[
            { key: "name", label: "Name", type: "text" },
            { key: "email", label: "Email", type: "email" },
            { key: "phone", label: "Phone Number", type: "tel" },
            { key: "city", label: "City", type: "text" },
            { key: "healthGoal", label: "Health Goal", type: "text" },
          ].map((field) => {
            const fieldKey = field.key as WebinarEnrollmentField;
            const shouldShowError = (touched[fieldKey] || hasAttemptedSubmit) && !!fieldErrors[fieldKey];
            return (
              <label key={field.key} className="block space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-[#5F5851]">
                  {field.label}
                </span>
                <input
                  required
                  type={field.type}
                  inputMode={fieldKey === "phone" ? "numeric" : undefined}
                  pattern={fieldKey === "phone" ? "\\d*" : undefined}
                  maxLength={fieldKey === "phone" ? 10 : undefined}
                  value={formData[fieldKey]}
                  onChange={(event) => updateFormData(fieldKey, event.target.value)}
                  onBlur={() => {
                    markTouched(fieldKey);
                    setFieldErrors(validateWebinarEnrollmentForm(formData));
                  }}
                  className={cn(
                    "h-11 w-full rounded-xl border border-[#E7E1D8] bg-[#FCFBF8] px-3 text-sm text-[#2F2B28] outline-none transition focus:border-[#B6864B] focus:ring-2 focus:ring-[#B6864B]/20",
                    getInputStateClassName(fieldKey),
                  )}
                />
                {shouldShowError ? <p className="text-xs text-red-600">{fieldErrors[fieldKey]}</p> : null}
              </label>
            );
          })}

          <div className="rounded-2xl border border-[#E7E1D8] bg-[#F8F5EF] p-4">
            <h3 className="font-serif text-xl text-[#2F2B28]">Webinar + Module Access</h3>
            <p className="mt-1 font-serif text-3xl text-[#2F2B28]">₹{webinarPrice}</p>
            <ul className="mt-3 space-y-1.5">
              {[
                "Webinar Recording",
                "Bonus PDFs",
                "Meal Plan Sample",
                "WhatsApp Support",
                "Access Sent by Email After Payment",
              ].map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-[#5F5851]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2EAF54]" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <button
            type="submit"
            disabled={isDisabled}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2EAF54] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#249246] disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[#8BC89B] disabled:opacity-60"
          >
            {isLoading ? "Preparing Payment..." : `Reserve Your Seat – ₹${webinarPrice}`}
          </button>
        </form>

        <div className="flex flex-wrap items-center gap-2 border-t border-[#E7E1D8] pt-4">
          {["Razorpay", "Visa", "Mastercard", "UPI"].map((provider) => (
            <span
              key={provider}
              className="rounded-full border border-[#E7E1D8] bg-white px-3 py-1 text-xs font-medium text-[#5F5851]"
            >
              {provider}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default EnrollmentForm;
