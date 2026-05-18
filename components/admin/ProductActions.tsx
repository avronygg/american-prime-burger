"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleProductAvailability, deleteProduct } from "@/app/admin/productos/actions";
import Link from "next/link";

interface Props {
  id: string;
  name: string;
  available: boolean;
}

export default function ProductActions({ id, name, available }: Props) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleToggle() {
    startTransition(async () => {
      await toggleProductAvailability(id, !available);
      router.refresh();
    });
  }

  function handleDelete() {
    if (!confirm(`¿Eliminar "${name}"?\nEsta acción no se puede deshacer.`)) return;
    startTransition(async () => {
      await deleteProduct(id);
      router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-3 shrink-0">
      <button
        onClick={handleToggle}
        disabled={pending}
        className={`text-[11px] uppercase tracking-widest transition-colors disabled:opacity-40 ${
          available
            ? "text-[#6B6660] hover:text-[#E4A82C]"
            : "text-[#E4A82C] hover:text-[#F5EFE6]"
        }`}
        style={{ fontFamily: "var(--font-space-mono, monospace)" }}
      >
        {available ? "Pausar" : "Activar"}
      </button>

      <Link
        href={`/admin/productos/${id}`}
        className="text-[11px] uppercase tracking-widest text-[#6B6660] hover:text-[#F5EFE6] transition-colors"
        style={{ fontFamily: "var(--font-space-mono, monospace)" }}
      >
        Editar
      </Link>

      <button
        onClick={handleDelete}
        disabled={pending}
        className="text-[11px] uppercase tracking-widest text-[#6B6660] hover:text-[#C8102E] transition-colors disabled:opacity-40"
        style={{ fontFamily: "var(--font-space-mono, monospace)" }}
      >
        Eliminar
      </button>
    </div>
  );
}
