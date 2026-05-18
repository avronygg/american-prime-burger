import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const [total, agotados, nuevos, categorias] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { available: false } }),
    prisma.product.count({ where: { isNew: true } }),
    prisma.category.count({ where: { active: true } }),
  ]);

  const recientes = await prisma.product.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  const stats = [
    { label: "Productos activos",   value: total - agotados, color: "#C8102E" },
    { label: "Agotados",            value: agotados,         color: "#6B6660" },
    { label: "Marcados como nuevo", value: nuevos,           color: "#E4A82C" },
    { label: "Categorías",          value: categorias,       color: "#1B3A6B" },
  ];

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[#6B6660] text-[11px] uppercase tracking-widest mb-1"
             style={{ fontFamily: "var(--font-space-mono, monospace)" }}>
            Panel de control
          </p>
          <h1 className="text-2xl font-bold text-[#F5EFE6] uppercase tracking-wide">
            Dashboard
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

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#0F0F0F] border border-[#1A1A1A] p-5">
            <p
              className="text-4xl font-bold mb-1"
              style={{ color: s.color, fontFamily: "var(--font-space-mono, monospace)" }}
            >
              {s.value}
            </p>
            <p className="text-[#6B6660] text-[10px] uppercase tracking-widest"
               style={{ fontFamily: "var(--font-space-mono, monospace)" }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/admin/productos"
          className="bg-[#0F0F0F] border border-[#1A1A1A] hover:border-[#C8102E] p-5 flex items-center justify-between group transition-colors"
        >
          <div>
            <p className="text-[#F5EFE6] font-medium text-sm mb-1">Ver todos los productos</p>
            <p className="text-[#6B6660] text-[11px]"
               style={{ fontFamily: "var(--font-space-mono, monospace)" }}>
              Editar precios, descripción, disponibilidad
            </p>
          </div>
          <span className="text-[#6B6660] group-hover:text-[#C8102E] transition-colors text-xl">→</span>
        </Link>
        <Link
          href="/admin/productos/nuevo"
          className="bg-[#0F0F0F] border border-[#1A1A1A] hover:border-[#C8102E] p-5 flex items-center justify-between group transition-colors"
        >
          <div>
            <p className="text-[#F5EFE6] font-medium text-sm mb-1">Agregar producto nuevo</p>
            <p className="text-[#6B6660] text-[11px]"
               style={{ fontFamily: "var(--font-space-mono, monospace)" }}>
              Nombre, precio, descripción, categoría
            </p>
          </div>
          <span className="text-[#6B6660] group-hover:text-[#C8102E] transition-colors text-xl">+</span>
        </Link>
      </div>

      {/* Últimos productos */}
      {recientes.length > 0 && (
        <div>
          <p className="text-[#6B6660] text-[11px] uppercase tracking-widest mb-3"
             style={{ fontFamily: "var(--font-space-mono, monospace)" }}>
            Últimos agregados
          </p>
          <div className="border border-[#1A1A1A] divide-y divide-[#1A1A1A]">
            {recientes.map((p) => (
              <div key={p.id} className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-[10px] text-[#6B6660] bg-[#1A1A1A] px-2 py-0.5 uppercase tracking-wide shrink-0"
                        style={{ fontFamily: "var(--font-space-mono, monospace)" }}>
                    {p.category.name}
                  </span>
                  <span className="text-[#F5EFE6] text-sm truncate">{p.name}</span>
                </div>
                <Link
                  href={`/admin/productos/${p.id}`}
                  className="text-[#6B6660] hover:text-[#C8102E] text-xs transition-colors shrink-0 ml-4"
                  style={{ fontFamily: "var(--font-space-mono, monospace)" }}
                >
                  Editar
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
