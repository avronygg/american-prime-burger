import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";

export default async function NuevoProductoPage() {
  const categorias = await prisma.category.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="max-w-xl space-y-8">
      <div>
        <p
          className="text-[#6B6660] text-[11px] uppercase tracking-widest mb-1"
          style={{ fontFamily: "var(--font-space-mono, monospace)" }}
        >
          Productos / Nuevo
        </p>
        <h1 className="text-2xl font-bold text-[#F5EFE6] uppercase tracking-wide">
          Agregar producto
        </h1>
      </div>
      <ProductForm categorias={categorias} />
    </div>
  );
}
