import { createClient } from "@supabase/supabase-js";
import Razorpay from "razorpay";

// Local note:
// - Vite alone cannot execute files in /api.
// - Run `npm run vercel-dev` so Vercel executes this backend route.
// - Backend secrets must use process.env.* without the VITE_ prefix.

type RequestBody = {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  healthGoal?: string;
};

type VercelRequest = {
  method?: string;
  body?: RequestBody;
  query?: { [key: string]: string | string[] | undefined };
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (payload: unknown) => void;
};

const WEBINAR_PRICE = 249;
const WEBINAR_AMOUNT_PAISE = WEBINAR_PRICE * 100;
const LEADS_TABLE = "webinar_leads";

const handler = async (req: VercelRequest, res: VercelResponse) => {
  const envDebug = {
    hasSupabaseUrl: !!process.env.SUPABASE_URL,
    hasSupabaseServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    hasRazorpayKey: !!process.env.RAZORPAY_KEY_ID,
    hasRazorpaySecret: !!process.env.RAZORPAY_KEY_SECRET,
    availableSupabaseVars: Object.keys(process.env).filter((key) => key.includes("SUPABASE")),
    availableRazorpayVars: Object.keys(process.env).filter((key) => key.includes("RAZORPAY")),
  };
  console.log("ENV CHECK", envDebug);

  const debugQuery = req.query?.debug_env;
  const shouldReturnDebug = debugQuery === "1" || (Array.isArray(debugQuery) && debugQuery.includes("1"));
  if (shouldReturnDebug) {
    res.status(200).json({ debug: envDebug });
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { name, email, phone, city, healthGoal } = req.body ?? {};

  if (!name || !email || !phone || !city || !healthGoal) {
    res.status(400).json({ error: "All fields are required." });
    return;
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
  const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
  console.log("RAZORPAY ENV CHECK", {
    hasKeyId: !!razorpayKeyId,
    hasKeySecret: !!razorpayKeySecret,
    keyPrefix: razorpayKeyId?.slice(0, 12),
  });

  if (!supabaseUrl || !supabaseServiceRoleKey || !razorpayKeyId || !razorpayKeySecret) {
    res.status(500).json({ error: "Server configuration is incomplete." });
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
  const razorpay = new Razorpay({
    key_id: razorpayKeyId,
    key_secret: razorpayKeySecret,
  });

  const leadPayload = {
    name,
    email,
    phone,
    city,
    health_goal: healthGoal,
    amount: WEBINAR_PRICE,
    payment_status: "pending",
  };
  console.log("Saving lead to Supabase", {
    table: LEADS_TABLE,
    payload: leadPayload,
  });

  const { data: lead, error: leadError } = await supabase
    .from(LEADS_TABLE)
    .insert(leadPayload)
    .select("id")
    .single();
  console.log("Supabase insert result", {
    data: lead,
    error: leadError,
  });

  if (leadError || !lead) {
    res.status(500).json({
      error: "Lead save failed",
      supabaseError: leadError
        ? {
            message: leadError.message,
            details: leadError.details,
            hint: leadError.hint,
            code: leadError.code,
          }
        : null,
    });
    return;
  }

  let order: { id: string; amount: number; currency: string };
  try {
    const receipt = `lead_${lead.id.slice(0, 8)}`;
    console.log("Using Razorpay receipt", receipt);

    order = await razorpay.orders.create({
      amount: WEBINAR_AMOUNT_PAISE,
      currency: "INR",
      receipt,
      notes: {
        lead_id: lead.id,
        email,
      },
    });
    console.log("Razorpay order response", order);
  } catch (error) {
    console.error("Razorpay order creation failed", error);
    const razorpayError = error as
      | {
          message?: string;
          description?: string;
          code?: string;
          statusCode?: number;
          error?: { description?: string; code?: string };
        }
      | undefined;
    res.status(500).json({
      error: "Failed to create payment order",
      razorpayError: {
        message: razorpayError?.message,
        description: razorpayError?.description ?? razorpayError?.error?.description,
        code: razorpayError?.code ?? razorpayError?.error?.code,
        statusCode: razorpayError?.statusCode,
      },
    });
    return;
  }

  res.status(200).json({
    success: true,
    leadId: lead.id,
    orderId: order.id,
    amount: WEBINAR_AMOUNT_PAISE,
    currency: "INR",
    keyId: razorpayKeyId,
  });
};

export default handler;
