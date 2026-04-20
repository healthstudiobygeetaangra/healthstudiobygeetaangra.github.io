import type { WebinarEnrollmentFormData } from "@/lib/webinarEnrollmentValidation";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (response: Record<string, unknown>) => void) => void;
    };
  }
}

interface StartWebinarPaymentParams {
  formData: WebinarEnrollmentFormData;
  onPaymentSuccess: () => void;
  onProcessingChange: (isProcessing: boolean) => void;
  onError?: (message: string) => void;
  onWhatsappRedirectUrlChange?: (url: string | null) => void;
}

const loadRazorpayScript = () =>
  new Promise<boolean>((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const getErrorMessage = (error: unknown, fallback: string) =>
  error instanceof Error && error.message ? error.message : fallback;

export const startWebinarPaymentFlow = async ({
  formData,
  onPaymentSuccess,
  onProcessingChange,
  onError,
  onWhatsappRedirectUrlChange,
}: StartWebinarPaymentParams) => {
  onProcessingChange(true);

  try {
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded || !window.Razorpay) {
      throw new Error("Unable to load payment gateway. Please try again.");
    }

    const orderResponse = await fetch("/api/create-webinar-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const orderRawResponse = await orderResponse.text();
    let orderData: Record<string, unknown>;
    try {
      orderData = JSON.parse(orderRawResponse);
    } catch {
      throw new Error("Unexpected API response from create order endpoint.");
    }

    if (!orderResponse.ok) {
      const errorMessage =
        typeof orderData.error === "string" ? orderData.error : "Could not create payment order.";
      throw new Error(errorMessage);
    }

    const orderId = typeof orderData.orderId === "string" ? orderData.orderId : "";
    const amount = typeof orderData.amount === "number" ? orderData.amount : 0;
    const currency = typeof orderData.currency === "string" ? orderData.currency : "";
    const keyId =
      (import.meta.env.VITE_RAZORPAY_KEY_ID as string | undefined) ||
      (typeof orderData.keyId === "string" ? orderData.keyId : "");
    const leadId = typeof orderData.leadId === "string" ? orderData.leadId : "";

    if (!orderId || !amount || !currency || !keyId) {
      throw new Error("Missing required Razorpay order payload.");
    }

    const options = {
      key: keyId,
      amount,
      currency,
      name: "Health Studio by Geeta Angra",
      description: "Gut Reset Webinar Access",
      order_id: orderId,
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
      theme: {
        color: "#49C47D",
      },
      handler: async (response: Record<string, string>) => {
        try {
          console.log("Starting verify payment request");
          const verifyResponse = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              leadId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          console.log("Verify response status:", verifyResponse.status);

          let verifyData: Record<string, unknown>;
          try {
            verifyData = (await verifyResponse.json()) as Record<string, unknown>;
          } catch {
            verifyData = {};
          }
          console.log("Verify payment response data:", verifyData);
          console.log("whatsappRedirectUrl:", verifyData.whatsappRedirectUrl);
          onWhatsappRedirectUrlChange?.(
            typeof verifyData.whatsappRedirectUrl === "string" ? verifyData.whatsappRedirectUrl : null,
          );

          if (!verifyResponse.ok) {
            const errorMessage =
              typeof verifyData.error === "string"
                ? verifyData.error
                : typeof verifyData.message === "string"
                  ? verifyData.message
                  : "Payment verification failed.";
            throw new Error(errorMessage);
          }

          if (verifyData.success === true) {
            if (
              typeof verifyData.whatsappRedirectUrl === "string" &&
              verifyData.whatsappRedirectUrl.length > 0
            ) {
              console.log("Opening WhatsApp in new tab:", verifyData.whatsappRedirectUrl);
              window.open(verifyData.whatsappRedirectUrl, "_blank", "noopener,noreferrer");
            } else {
              console.log("No WhatsApp redirect URL found");
            }
          } else {
            const errorMessage =
              typeof verifyData.message === "string" ? verifyData.message : "Payment verification failed.";
            throw new Error(errorMessage);
          }

          onPaymentSuccess();
        } catch (verifyError) {
          onError?.(getErrorMessage(verifyError, "Payment verification failed."));
        } finally {
          onProcessingChange(false);
        }
      },
      modal: {
        ondismiss: () => {
          onProcessingChange(false);
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.on("payment.failed", (response) => {
      console.error("Payment failed", (response as { error?: unknown }).error);
    });
    razorpay.open();
  } catch (error) {
    onError?.(getErrorMessage(error, "Payment flow failed."));
    onProcessingChange(false);
  }
};
