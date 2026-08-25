"use client";

import { useMemo, useState } from "react";
import { FileCheck2, Search } from "lucide-react";
import { StoreLayout } from "@/components/store-shell";

const certificates = [
  ["Retatrutide", "AXR-RET-2408", "20mg", "August 2026"], ["Semaglutide", "AXR-SEM-2407", "5mg", "July 2026"], ["GHK-Cu", "AXR-GHK-2407", "100mg", "July 2026"], ["BPC-157", "AXR-BPC-2406", "10mg", "June 2026"], ["Tesamorelin", "AXR-TES-2406", "10mg", "June 2026"], ["MOTS-c", "AXR-MOT-2405", "10mg", "May 2026"], ["GLOW", "AXR-GLW-2405", "50mg", "May 2026"], ["Ipamorelin", "AXR-IPA-2404", "10mg", "April 2026"],
];

export default function Page() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => certificates.filter((row) => row.join(" ").toLowerCase().includes(query.toLowerCase())), [query]);
  return <StoreLayout><main className="results-page"><section className="results-hero"><div className="container"><span className="eyebrow eyebrow--blue">Batch documentation</span><h1>Certificate library</h1><p>Search compound names and lot numbers before beginning research.</p><label><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search compound or lot number" /></label></div></section><section className="container certificate-list"><div className="certificate-list__head"><span>{results.length} matching records</span><span>Hosted certificate PDFs</span></div>{results.map(([compound, lot, strength, date]) => <article key={lot}><FileCheck2 /><div><strong>{compound}</strong><span>{strength}</span></div><div><span>Lot number</span><strong>{lot}</strong></div><div><span>Tested</span><strong>{date}</strong></div><button>View certificate</button></article>)}</section></main></StoreLayout>;
}
