import { createServerSupabaseClient } from "@/utils/supabase/server";

export async function POST(req) {
  const { userId, email, name, customer_uid } = await req.json();

  const getToken = async () => {
    const res = await fetch("https://api.iamport.kr/users/getToken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imp_key: process.env.IAMPORT_API_KEY,
        imp_secret: process.env.IAMPORT_API_SECRET,
      }),
    });
    const data = await res.json();
    return data.response.access_token;
  };

  const token = await getToken();

  const paymentRes = await fetch(
    "https://api.iamport.kr/subscribe/payments/again",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        customer_uid,
        merchant_uid: `first_${Date.now()}`,
        amount: 9900,
        name: "월간 구독",
      }),
    }
  );

  const result = await paymentRes.json();
  if (result.code === 0) {
    const now = new Date();
    const next = new Date(now);
    next.setMonth(now.getMonth() + 1);

    const supabase = createServerSupabaseClient();
    await supabase.from("subscribers").upsert({
      user_id: userId,
      email,
      name,
      pg_customer_uid: customer_uid,
      amount: 9900,
      status: "active",
      started_at: now,
      next_billing_date: next,
      failed_attempts: 0,
    });
    return Response.json({ success: true });
  } else {
    return Response.json({ success: false, message: result.message });
  }
}
