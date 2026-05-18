import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";
import { notFound } from "next/navigation";

export default async function EditarProductoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [producto, categorias] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { order: "asc" } }),
  ]);

  if (!producto) notFound();

  return (
    <div className="max-w-xl space-y-8">
      <div>
        <p
          className="text-[#6B6660] text-[11px] uppercase tracking-widest mb-1"
          style={{ fontFamily: "var(--font-space-mono, monospace)" }}
        >
          Productos / Editar
        </p>
        <h1 className="text-2xl font-bold text-[#F5EFE6] uppercase tracking-wide">
          {producto.name}
        </h1>
      </div>
      <ProductForm categorias={categorias} producto={producto} />
    </div>
  );
}
