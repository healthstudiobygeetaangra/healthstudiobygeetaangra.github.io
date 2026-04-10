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
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { leadId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body ?? {};
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
  const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;

  if (!leadId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    res.status(400).json({ error: "Incomplete payment verification payload." });
    return;
  }

  if (!supabaseUrl || !supabaseServiceRoleKey || !razorpayKeySecret) {
    res.status(500).json({ error: "Server configuration is incomplete." });
    return;
  }

  const expectedSignature = crypto
    .createHmac("sha256", razorpayKeySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    res.status(400).json({ error: "Payment signature mismatch." });
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const { data: lead, error: leadError } = await supabase
    .from("webinar_leads")
    .update({ payment_status: "paid" })
    .eq("id", leadId)
    .select("id, name, email, phone, city, health_goal, amount, payment_status, created_at")
    .single();

  if (leadError || !lead) {
    res.status(500).json({ error: "Unable to update payment status." });
    return;
  }

  if (n8nWebhookUrl) {
    await fetch(n8nWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "webinar_payment_success",
        lead,
        payment: {
          order_id: razorpay_order_id,
          payment_id: razorpay_payment_id,
        },
      }),
    });
  }

  res.status(200).json({ success: true });
};

export default handler;
