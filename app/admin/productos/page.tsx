import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import ProductActions from "@/components/admin/ProductActions";

export const dynamic = "force-dynamic";

export default async function ProductosPage() {
  const [categorias, productos] = await Promise.all([
    prisma.category.findMany({ orderBy: { order: "asc" } }),
    prisma.product.findMany({
      include: { category: true },
      orderBy: [{ category: { order: "asc" } }, { order: "asc" }],
    }),
  ]);

  const total = productos.length;
  const activos = productos.filter((p) => p.available).length;
  const agotados = total - activos;

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p
            className="text-[#6B6660] text-[11px] uppercase tracking-widest mb-1"
            style={{ fontFamily: "var(--font-space-mono, monospace)" }}
          >
            Catálogo
          </p>
          <h1 className="text-2xl font-bold text-[#F5EFE6] uppercase tracking-wide">
            Productos
          </h1>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="bg-[#C8102E] text-[#F5EFE6] px-5 py-2.5 text-[11px] uppercase tracking-widest font-bold hover:bg-[#8B0A1F] transition-colors"
          style={{ fontFamily: "var(--font-space-mono, monospace)" }}
        >
          + Nuevo producto
        </Link>
      </div>

      {/* Summary row */}
      <div className="flex items-center gap-6">
        <span
          className="text-[11px] uppercase tracking-widest text-[#6B6660]"
          style={{ fontFamily: "var(--font-space-mono, monospace)" }}
        >
          <span className="text-[#F5EFE6] font-bold">{total}</span> productos
        </span>
        <span className="text-[#2a2a2a]">·</span>
        <span
          className="text-[11px] uppercase tracking-widest text-[#6B6660]"
          style={{ fontFamily: "var(--font-space-mono, monospace)" }}
        >
          <span className="text-[#C8102E] font-bold">{activos}</span> activos
        </span>
        <span className="text-[#2a2a2a]">·</span>
        <span
          className="text-[11px] uppercase tracking-widest text-[#6B6660]"
          style={{ fontFamily: "var(--font-space-mono, monospace)" }}
        >
          <span className="text-[#6B6660] font-bold">{agotados}</span> agotados
        </span>
      </div>

      {/* Categories */}
      {categorias.map((cat) => {
        const prods = productos.filter((p) => p.categoryId === cat.id);
        if (prods.length === 0) return null;

        return (
          <div key={cat.id}>
            {/* Category header */}
            <div className="flex items-center gap-3 mb-3">
              <h2
                className="text-[11px] uppercase tracking-widest text-[#6B6660]"
                style={{ fontFamily: "var(--font-space-mono, monospace)" }}
              >
                {cat.name}
              </h2>
              <span
                className="text-[10px] text-[#2a2a2a] tabular-nums"
                style={{ fontFamily: "var(--font-space-mono, monospace)" }}
              >
                ({prods.length})
              </span>
              <div className="flex-1 h-px bg-[#1A1A1A]" />
            </div>

            {/* Product rows */}
            <div className="border border-[#1A1A1A] divide-y divide-[#1A1A1A]">
              {prods.map((p) => (
                <div
                  key={p.id}
                  className={`flex items-center gap-4 px-4 py-3 hover:bg-[#0F0F0F] transition-colors ${
                    !p.available ? "opacity-50" : ""
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="w-12 h-12 shrink-0 bg-[#1A1A1A] overflow-hidden">
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={p.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#2a2a2a] text-xs">
                        —
                      </div>
                    )}
                  </div>

                  {/* Name + description */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-[#F5EFE6] leading-tight">
                        {p.name}
                      </span>
                      {p.isNew && (
                        <span
                          className="text-[9px] uppercase tracking-widest bg-[#E4A82C] text-[#0F0F0F] px-1.5 py-0.5 font-bold shrink-0"
                          style={{ fontFamily: "var(--font-space-mono, monospace)" }}
                        >
                          Nuevo
                        </span>
                      )}
                      {!p.available && (
                        <span
                          className="text-[9px] uppercase tracking-widest border border-[#6B6660] text-[#6B6660] px-1.5 py-0.5 shrink-0"
                          style={{ fontFamily: "var(--font-space-mono, monospace)" }}
                        >
                          Agotado
                        </span>
                      )}
                    </div>
                    {p.description && (
                      <p className="text-[11px] text-[#6B6660] mt-0.5 line-clamp-1 leading-snug">
                        {p.description}
                      </p>
                    )}
                  </div>

                  {/* Prices */}
                  <div className="shrink-0 text-right hidden sm:block">
                    <p
                      className="text-sm font-bold text-[#F5EFE6] tabular-nums"
                      style={{ fontFamily: "var(--font-space-mono, monospace)" }}
                    >
                      ${p.priceLocal.toLocaleString("es-CL")}
                    </p>
                    {p.priceDelivery && p.priceDelivery !== p.priceLocal && (
                      <p
                        className="text-[10px] text-[#6B6660] tabular-nums"
                        style={{ fontFamily: "var(--font-space-mono, monospace)" }}
                      >
                        Delivery ${p.priceDelivery.toLocaleString("es-CL")}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <ProductActions id={p.id} name={p.name} available={p.available} />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
