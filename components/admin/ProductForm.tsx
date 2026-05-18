"use client";

import { saveProduct } from "@/app/admin/productos/actions";
import type { Category, Product } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useTransition } from "react";

interface Props {
  categorias: Category[];
  producto?: Product | null;
}

export default function ProductForm({ categorias, producto }: Props) {
  const [imageUrl, setImageUrl] = useState<string>(producto?.image ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [pending, startTransition] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError("");
    setUploading(true);

    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: form });
    const data = await res.json();

    setUploading(false);

    if (!res.ok) {
      setUploadError(data.error ?? "Error al subir la imagen");
      return;
    }
    setImageUrl(data.url);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    form.set("image", imageUrl);
    startTransition(() => saveProduct(form));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {producto && <input type="hidden" name="id" value={producto.id} />}

      {/* Image upload */}
      <div>
        <label
          className="block text-[#6B6660] text-xs uppercase tracking-widest mb-1.5"
          style={{ fontFamily: "var(--font-space-mono, monospace)" }}
        >
          Imagen del producto
        </label>

        <div className="flex items-start gap-4">
          {/* Preview */}
          <div
            className="w-20 h-20 shrink-0 bg-[#1A1A1A] border border-[#2a2a2a] flex items-center justify-center cursor-pointer hover:border-[#C8102E] transition-colors overflow-hidden"
            onClick={() => fileRef.current?.click()}
            title="Haz clic para cambiar la imagen"
          >
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="Preview"
                width={80}
                height={80}
                className="w-full h-full object-cover"
                unoptimized
              />
            ) : (
              <span className="text-[#2a2a2a] text-2xl select-none">+</span>
            )}
          </div>

          <div className="flex-1 space-y-2">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="w-full bg-[#1A1A1A] border border-[#2a2a2a] text-[#6B6660] px-4 py-2.5 text-[11px] uppercase tracking-widest hover:border-[#C8102E] hover:text-[#F5EFE6] transition-colors disabled:opacity-40"
              style={{ fontFamily: "var(--font-space-mono, monospace)" }}
            >
              {uploading ? "Subiendo…" : imageUrl ? "Cambiar imagen" : "Subir imagen"}
            </button>
            {uploadError && (
              <p className="text-[11px] text-[#C8102E]" style={{ fontFamily: "var(--font-space-mono, monospace)" }}>
                {uploadError}
              </p>
            )}
            {imageUrl && !uploading && (
              <p className="text-[10px] text-[#6B6660] truncate" style={{ fontFamily: "var(--font-space-mono, monospace)" }}>
                {imageUrl}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Category */}
      <div>
        <label
          className="block text-[#6B6660] text-xs uppercase tracking-widest mb-1.5"
          style={{ fontFamily: "var(--font-space-mono, monospace)" }}
        >
          Categoría
        </label>
        <select
          name="categoryId"
          required
          defaultValue={producto?.categoryId ?? ""}
          className="w-full bg-[#1A1A1A] border border-[#2a2a2a] text-[#F5EFE6] px-4 py-3 text-sm focus:outline-none focus:border-[#C8102E] transition-colors"
        >
          <option value="" disabled>Seleccionar categoría</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Name */}
      <div>
        <label
          className="block text-[#6B6660] text-xs uppercase tracking-widest mb-1.5"
          style={{ fontFamily: "var(--font-space-mono, monospace)" }}
        >
          Nombre del producto
        </label>
        <input
          name="name"
          type="text"
          required
          defaultValue={producto?.name ?? ""}
          className="w-full bg-[#1A1A1A] border border-[#2a2a2a] text-[#F5EFE6] px-4 py-3 text-sm focus:outline-none focus:border-[#C8102E] transition-colors"
        />
      </div>

      {/* Description */}
      <div>
        <label
          className="block text-[#6B6660] text-xs uppercase tracking-widest mb-1.5"
          style={{ fontFamily: "var(--font-space-mono, monospace)" }}
        >
          Descripción
        </label>
        <textarea
          name="description"
          required
          rows={3}
          defaultValue={producto?.description ?? ""}
          className="w-full bg-[#1A1A1A] border border-[#2a2a2a] text-[#F5EFE6] px-4 py-3 text-sm focus:outline-none focus:border-[#C8102E] transition-colors resize-none"
        />
      </div>

      {/* Prices */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            className="block text-[#6B6660] text-xs uppercase tracking-widest mb-1.5"
            style={{ fontFamily: "var(--font-space-mono, monospace)" }}
          >
            Precio local ($)
          </label>
          <input
            name="priceLocal"
            type="number"
            required
            min={0}
            defaultValue={producto?.priceLocal ?? ""}
            className="w-full bg-[#1A1A1A] border border-[#2a2a2a] text-[#F5EFE6] px-4 py-3 text-sm focus:outline-none focus:border-[#C8102E] transition-colors"
          />
        </div>
        <div>
          <label
            className="block text-[#6B6660] text-xs uppercase tracking-widest mb-1.5"
            style={{ fontFamily: "var(--font-space-mono, monospace)" }}
          >
            Precio delivery ($)
          </label>
          <input
            name="priceDelivery"
            type="number"
            min={0}
            defaultValue={producto?.priceDelivery ?? ""}
            placeholder="Opcional"
            className="w-full bg-[#1A1A1A] border border-[#2a2a2a] text-[#F5EFE6] px-4 py-3 text-sm focus:outline-none focus:border-[#C8102E] transition-colors placeholder:text-[#3a3a3a]"
          />
        </div>
      </div>

      {/* Order */}
      <div>
        <label
          className="block text-[#6B6660] text-xs uppercase tracking-widest mb-1.5"
          style={{ fontFamily: "var(--font-space-mono, monospace)" }}
        >
          Orden (dentro de la categoría)
        </label>
        <input
          name="order"
          type="number"
          min={0}
          defaultValue={producto?.order ?? 0}
          className="w-full bg-[#1A1A1A] border border-[#2a2a2a] text-[#F5EFE6] px-4 py-3 text-sm focus:outline-none focus:border-[#C8102E] transition-colors"
        />
      </div>

      {/* Toggles */}
      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            name="available"
            type="checkbox"
            defaultChecked={producto?.available ?? true}
            className="accent-[#C8102E] w-4 h-4"
          />
          <span
            className="text-xs uppercase tracking-widest text-[#F5EFE6]"
            style={{ fontFamily: "var(--font-space-mono, monospace)" }}
          >
            Disponible
          </span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            name="isNew"
            type="checkbox"
            defaultChecked={producto?.isNew ?? false}
            className="accent-[#C8102E] w-4 h-4"
          />
          <span
            className="text-xs uppercase tracking-widest text-[#F5EFE6]"
            style={{ fontFamily: "var(--font-space-mono, monospace)" }}
          >
            Marcar como nuevo
          </span>
        </label>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={pending || uploading}
          className="bg-[#C8102E] text-[#F5EFE6] px-6 py-3 text-[11px] uppercase tracking-widest font-bold hover:bg-[#8B0A1F] transition-colors disabled:opacity-40"
          style={{ fontFamily: "var(--font-space-mono, monospace)" }}
        >
          {pending ? "Guardando…" : producto ? "Guardar cambios" : "Crear producto"}
        </button>
        <Link
          href="/admin/productos"
          className="border border-[#2a2a2a] text-[#6B6660] px-6 py-3 text-[11px] uppercase tracking-widest hover:border-[#F5EFE6] hover:text-[#F5EFE6] transition-colors"
          style={{ fontFamily: "var(--font-space-mono, monospace)" }}
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
