import { mutation } from "./_generated/server";
import { requireAxispepAdmin } from "./lib/auth";

const products = [
  ["bpc-157", "BPC-157", "Peptides", "A synthetic pentadecapeptide supplied as a lyophilized research compound.", "/assets/products/bpc-157-10mg.webp", "Popular", [["AX-BPC-10", "10mg", 59.99, 48]]],
  ["ghk-cu", "GHK-Cu", "Peptides", "A copper-binding tripeptide prepared for laboratory research workflows.", "/assets/products/ghk-cu-100mg.webp", "", [["AX-GHK-100", "100mg", 64.99, 31]]],
  ["glow", "GLOW", "Peptides", "A multi-compound research blend offered in two total fill strengths.", "/assets/products/glow-50mg.webp", "Blend", [["AX-GLW-50", "50mg", 99.99, 18], ["AX-GLW-70", "70mg", 129.99, 12]]],
  ["ipamorelin", "Ipamorelin", "Peptides", "A selective growth-hormone secretagogue research peptide.", "/assets/products/ipamorelin-10mg.webp", "", [["AX-IPA-10", "10mg", 59.99, 42]]],
  ["mots-c", "MOTS-c", "Peptides", "A mitochondrial-derived peptide available in two research strengths.", "/assets/products/mots-c-10mg.webp", "", [["AX-MOT-10", "10mg", 49.99, 36], ["AX-MOT-40", "40mg", 119.99, 14]]],
  ["nad", "NAD+", "Peptides", "A nicotinamide adenine dinucleotide research compound in three strengths.", "/assets/products/nad-100mg.webp", "", [["AX-NAD-100", "100mg", 34.99, 56], ["AX-NAD-500", "500mg", 89.99, 24], ["AX-NAD-1000", "1000mg", 149.99, 10]]],
  ["retatrutide", "Retatrutide", "GLP-1", "A triple-agonist research compound offered in three strengths.", "/assets/products/retatrutide-10mg.webp", "Bestseller", [["AX-RET-10", "10mg", 79.99, 65], ["AX-RET-20", "20mg", 129.99, 39], ["AX-RET-30", "30mg", 169.99, 22]]],
  ["semaglutide", "Semaglutide", "GLP-1", "A GLP-1 receptor agonist research compound in three strengths.", "/assets/products/semaglutide-5mg.webp", "", [["AX-SEM-5", "5mg", 54.99, 74], ["AX-SEM-10", "10mg", 84.99, 51], ["AX-SEM-20", "20mg", 129.99, 27]]],
  ["sermorelin", "Sermorelin", "Peptides", "A growth-hormone-releasing hormone analog for research use.", "/assets/products/sermorelin-10mg.webp", "", [["AX-SER-10", "10mg", 69.99, 29]]],
  ["tb-500", "TB-500", "Peptides", "A thymosin beta-4 fragment research peptide.", "/assets/products/bpc-157-10mg.webp", "", [["AX-TB5-10", "10mg", 69.99, 33]]],
  ["tesamorelin", "Tesamorelin", "Peptides", "A GHRH analog supplied as a 10mg lyophilized research vial.", "/assets/hero/tesamorelin-10mg.png", "", [["AX-TES-10", "10mg", 99.99, 21]]],
  ["tirzepatide", "Tirzepatide", "GLP-1", "A dual GIP/GLP-1 receptor agonist research compound in five strengths.", "/assets/products/retatrutide-10mg.webp", "Five strengths", [["AX-TIR-10", "10mg", 69.99, 61], ["AX-TIR-20", "20mg", 109.99, 43], ["AX-TIR-30", "30mg", 149.99, 26], ["AX-TIR-40", "40mg", 189.99, 17], ["AX-TIR-60", "60mg", 249.99, 8]]],
] as const;

export const run = mutation({
  args: {},
  handler: async (ctx) => {
    await requireAxispepAdmin(ctx);
    const existing = await ctx.db.query("products").first();
    if (existing) return { seeded: false };
    const now = Date.now();
    for (const [slug, name, category, description, image, badge, variants] of products) {
      await ctx.db.insert("products", { slug, name, category, description, image, badge: badge || undefined, active: true, updatedAt: now, variants: variants.map(([sku, strength, price, inventory]) => ({ sku, strength, price, inventory, lowStockAt: 12, active: true })) });
    }
    await ctx.db.insert("storeSettings", { singleton: "main", storeName: "Axispep", supportEmail: "support@axispep.com", freeShippingThreshold: 100, minimumOrder: 100, checkoutEnabled: false, announcement: "Free U.S. shipping on qualifying $100+ research orders", updatedAt: now });
    await ctx.db.insert("discounts", { code: "LAB10", type: "percent", amount: 10, active: true, usageCount: 0, startsAt: now });
    return { seeded: true };
  },
});
