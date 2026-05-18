"use client";

import { useEffect, useState } from "react";

interface Category {
  id: string;
  slug: string;
  name: string;
}

export default function CategoryNav({ categories }: { categories: Category[] }) {
  const [active, setActive] = useState(categories[0]?.slug ?? "");

  useEffect(() => {
    const sections = categories.map((c) => document.getElementById(c.slug)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, [categories]);

  const scrollTo = (slug: string) => {
    const el = document.getElementById(slug);
    if (!el) return;
    const offset = 112; // header (64) + nav (~48)
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="sticky top-16 z-30 bg-[#0F0F0F] overflow-x-auto scrollbar-hide">
      {/* Single red bottom border — sin línea gris */}
      <div className="border-b-2 border-[#C8102E]/20">
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex min-w-max md:min-w-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollTo(cat.slug)}
              className={`relative px-4 md:px-5 py-4 text-[11px] uppercase tracking-[0.2em] transition-all duration-200 whitespace-nowrap ${
                active === cat.slug
                  ? "text-[#F5EFE6]"
                  : "text-[#6B6660] hover:text-[#F5EFE6]"
              }`}
              style={{ fontFamily: "var(--font-space-mono)" }}
            >
              {cat.name}
              {/* Indicador rojo abajo — solo en el activo */}
              {active === cat.slug && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C8102E]" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
