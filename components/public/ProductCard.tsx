"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { Product } from "@prisma/client";

type Ingredient = { name: string; grams?: number };

export default function ProductCard({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const price = product.priceDelivery ?? product.priceLocal;

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const ingredients = product.ingredients
    ? (product.ingredients as Ingredient[])
    : [];

  return (
    <>
      {/* ── Card ── */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
        className="group relative bg-[#1A1A1A] flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1 h-full cursor-pointer"
        style={{ boxShadow: "3px 3px 0 #C8102E" }}
      >
        {/* Image */}
        <div className="relative w-full aspect-square overflow-hidden bg-[#111] shrink-0">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-[#2a2a2a] text-4xl uppercase select-none"
                style={{ fontFamily: "var(--font-anton)" }}
              >
                APB
              </span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <span
                className="bg-[#E4A82C] text-[#0F0F0F] text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 font-bold"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                ¡Nueva!
              </span>
            )}
            {!product.available && (
              <span
                className="bg-[#0F0F0F]/80 text-[#6B6660] text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 border border-[#2a2a2a]"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                Agotado
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-3 md:p-4 gap-2 min-h-[120px]">
          <h3
            className="text-[#F5EFE6] uppercase leading-tight text-lg md:text-xl"
            style={{ fontFamily: "var(--font-anton)" }}
          >
            {product.name}
          </h3>

          <p
            className="text-[#6B6660] text-xs md:text-[13px] leading-relaxed flex-1 line-clamp-3"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {product.description}
          </p>

          <div className="pt-2 mt-auto border-t border-[#2a2a2a] flex items-center justify-between gap-2">
            <span
              className="text-[#C8102E] text-base md:text-lg font-bold tabular-nums"
              style={{ fontFamily: "var(--font-space-mono)" }}
            >
              ${price.toLocaleString("es-CL")}
            </span>
            {product.priceDelivery && product.priceDelivery !== product.priceLocal && (
              <span
                className="text-[#6B6660] text-[11px] uppercase tracking-wide"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                Del. ${product.priceDelivery.toLocaleString("es-CL")}
              </span>
            )}
          </div>
        </div>

        {/* Hover accent */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C8102E] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </div>

      {/* ── Modal ── */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
          onClick={() => setOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#0F0F0F]/85 backdrop-blur-sm" />

          {/* Panel */}
          <div
            className="relative w-full md:max-w-lg bg-[#111] border border-[#1A1A1A] overflow-y-auto max-h-[92dvh] md:max-h-[85vh]"
            style={{ boxShadow: "5px 5px 0 #C8102E" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-[#0F0F0F] border border-[#2a2a2a] text-[#6B6660] hover:text-[#F5EFE6] hover:border-[#C8102E] transition-colors text-sm"
              aria-label="Cerrar"
            >
              ✕
            </button>

            {/* Image */}
            {product.image && (
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 512px"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#111] to-transparent" />
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                {product.isNew && (
                  <span
                    className="bg-[#E4A82C] text-[#0F0F0F] text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 font-bold"
                    style={{ fontFamily: "var(--font-space-mono)" }}
                  >
                    ¡Nueva!
                  </span>
                )}
                {!product.available && (
                  <span
                    className="bg-[#1A1A1A] text-[#6B6660] text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 border border-[#2a2a2a]"
                    style={{ fontFamily: "var(--font-space-mono)" }}
                  >
                    Agotado
                  </span>
                )}
              </div>

              {/* Name */}
              <h2
                className="text-[#F5EFE6] text-[clamp(2rem,6vw,2.8rem)] uppercase leading-none mb-3"
                style={{ fontFamily: "var(--font-anton)" }}
              >
                {product.name}
              </h2>

              {/* Description */}
              {product.description && (
                <p
                  className="text-[#6B6660] text-sm md:text-base leading-relaxed mb-5"
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
                  <ul className="flex flex-col gap-1">
                    {ingredients.map((ing, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between border-b border-[#1A1A1A] py-1.5"
                      >
                        <span
                          className="text-[#F5EFE6] text-sm"
                          style={{ fontFamily: "var(--font-manrope)" }}
                        >
                          {ing.name}
                        </span>
                        {ing.grams && (
                          <span
                            className="text-[#6B6660] text-xs tabular-nums"
                            style={{ fontFamily: "var(--font-space-mono)" }}
                          >
                            {ing.grams}g
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
                    className="text-[#C8102E] text-[10px] uppercase tracking-[0.35em] mb-1"
                    style={{ fontFamily: "var(--font-space-mono)" }}
                  >
                    {product.priceDelivery && product.priceDelivery !== product.priceLocal
                      ? "Precio local"
                      : "Precio"}
                  </p>
                  <span
                    className="text-[#F5EFE6] text-3xl font-bold tabular-nums"
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
                      className="text-[#6B6660] text-xl tabular-nums"
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
      )}
    </>
  );
}
