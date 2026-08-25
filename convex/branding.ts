import { mutation } from "./_generated/server";

const newSku = (sku: string) => sku.startsWith("AX-") ? `TP-${sku.slice(3)}` : sku;

/**
 * Idempotent production data alignment for the approved TrimPath rebrand.
 * It only updates brand-owned catalogue fields and SKU labels.
 */
export const applyTrimPath = mutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    let updatedProducts = 0;
    let updatedOrders = 0;
    const [products, orders, settings] = await Promise.all([
      ctx.db.query("products").collect(),
      ctx.db.query("orders").collect(),
      ctx.db.query("storeSettings").withIndex("by_singleton", (q) => q.eq("singleton", "main")).unique(),
    ]);

    for (const product of products) {
      const needsUpdate = product.image !== "/assets/products/trimpath-vial.svg" || product.variants.some((variant) => variant.sku.startsWith("AX-"));
      if (!needsUpdate) continue;
      await ctx.db.patch(product._id, {
        image: "/assets/products/trimpath-vial.svg",
        variants: product.variants.map((variant) => ({ ...variant, sku: newSku(variant.sku) })),
        updatedAt: now,
      });
      updatedProducts += 1;
    }

    for (const order of orders) {
      if (!order.items.some((item) => item.sku.startsWith("AX-"))) continue;
      await ctx.db.patch(order._id, {
        items: order.items.map((item) => ({ ...item, sku: newSku(item.sku) })),
        updatedAt: now,
      });
      updatedOrders += 1;
    }

    const updatedSettings = Boolean(settings && (settings.storeName !== "TrimPath" || settings.supportEmail !== "support@trimpath.com"));
    if (settings && updatedSettings) {
      await ctx.db.patch(settings._id, {
        storeName: "TrimPath",
        supportEmail: "support@trimpath.com",
        updatedAt: now,
      });
    }

    return { products: updatedProducts, orders: updatedOrders, settings: updatedSettings };
  },
});
