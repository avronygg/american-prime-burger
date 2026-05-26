"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { Product } from "@prisma/client";

type Ingredient = { name: string; grams?: number };

export default function ProductModal() {
  const [product, setProduct] = useState<Product | null>(null);
  const [visible, setVisible] = useState(false);

  const close = useCallback(() => {
    setVisible(false);
    setTimeout(() => setProduct(null), 280);
  }, []);

  // Listen for open events from any ProductCard
  useEffect(() => {
    const handler = (e: Event) => {
      const next = (e as CustomEvent).detail as Product;
      setProduct(next);
      requestAnimationFrame(() => setVisible(true));
    };
    window.addEventListener("apb:openProduct", handler);
    return () => window.removeEventListener("apb:openProduct", handler);
  }, []);

  // ESC key + body scroll lock
  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [product, close]);

  if (!product) return null;

  const ingredients = product.ingredients ? (product.ingredients as Ingredient[]) : [];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6">

      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-[#0F0F0F]/85 backdrop-blur-sm transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
        onClick={close}
      />

      {/* Panel */}
      <div
        className={`relative w-full max-w-lg bg-[#111] flex flex-col max-h-[88dvh] border-t-2 border-[#C8102E] transition-all duration-300 ${
          visible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-3"
        }`}
        style={{ boxShadow: "5px 5px 0 #C8102E" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky top bar */}
        <div className="sticky top-0 z-10 bg-[#111] border-b border-[#1A1A1A] flex items-center justify-between px-5 py-3 shrink-0">
          <span
            className="text-[#C8102E] text-[9px] uppercase tracking-[0.4em]"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            ★ American Prime Burger
          </span>
          <button
            onClick={close}
            className="w-10 h-10 flex items-center justify-center bg-[#1A1A1A] border border-[#2a2a2a] text-[#6B6660] hover:text-[#F5EFE6] hover:border-[#C8102E] transition-all duration-200 ease-out active:scale-95 cursor-pointer apb-focus-ring"
            aria-label="Cerrar"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1">

          {/* Image */}
          {product.image ? (
            <div className="relative w-full aspect-[4/3] overflow-hidden shrink-0">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 512px"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#111] to-transparent" />
            </div>
          ) : (
            <div className="w-full aspect-[4/3] bg-[#0F0F0F] flex items-center justify-center shrink-0">
              <span className="text-[#1A1A1A] text-7xl uppercase" style={{ fontFamily: "var(--font-anton)" }}>APB</span>
            </div>
          )}

          {/* Content */}
          <div className="px-5 pb-8 pt-4 md:px-6">

            {/* Badges */}
            {(product.isNew || !product.available || product.tags.length > 0) && (
              <div className="flex flex-wrap gap-2 mb-3">
                {product.isNew && (
                  <span className="bg-[#E4A82C] text-[#0F0F0F] text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 font-bold" style={{ fontFamily: "var(--font-space-mono)" }}>
                    ¡Nueva!
                  </span>
                )}
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#1A1A1A] text-[#F5EFE6] text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 border border-[#C8102E]/70"
                    style={{ fontFamily: "var(--font-space-mono)" }}
                  >
                    {tag}
                  </span>
                ))}
                {!product.available && (
                  <span className="bg-[#1A1A1A] text-[#6B6660] text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 border border-[#2a2a2a]" style={{ fontFamily: "var(--font-space-mono)" }}>
                    Agotado
                  </span>
                )}
              </div>
            )}

            {/* Name */}
            <h2
              className="text-[#F5EFE6] text-[clamp(2rem,8vw,2.8rem)] uppercase leading-none mb-3"
              style={{ fontFamily: "var(--font-anton)" }}
            >
              {product.name}
            </h2>

            {/* Description */}
            {product.description && (
              <p
                className="text-[#A09890] text-sm md:text-base leading-relaxed mb-5"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {product.description}
              </p>
            )}

            {/* Ingredients */}
            {ingredients.length > 0 && (
              <div className="mb-5">
                <p
                  className="text-[#C8102E] text-[10px] uppercase tracking-[0.35em] mb-2"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  Ingredientes
                </p>
                <ul>
                  {ingredients.map((ing, i) => (
                    <li key={i} className="flex items-center justify-between border-b border-[#1A1A1A] py-2.5">
                      <span className="text-[#F5EFE6] text-sm" style={{ fontFamily: "var(--font-manrope)" }}>
                        {ing.name}
                      </span>
                      {ing.grams && (
                        <span className="text-[#6B6660] text-xs tabular-nums ml-4 shrink-0" style={{ fontFamily: "var(--font-space-mono)" }}>
                          {ing.grams} g
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Price */}
            <div className="flex items-end justify-between gap-4 pt-4 border-t border-[#1A1A1A]">
              <div>
                <p
                  className="text-[#6B6660] text-[10px] uppercase tracking-[0.35em] mb-1"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  {product.priceDelivery && product.priceDelivery !== product.priceLocal ? "Precio local" : "Precio"}
                </p>
                <span
                  className="text-[#C8102E] text-4xl font-bold tabular-nums"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  ${product.priceLocal.toLocaleString("es-CL")}
                </span>
              </div>
              {product.priceDelivery && product.priceDelivery !== product.priceLocal && (
                <div className="text-right">
                  <p
                    className="text-[#6B6660] text-[10px] uppercase tracking-[0.35em] mb-1"
                    style={{ fontFamily: "var(--font-space-mono)" }}
                  >
                    Delivery
                  </p>
                  <span
                    className="text-[#6B6660] text-2xl tabular-nums"
                    style={{ fontFamily: "var(--font-space-mono)" }}
                  >
                    ${product.priceDelivery.toLocaleString("es-CL")}
                  </span>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
