"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight, Ruler } from "lucide-react";
import Reveal from "./Reveal";
import SpecModal, { type SpecRow } from "./SpecModal";

const PRODUCTS = [
  {
    name: "Reversible Cultivator Shovel",
    category: "Reversible Cultivator Shovel",
    spec: "Reversible",
    desc: "Heat treated, deep countered holes. Chamfered range also available",
    img: "/images/products/cultivator-shovel-v2.png",
    pad: "p-10",
  },
  {
    name: "Seed Drill Shovel",
    category: "Seed Drill Range",
    spec: "8\" – 9\"",
    desc: "Precision Phali blades for accurate sowing, sizes 8\"-9\"",
    img: "/images/products/seed-drill-shovel-v2.png",
    pad: "p-10",
  },
  {
    name: "4 Hole Shovel",
    category: "Cultivator Range",
    spec: "4-Hole",
    desc: "Extra holes for stronger, adjustable mounting",
    img: "/images/products/four-hole-shovel-v2.png",
    pad: "p-10",
  },
  {
    name: "Bhartpuri Shovel",
    category: "Regional Range",
    spec: "Traditional",
    desc: "Traditional Bhartpuri style for regional tillage",
    img: "/images/products/bhartpuri-shovel.png",
    pad: "p-10",
  },
  {
    name: "Duck Foot Shovel",
    category: "Weed Control Range",
    spec: "Wide Sweep",
    desc: "Wide sweep design for effective weed control",
    img: "/images/products/duck-foot-shovel-v3.png",
    pad: "p-10",
  },
  {
    name: "Shovel Bolts",
    category: "Hardware Range",
    spec: "M10",
    desc: "Heat treated M10 bolts, corrosion resistant",
    img: "/images/products/shovel-bolts-v5.png",
    pad: "p-10",
  },
  {
    name: "Diamond Cut Shovel",
    category: "Diamond Range",
    spec: "Diamond Cut",
    desc: "Diamond-shaped cut for sharp penetration and durability",
    img: "/images/products/diamond-cut-shovel.png",
    pad: "p-10",
  },
  {
    name: "Single Edge Shovel",
    category: "Cultivator Range",
    spec: "Single Edge",
    desc: "Single-edge design for focused, efficient tillage",
    img: "/images/products/single-edge-shovel.png",
    pad: "p-10",
  },
] as const;

const SPECS: Record<string, { columns: string[]; rows: SpecRow[] }> = {
  "Reversible Cultivator Shovel": {
    columns: ["Code", "Length", "Width", "Thickness", "Edge Length", "Weight"],
    rows: [
      { Code: "A1507", Length: "15\"", Width: "75 mm", Thickness: "7 mm", "Edge Length": "110 mm", Weight: "1.0 Kg" },
      { Code: "A1607", Length: "16\"", Width: "75 mm", Thickness: "7 mm", "Edge Length": "110 mm", Weight: "1.1 Kg" },
      { Code: "A1510", Length: "15\"", Width: "75 mm", Thickness: "10 mm", "Edge Length": "110 mm", Weight: "1.36 Kg" },
      { Code: "A1610", Length: "16\"", Width: "75 mm", Thickness: "10 mm", "Edge Length": "110 mm", Weight: "1.54 Kg" },
      { Code: "A1512", Length: "15\"", Width: "75 mm", Thickness: "12 mm", "Edge Length": "110 mm", Weight: "1.80 Kg" },
      { Code: "A1612", Length: "16\"", Width: "75 mm", Thickness: "12 mm", "Edge Length": "110 mm", Weight: "2.00 Kg" },
      { Code: "A178014", Length: "17\"", Width: "80 mm", Thickness: "14 mm", "Edge Length": "120 mm", Weight: "2.40 Kg" },
    ],
  },
  "Seed Drill Shovel": {
    columns: ["Code", "Length", "Width", "Thickness", "Edge Length", "Center Distance", "Weight"],
    rows: [
      { Code: "A8100", Length: "8\"", Width: "45 mm", Thickness: "5 mm", "Edge Length": "40 mm", "Center Distance": "1\"", Weight: "0.280 Kg" },
      { Code: "A8125", Length: "8\"", Width: "45 mm", Thickness: "5 mm", "Edge Length": "40 mm", "Center Distance": "1.25\"", Weight: "0.280 Kg" },
      { Code: "A8175", Length: "8\"", Width: "45 mm", Thickness: "5 mm", "Edge Length": "40 mm", "Center Distance": "1.75\"", Weight: "0.280 Kg" },
      { Code: "A9175", Length: "9\"", Width: "45 mm", Thickness: "5 mm", "Edge Length": "50 mm", "Center Distance": "1.75\"", Weight: "0.330 Kg" },
      { Code: "A9175-8-SE", Length: "9\"", Width: "45 mm", Thickness: "8 mm", "Edge Length": "40 mm", "Center Distance": "1.75\"", Weight: "0.500 Kg" },
      { Code: "A9028", Length: "9\"", Width: "28 mm", Thickness: "8 mm", "Edge Length": "80 mm", "Center Distance": "1.75\"", Weight: "0.216 Kg" },
    ],
  },
  "Shovel Bolts": {
    columns: ["Size", "Length"],
    rows: [
      { Size: "M10", Length: "50 mm" },
      { Size: "M10", Length: "65 mm" },
      { Size: "M10", Length: "75 mm" },
      { Size: "M10", Length: "90 mm" },
    ],
  },
};

const AUTOPLAY_MS = 4500;

export default function Products() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [openSpec, setOpenSpec] = useState<string | null>(null);

  const count = PRODUCTS.length;
  const goTo = (i: number) => setActive((i + count) % count);
  const next = () => goTo(active + 1);
  const prev = () => goTo(active - 1);

  // Auto-advancing slider, pauses on hover/touch or while the spec modal is open.
  useEffect(() => {
    if (paused || openSpec) return;
    const id = setInterval(() => setActive((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, openSpec]);

  const p = PRODUCTS[active];
  const prevP = PRODUCTS[(active - 1 + count) % count];
  const nextP = PRODUCTS[(active + 1) % count];
  const specs = SPECS[p.name];

  return (
    <section id="products" className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
        <Reveal className="text-center">
          <h2 className="mx-auto max-w-3xl font-display text-2xl font-bold uppercase leading-tight text-ink sm:text-3xl">
            Shovels Built to Shape the Field Around You
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink/55">
            Every range is heat treated and precision made to tackle your soil conditions and
            deliver long-term value.
          </p>
          <a
            href="/catalogue.pdf"
            download
            className="mt-4 inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-widest text-orange-dark hover:underline"
          >
            <ArrowRight size={13} /> Explore Our Full Catalogue
          </a>
        </Reveal>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
          className="mt-10"
        >
          <div className="flex items-center justify-center gap-2 overflow-hidden sm:gap-6 lg:gap-10">
            <div className="hidden w-32 shrink-0 opacity-15 grayscale sm:block lg:w-44">
              <div className="relative aspect-square">
                <Image src={prevP.img} alt="" fill sizes="176px" className="object-contain p-6" aria-hidden />
              </div>
            </div>

            <button
              onClick={prev}
              aria-label="Previous product"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink/50 transition-colors hover:text-orange-dark"
            >
              <ChevronLeft size={26} />
            </button>

            <div className="relative aspect-square w-full max-w-[420px] shrink">
              <Image
                key={p.img}
                src={p.img}
                alt={p.name}
                fill
                sizes="(max-width: 1024px) 60vw, 420px"
                className={`object-contain ${p.pad} transition-opacity duration-500`}
                priority={active === 0}
              />
            </div>

            <button
              onClick={next}
              aria-label="Next product"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink/50 transition-colors hover:text-orange-dark"
            >
              <ChevronRight size={26} />
            </button>

            <div className="hidden w-32 shrink-0 opacity-15 grayscale sm:block lg:w-44">
              <div className="relative aspect-square">
                <Image src={nextP.img} alt="" fill sizes="176px" className="object-contain p-6" aria-hidden />
              </div>
            </div>
          </div>

          <Reveal key={p.name} className="text-center">
            <p className="mt-4 font-display text-3xl font-bold uppercase leading-none text-ink sm:text-4xl">
              {p.spec}
            </p>

            <div className="mt-4 flex items-center justify-center gap-3 sm:gap-5">
              <span className="hidden font-display text-xs font-medium uppercase tracking-wider text-ink/35 sm:inline">
                {prevP.name}
              </span>
              <button onClick={prev} aria-label="Previous product" className="text-ink/40 hover:text-orange-dark">
                <ChevronLeft size={16} />
              </button>
              <h3 className="font-display text-base font-bold uppercase tracking-wide text-ink sm:text-lg">
                {p.category}
              </h3>
              <button onClick={next} aria-label="Next product" className="text-ink/40 hover:text-orange-dark">
                <ChevronRight size={16} />
              </button>
              <span className="hidden font-display text-xs font-medium uppercase tracking-wider text-ink/35 sm:inline">
                {nextP.name}
              </span>
            </div>

            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink/55">{p.desc}</p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-sm bg-orange px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-orange-dark"
              >
                Enquire Now
              </a>
              {specs && (
                <button
                  onClick={() => setOpenSpec(p.name)}
                  className="inline-flex items-center gap-2 rounded-sm border border-ink/20 px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider text-ink transition-colors hover:border-orange-dark hover:text-orange-dark"
                >
                  View Sizes <Ruler size={15} />
                </button>
              )}
            </div>
          </Reveal>

          <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-start justify-center gap-x-2 gap-y-6">
            {PRODUCTS.map((item, i) => (
              <button
                key={item.name}
                onClick={() => goTo(i)}
                className={`flex w-24 flex-col items-center gap-2 rounded-md px-1 py-2 transition-colors sm:w-28 ${
                  active === i ? "bg-cream" : "hover:bg-cream/60"
                }`}
              >
                <div className="relative h-14 w-full">
                  <Image src={item.img} alt={item.name} fill sizes="112px" className="object-contain p-1" />
                </div>
                <p
                  className={`text-center font-display text-[10px] font-semibold uppercase leading-tight ${
                    active === i ? "text-orange-dark" : "text-ink/60"
                  }`}
                >
                  {item.name} <span className="block text-ink/40">({item.spec})</span>
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {openSpec && SPECS[openSpec] && (
        <SpecModal
          title={openSpec}
          columns={SPECS[openSpec].columns}
          rows={SPECS[openSpec].rows}
          onClose={() => setOpenSpec(null)}
        />
      )}
    </section>
  );
}
