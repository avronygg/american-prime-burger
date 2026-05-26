import type { Product } from "@prisma/client";

export default function DrinkCard({ product }: { product: Product }) {
  const price = product.priceDelivery ?? product.priceLocal;

  return (
    <div className="flex items-center justify-between gap-6 border-b border-[#1A1A1A] py-6 md:py-7 group hover:border-[#C8102E] transition-colors duration-200">
      <div className="flex flex-col gap-2 min-w-0">
        <h3
          className="text-[#F5EFE6] uppercase text-2xl md:text-3xl leading-tight"
          style={{ fontFamily: "var(--font-anton)" }}
        >
          {product.name}
        </h3>
        {product.description && (
          <p
            className="text-[#A09890] text-sm md:text-base leading-relaxed"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {product.description}
          </p>
        )}
      </div>
      <span
        className="text-[#F5EFE6] text-2xl md:text-3xl tabular-nums shrink-0"
        style={{ fontFamily: "var(--font-anton)" }}
      >
        ${price.toLocaleString("es-CL")}
      </span>
    </div>
  );
}
