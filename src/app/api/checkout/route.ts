import { NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";

const bodySchema = z.object({
  orderNumber: z.string().min(5),
  customerEmail: z.email(),
  items: z.array(z.object({ name: z.string(), unitAmount: z.number().int().positive(), quantity: z.number().int().positive() })).min(1),
});

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY) return NextResponse.json({ error: "Secure payment is being configured. Your cart is still saved—please try again shortly." }, { status: 503 });
  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Please review the checkout details." }, { status: 400 });
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: parsed.data.customerEmail,
    billing_address_collection: "required",
    shipping_address_collection: { allowed_countries: ["US"] },
    line_items: parsed.data.items.map((item) => ({ quantity: item.quantity, price_data: { currency: "usd", unit_amount: item.unitAmount, product_data: { name: item.name, description: "For laboratory research use only" } } })),
    metadata: { orderNumber: parsed.data.orderNumber },
    success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/checkout`,
  });
  return NextResponse.json({ url: session.url });
}
