import type { Product } from "@prisma/client";

export default function DrinkCard({ product }: { product: Product }) {
  const price = product.priceDelivery ?? product.priceLocal;

  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#1A1A1A] py-4 group hover:border-[#C8102E] transition-colors duration-200">
      <div className="flex flex-col gap-0.5 min-w-0">
        <h3
          className="text-[#F5EFE6] uppercase text-sm md:text-base leading-tight truncate"
          style={{ fontFamily: "var(--font-anton)" }}
        >
          {product.name}
        </h3>
        <p
          className="text-[#6B6660] text-[11px] leading-snug line-clamp-1"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          {product.description}
        </p>
      </div>
      <span
        className="text-[#C8102E] text-sm font-bold tabular-nums shrink-0"
        style={{ fontFamily: "var(--font-space-mono)" }}
      >
        ${price.toLocaleString("es-CL")}
      </span>
    </div>
  );
}
