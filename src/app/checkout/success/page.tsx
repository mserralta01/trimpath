import Link from "next/link";
import { CircleCheckBig } from "lucide-react";
import { StoreLayout } from "@/components/store-shell";

export default function CheckoutSuccessPage() {
  return <StoreLayout><main className="success-page"><div><CircleCheckBig /><span className="eyebrow eyebrow--blue">Payment received</span><h1>Your research order is confirmed.</h1><p>A receipt and tracking updates will be sent to the email used at checkout.</p><div><Link className="button button--navy" href="/track-order">Track order</Link><Link className="button button--outline" href="/shop">Return to catalogue</Link></div></div></main></StoreLayout>;
}
