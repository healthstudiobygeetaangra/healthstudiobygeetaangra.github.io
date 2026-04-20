export interface WebinarEnrollmentFormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  healthGoal: string;
}

export type WebinarEnrollmentField = keyof WebinarEnrollmentFormData;
export type WebinarEnrollmentErrors = Partial<Record<WebinarEnrollmentField, string>>;
export type WebinarEnrollmentTouched = Record<WebinarEnrollmentField, boolean>;

export const INVALID_EMAIL_MESSAGE = "Please enter a valid email address";
export const INVALID_PHONE_MESSAGE = "Please enter a valid 10-digit phone number";
const REQUIRED_FIELD_MESSAGE = "This field is required";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const initialWebinarEnrollmentFormData: WebinarEnrollmentFormData = {
  name: "",
  email: "",
  phone: "",
  city: "",
  healthGoal: "",
};

export const initialWebinarEnrollmentTouched: WebinarEnrollmentTouched = {
  name: false,
  email: false,
  phone: false,
  city: false,
  healthGoal: false,
};

export const sanitizePhoneNumber = (value: string) => value.replace(/\D/g, "").slice(0, 10);

export const createWebinarEnrollmentFormData = (
  input?: Partial<WebinarEnrollmentFormData>,
): WebinarEnrollmentFormData => ({
  ...initialWebinarEnrollmentFormData,
  ...input,
  phone: sanitizePhoneNumber(input?.phone ?? ""),
});

const validateRequiredField = (value: string) => (!value.trim() ? REQUIRED_FIELD_MESSAGE : "");

export const validateWebinarEnrollmentForm = (
  formData: WebinarEnrollmentFormData,
): WebinarEnrollmentErrors => {
  const errors: WebinarEnrollmentErrors = {};
  const requiredFields: WebinarEnrollmentField[] = ["name", "email", "phone", "city", "healthGoal"];

  for (const field of requiredFields) {
    const requiredError = validateRequiredField(formData[field]);
    if (requiredError) {
      errors[field] = requiredError;
    }
  }

  if (formData.email.trim() && !EMAIL_REGEX.test(formData.email.trim())) {
    errors.email = INVALID_EMAIL_MESSAGE;
  }

  if (formData.phone && !/^\d{10}$/.test(sanitizePhoneNumber(formData.phone))) {
    errors.phone = INVALID_PHONE_MESSAGE;
  }

  return errors;
};

export const isWebinarEnrollmentFormSubmittable = (formData: WebinarEnrollmentFormData) =>
  Object.keys(validateWebinarEnrollmentForm(formData)).length === 0;
