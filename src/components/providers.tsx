"use client";

import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import { useMemo } from "react";
import { CartProvider } from "@/components/store-shell";

export function Providers({ children }: { children: React.ReactNode }) {
  const client = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_CONVEX_URL;
    return url ? new ConvexReactClient(url) : null;
  }, []);

  const content = <CartProvider>{children}</CartProvider>;
  return client ? <ConvexAuthProvider client={client}>{content}</ConvexAuthProvider> : content;
}
