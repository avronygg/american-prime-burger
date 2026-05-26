"use client";

import Image from "next/image";
import type { Product } from "@prisma/client";

export default function ProductCard({ product }: { product: Product }) {
  const price = product.priceDelivery ?? product.priceLocal;

  function openModal() {
    window.dispatchEvent(new CustomEvent("apb:openProduct", { detail: product }));
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={openModal}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") openModal(); }}
      className="group relative bg-[#1A1A1A] flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1 active:scale-[0.985] h-full cursor-pointer apb-focus-ring"
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
            <span className="text-[#2a2a2a] text-4xl uppercase select-none" style={{ fontFamily: "var(--font-anton)" }}>
              APB
            </span>
          </div>
        )}

        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-[#E4A82C] text-[#0F0F0F] text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 font-bold" style={{ fontFamily: "var(--font-space-mono)" }}>
              ¡Nueva!
            </span>
          )}
          {!product.available && (
            <span className="bg-[#0F0F0F]/80 text-[#6B6660] text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 border border-[#2a2a2a]" style={{ fontFamily: "var(--font-space-mono)" }}>
              Agotado
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3 md:p-4 gap-2 min-h-[120px]">
        <h3 className="text-[#F5EFE6] uppercase leading-tight text-lg md:text-xl" style={{ fontFamily: "var(--font-anton)" }}>
          {product.name}
        </h3>
        <p className="text-[#6B6660] text-xs md:text-[13px] leading-relaxed flex-1 line-clamp-3" style={{ fontFamily: "var(--font-manrope)" }}>
          {product.description}
        </p>
        <div className="pt-2 mt-auto border-t border-[#2a2a2a] flex items-center justify-between gap-2">
          <span className="text-[#F5EFE6] text-xl md:text-2xl tabular-nums" style={{ fontFamily: "var(--font-anton)" }}>
            ${price.toLocaleString("es-CL")}
          </span>
          <span className="text-[#6B6660] text-[10px] uppercase tracking-wide group-hover:text-[#C8102E] transition-colors" style={{ fontFamily: "var(--font-space-mono)" }}>
            Ver más <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C8102E] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </div>
  );
}
