import crypto from "node:crypto";
import { createClient } from "@supabase/supabase-js";

type RequestBody = {
  leadId?: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
};

type VercelRequest = {
  method?: string;
  body?: RequestBody;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (payload: unknown) => void;
};

const handler = async (req: VercelRequest, res: VercelResponse) => {
  console.log("verify-payment request body:", req.body);
  console.log("verify-payment method:", req.method);

  if (req.method !== "POST") {
    console.error("verify-payment rejected: non-POST method");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { leadId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body ?? {};
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const normalizedWhatsappNumber = whatsappNumber?.replace(/\D/g, "") ?? "";
  console.log("N8N_WEBHOOK_URL:", webhookUrl);
  console.log("NEXT_PUBLIC_WHATSAPP_NUMBER exists:", Boolean(whatsappNumber));
  console.log("Normalized WhatsApp number exists:", Boolean(normalizedWhatsappNumber));

  if (!leadId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    console.error("verify-payment rejected: incomplete payload", {
      hasLeadId: Boolean(leadId),
      hasRazorpayOrderId: Boolean(razorpay_order_id),
      hasRazorpayPaymentId: Boolean(razorpay_payment_id),
      hasRazorpaySignature: Boolean(razorpay_signature),
    });
    res.status(400).json({ error: "Incomplete payment verification payload." });
    return;
  }

  if (!supabaseUrl || !supabaseServiceRoleKey || !razorpayKeySecret) {
    console.error("verify-payment rejected: missing server configuration", {
      hasSupabaseUrl: Boolean(supabaseUrl),
      hasSupabaseServiceRoleKey: Boolean(supabaseServiceRoleKey),
      hasRazorpayKeySecret: Boolean(razorpayKeySecret),
    });
    res.status(500).json({ error: "Server configuration is incomplete." });
    return;
  }

  console.log("Starting Razorpay signature verification", {
    leadId,
    razorpay_order_id,
    razorpay_payment_id,
  });
  const expectedSignature = crypto
    .createHmac("sha256", razorpayKeySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    console.error("Razorpay signature verification failed", {
      expectedSignaturePrefix: expectedSignature.slice(0, 10),
      receivedSignaturePrefix: razorpay_signature.slice(0, 10),
    });
    res.status(400).json({ error: "Payment signature mismatch." });
    return;
  }
  console.log("Razorpay signature verified successfully");

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
  console.log("Looking up lead before update", { leadId });
  const { data: existingLead, error: existingLeadError } = await supabase
    .from("webinar_leads")
    .select("id, name, email, phone, amount, payment_status, razorpay_order_id, razorpay_payment_id")
    .eq("id", leadId)
    .maybeSingle();
  console.log("Supabase order lookup result", {
    leadId,
    existingLead,
    existingLeadError,
  });

  console.log("Updating lead payment record in Supabase", {
    leadId,
    payment_status: "paid",
    razorpay_order_id,
    razorpay_payment_id,
  });
  const { data: savedLead, error: orderError } = await supabase
    .from("webinar_leads")
    .update({
      payment_status: "paid",
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      payment_verified_at: new Date().toISOString(),
    })
    .eq("id", leadId)
    .select(
      "id, name, email, phone, city, health_goal, amount, payment_status, razorpay_order_id, razorpay_payment_id, created_at",
    )
    .single();
  console.log("Supabase order update/save result", {
    savedLead,
    orderError,
  });

  if (orderError || !savedLead) {
    console.error("Unable to save verified payment details in Supabase", orderError);
    res.status(500).json({ error: "Unable to update payment status." });
    return;
  }

  const order = {
    ...savedLead,
    user_name: savedLead.name,
    razorpay_order_id: savedLead.razorpay_order_id ?? razorpay_order_id,
  };
  console.log("Order object before webhook:", order);
  console.log("User name:", order.user_name);
  console.log("Email:", order.email);
  console.log("Phone:", order.phone);

  if (webhookUrl) {
    try {
      const webhookPayload = {
        name: order.user_name,
        email: order.email,
        phone: order.phone,
        program: "Gut Reset Program",
        paymentStatus: "success",
        amount: order.amount,
        orderId: order.razorpay_order_id,
        paymentId: razorpay_payment_id,
        event: "webinar_payment_success",
        lead: order,
        payment: {
          order_id: razorpay_order_id,
          payment_id: razorpay_payment_id,
        },
      };
      console.log("Triggering n8n webhook with payload:", webhookPayload);
      console.log("Triggering n8n webhook URL:", webhookUrl);

      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookPayload),
      });
      console.log("n8n webhook response status:", webhookResponse.status);
      const webhookResponseText = await webhookResponse.text();
      console.log("n8n webhook response body:", webhookResponseText);

      console.log("n8n webhook triggered successfully");
    } catch (webhookError) {
      console.error("Failed to trigger n8n webhook", webhookError);
    }
  } else {
    console.error("N8N_WEBHOOK_URL is missing");
    console.log("N8N_WEBHOOK_URL is not set, skipping webhook trigger");
  }

  const whatsappMessage = encodeURIComponent(
    `Hi, I just purchased the Gut Reset Program.\n\nName: ${order.user_name}\nEmail: ${order.email}\nPhone: ${order.phone}\nHealth Goal: ${order.health_goal || "Not provided"}`,
  );
  const whatsappRedirectUrl = normalizedWhatsappNumber
    ? `https://wa.me/${normalizedWhatsappNumber}?text=${whatsappMessage}`
    : null;
  console.log("Generated whatsappRedirectUrl:", whatsappRedirectUrl);

  res.status(200).json({
    success: true,
    message: "Payment verified successfully",
    whatsappRedirectUrl,
  });
};

export default handler;
