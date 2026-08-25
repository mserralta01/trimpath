"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { StoreLayout } from "@/components/store-shell";
import { products } from "@/lib/catalog";

export default function ShopPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const filtered = useMemo(() => products.filter((product) => (category === "All" || product.category === category) && `${product.name} ${product.description}`.toLowerCase().includes(query.toLowerCase())), [category, query]);
  return <StoreLayout><main className="shop-page"><div className="container"><div className="page-intro"><span className="eyebrow eyebrow--blue">24 current SKUs</span><h1>Research catalogue</h1><p>Twelve compounds, grouped by molecule with strength-specific labels, SKUs, and pricing.</p></div><div className="shop-toolbar"><label><span className="sr-only">Search products</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" /></label><div className="segmented">{["All", "GLP-1", "Peptides"].map((item) => <button className={category === item ? "is-active" : ""} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div></div><div className="product-grid">{filtered.map((product) => <ProductCard product={product} key={product.slug} />)}</div></div></main></StoreLayout>;
}
