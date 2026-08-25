"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/store-shell";
import type { Product } from "@/lib/catalog";
import { money } from "@/lib/catalog";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const minimum = Math.min(...product.variants.map((variant) => variant.price));
  return <article className="product-card">
    <Link href={`/product/${product.slug}`} className="product-card__media">
      {product.badge && <span className="product-badge">{product.badge}</span>}
      <Image src={product.image} alt={`${product.name} ${product.variants[0].strength} Axispep research vial`} width={390} height={440} />
    </Link>
    <div className="product-card__body"><span className="eyebrow eyebrow--blue">{product.category}</span><h3><Link href={`/product/${product.slug}`}>{product.name}</Link></h3><p>{product.description}</p><div className="product-card__price"><strong>{product.variants.length > 1 ? `From ${money(minimum)}` : money(minimum)}</strong><span>{product.variants.length} {product.variants.length === 1 ? "strength" : "strengths"}</span></div><div className="product-card__actions"><Link className="button button--outline" href={`/product/${product.slug}`}>{product.variants.length > 1 ? "View options" : "Details"}</Link><button className="button button--navy" onClick={() => add(product)}>{product.variants.length > 1 ? "Add 1st option" : "Add to cart"}</button></div></div>
  </article>;
}
