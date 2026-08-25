export type Variant = {
  sku: string;
  strength: string;
  price: number;
  inventory: number;
};

export type Product = {
  slug: string;
  name: string;
  category: "GLP-1" | "Peptides";
  description: string;
  image: string;
  badge?: string;
  variants: Variant[];
};

export const products: Product[] = [
  { slug: "bpc-157", name: "BPC-157", category: "Peptides", description: "A synthetic pentadecapeptide supplied as a lyophilized research compound.", image: "/assets/products/bpc-157-10mg.webp", badge: "Popular", variants: [{ sku: "AX-BPC-10", strength: "10mg", price: 59.99, inventory: 48 }] },
  { slug: "ghk-cu", name: "GHK-Cu", category: "Peptides", description: "A copper-binding tripeptide prepared for laboratory research workflows.", image: "/assets/products/ghk-cu-100mg.webp", variants: [{ sku: "AX-GHK-100", strength: "100mg", price: 64.99, inventory: 31 }] },
  { slug: "glow", name: "GLOW", category: "Peptides", description: "A multi-compound research blend offered in two total fill strengths.", image: "/assets/products/glow-50mg.webp", badge: "Blend", variants: [{ sku: "AX-GLW-50", strength: "50mg", price: 99.99, inventory: 18 }, { sku: "AX-GLW-70", strength: "70mg", price: 129.99, inventory: 12 }] },
  { slug: "ipamorelin", name: "Ipamorelin", category: "Peptides", description: "A selective growth-hormone secretagogue research peptide.", image: "/assets/products/ipamorelin-10mg.webp", variants: [{ sku: "AX-IPA-10", strength: "10mg", price: 59.99, inventory: 42 }] },
  { slug: "mots-c", name: "MOTS-c", category: "Peptides", description: "A mitochondrial-derived peptide available in two research strengths.", image: "/assets/products/mots-c-10mg.webp", variants: [{ sku: "AX-MOT-10", strength: "10mg", price: 49.99, inventory: 36 }, { sku: "AX-MOT-40", strength: "40mg", price: 119.99, inventory: 14 }] },
  { slug: "nad", name: "NAD+", category: "Peptides", description: "A nicotinamide adenine dinucleotide research compound in three strengths.", image: "/assets/products/nad-100mg.webp", variants: [{ sku: "AX-NAD-100", strength: "100mg", price: 34.99, inventory: 56 }, { sku: "AX-NAD-500", strength: "500mg", price: 89.99, inventory: 24 }, { sku: "AX-NAD-1000", strength: "1000mg", price: 149.99, inventory: 10 }] },
  { slug: "retatrutide", name: "Retatrutide", category: "GLP-1", description: "A triple-agonist research compound offered in three strengths.", image: "/assets/products/retatrutide-10mg.webp", badge: "Bestseller", variants: [{ sku: "AX-RET-10", strength: "10mg", price: 79.99, inventory: 65 }, { sku: "AX-RET-20", strength: "20mg", price: 129.99, inventory: 39 }, { sku: "AX-RET-30", strength: "30mg", price: 169.99, inventory: 22 }] },
  { slug: "semaglutide", name: "Semaglutide", category: "GLP-1", description: "A GLP-1 receptor agonist research compound in three strengths.", image: "/assets/products/semaglutide-5mg.webp", variants: [{ sku: "AX-SEM-5", strength: "5mg", price: 54.99, inventory: 74 }, { sku: "AX-SEM-10", strength: "10mg", price: 84.99, inventory: 51 }, { sku: "AX-SEM-20", strength: "20mg", price: 129.99, inventory: 27 }] },
  { slug: "sermorelin", name: "Sermorelin", category: "Peptides", description: "A growth-hormone-releasing hormone analog for research use.", image: "/assets/products/sermorelin-10mg.webp", variants: [{ sku: "AX-SER-10", strength: "10mg", price: 69.99, inventory: 29 }] },
  { slug: "tb-500", name: "TB-500", category: "Peptides", description: "A thymosin beta-4 fragment research peptide.", image: "/assets/products/bpc-157-10mg.webp", variants: [{ sku: "AX-TB5-10", strength: "10mg", price: 69.99, inventory: 33 }] },
  { slug: "tesamorelin", name: "Tesamorelin", category: "Peptides", description: "A GHRH analog supplied as a 10mg lyophilized research vial.", image: "/assets/hero/tesamorelin-10mg.png", variants: [{ sku: "AX-TES-10", strength: "10mg", price: 99.99, inventory: 21 }] },
  { slug: "tirzepatide", name: "Tirzepatide", category: "GLP-1", description: "A dual GIP/GLP-1 receptor agonist research compound in five strengths.", image: "/assets/products/retatrutide-10mg.webp", badge: "Five strengths", variants: [{ sku: "AX-TIR-10", strength: "10mg", price: 69.99, inventory: 61 }, { sku: "AX-TIR-20", strength: "20mg", price: 109.99, inventory: 43 }, { sku: "AX-TIR-30", strength: "30mg", price: 149.99, inventory: 26 }, { sku: "AX-TIR-40", strength: "40mg", price: 189.99, inventory: 17 }, { sku: "AX-TIR-60", strength: "60mg", price: 249.99, inventory: 8 }] },
];

export const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

export const getProduct = (slug: string) => products.find((product) => product.slug === slug);
