import { mutation } from "./_generated/server";
import { requireTrimPathAdmin } from "./lib/auth";

const products = [
  ["bpc-157", "BPC-157", "Peptides", "A synthetic pentadecapeptide supplied as a lyophilized research compound.", "/assets/products/trimpath-vial.svg", "Popular", [["TP-BPC-10", "10mg", 59.99, 48]]],
  ["ghk-cu", "GHK-Cu", "Peptides", "A copper-binding tripeptide prepared for laboratory research workflows.", "/assets/products/trimpath-vial.svg", "", [["TP-GHK-100", "100mg", 64.99, 31]]],
  ["glow", "GLOW", "Peptides", "A multi-compound research blend offered in two total fill strengths.", "/assets/products/trimpath-vial.svg", "Blend", [["TP-GLW-50", "50mg", 99.99, 18], ["TP-GLW-70", "70mg", 129.99, 12]]],
  ["ipamorelin", "Ipamorelin", "Peptides", "A selective growth-hormone secretagogue research peptide.", "/assets/products/trimpath-vial.svg", "", [["TP-IPA-10", "10mg", 59.99, 42]]],
  ["mots-c", "MOTS-c", "Peptides", "A mitochondrial-derived peptide available in two research strengths.", "/assets/products/trimpath-vial.svg", "", [["TP-MOT-10", "10mg", 49.99, 36], ["TP-MOT-40", "40mg", 119.99, 14]]],
  ["nad", "NAD+", "Peptides", "A nicotinamide adenine dinucleotide research compound in three strengths.", "/assets/products/trimpath-vial.svg", "", [["TP-NAD-100", "100mg", 34.99, 56], ["TP-NAD-500", "500mg", 89.99, 24], ["TP-NAD-1000", "1000mg", 149.99, 10]]],
  ["retatrutide", "Retatrutide", "GLP-1", "A triple-agonist research compound offered in three strengths.", "/assets/products/trimpath-vial.svg", "Bestseller", [["TP-RET-10", "10mg", 79.99, 65], ["TP-RET-20", "20mg", 129.99, 39], ["TP-RET-30", "30mg", 169.99, 22]]],
  ["semaglutide", "Semaglutide", "GLP-1", "A GLP-1 receptor agonist research compound in three strengths.", "/assets/products/trimpath-vial.svg", "", [["TP-SEM-5", "5mg", 54.99, 74], ["TP-SEM-10", "10mg", 84.99, 51], ["TP-SEM-20", "20mg", 129.99, 27]]],
  ["sermorelin", "Sermorelin", "Peptides", "A growth-hormone-releasing hormone analog for research use.", "/assets/products/trimpath-vial.svg", "", [["TP-SER-10", "10mg", 69.99, 29]]],
  ["tb-500", "TB-500", "Peptides", "A thymosin beta-4 fragment research peptide.", "/assets/products/trimpath-vial.svg", "", [["TP-TB5-10", "10mg", 69.99, 33]]],
  ["tesamorelin", "Tesamorelin", "Peptides", "A GHRH analog supplied as a 10mg lyophilized research vial.", "/assets/products/trimpath-vial.svg", "", [["TP-TES-10", "10mg", 99.99, 21]]],
  ["tirzepatide", "Tirzepatide", "GLP-1", "A dual GIP/GLP-1 receptor agonist research compound in five strengths.", "/assets/products/trimpath-vial.svg", "Five strengths", [["TP-TIR-10", "10mg", 69.99, 61], ["TP-TIR-20", "20mg", 109.99, 43], ["TP-TIR-30", "30mg", 149.99, 26], ["TP-TIR-40", "40mg", 189.99, 17], ["TP-TIR-60", "60mg", 249.99, 8]]],
] as const;

export const run = mutation({
  args: {},
  handler: async (ctx) => {
    await requireTrimPathAdmin(ctx);
    const existing = await ctx.db.query("products").first();
    if (existing) return { seeded: false };
    const now = Date.now();
    for (const [slug, name, category, description, image, badge, variants] of products) {
      await ctx.db.insert("products", { slug, name, category, description, image, ...(badge ? { badge } : {}), featured: true, sortOrder: now, active: true, updatedAt: now, variants: variants.map(([sku, strength, price, inventory]) => ({ sku, strength, price, inventory, lowStockAt: 12, active: true })) });
    }
    await ctx.db.insert("storeSettings", { singleton: "main", storeName: "Trim Path Rx", supportEmail: "support@trimpathrx.com", freeShippingThreshold: 100, minimumOrder: 100, checkoutEnabled: false, announcement: "Free U.S. shipping on qualifying $100+ research orders", updatedAt: now });
    await ctx.db.insert("discounts", { code: "LAB10", type: "percent", amount: 10, active: true, usageCount: 0, startsAt: now });
    return { seeded: true };
  },
});
