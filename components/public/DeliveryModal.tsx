"use client";

import { useState, useEffect, useCallback } from "react";

const PLATFORMS = [
  {
    name: "PedidosYa",
    logo: "/images/logos/pedidosya.svg",
    pitch: "Promos frecuentes y delivery rápido en Providencia.",
    href: "https://www.pedidosya.cl/restaurantes/santiago/american-prime-burger-7fb747dc-ec48-4538-a56b-d3640984573c-menu",
  },
  {
    name: "Uber Eats",
    logo: "/images/logos/ubereats.svg",
    pitch: "Tracking en vivo del repartidor y entrega en minutos.",
    href: "https://www.ubereats.com/cl/store/american-prime-burger/owquGf-IVlyZitym0aaxAw?diningMode=DELIVERY",
  },
  {
    name: "Rappi",
    logo: "/images/logos/rappi.webp",
    pitch: "Pide con Rappi y recibe tu pedido directo en la puerta.",
    href: "https://www.rappi.cl/restaurantes/delivery/74603-american-prime-burger",
  },
];

export default function DeliveryModal() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  const close = useCallback(() => {
    setVisible(false);
    setTimeout(() => setOpen(false), 280);
  }, []);

  useEffect(() => {
    const handler = () => {
      setOpen(true);
      requestAnimationFrame(() => setVisible(true));
    };
    window.addEventListener("apb:openDelivery", handler);
    return () => window.removeEventListener("apb:openDelivery", handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6">

      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-[#0F0F0F]/85 backdrop-blur-sm transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
        onClick={close}
      />

      {/* Panel */}
      <div
        className={`relative w-full max-w-lg bg-[#111] flex flex-col max-h-[88dvh] border-t-2 border-[#C8102E] transition-all duration-300 ${
          visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-3"
        }`}
        style={{ boxShadow: "5px 5px 0 #C8102E" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-[#111] border-b border-[#1A1A1A] flex items-center justify-between px-5 py-3 shrink-0">
          <span
            className="text-[#C8102E] text-[9px] uppercase tracking-[0.4em]"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            ★ Pedir delivery
          </span>
          <button
            onClick={close}
            className="w-10 h-10 flex items-center justify-center bg-[#1A1A1A] border border-[#2a2a2a] text-[#6B6660] hover:text-[#F5EFE6] hover:border-[#C8102E] transition-all duration-200 ease-out active:scale-95 cursor-pointer apb-focus-ring"
            aria-label="Cerrar"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 px-5 py-6 md:px-6 flex flex-col gap-4">
          <p
            className="text-[#6B6660] text-sm leading-relaxed mb-2"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Llevamos la American Prime hasta tu puerta. Elige tu plataforma favorita.
          </p>

          {PLATFORMS.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 bg-[#1A1A1A] border border-[#222] p-4 md:p-5 hover:border-[#C8102E]/60 transition-all duration-200 active:scale-[0.99] apb-focus-ring"
              style={{ boxShadow: "3px 3px 0 #C8102E" }}
            >
              {/* Logo */}
              <div className="shrink-0 w-24 h-10 flex items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.logo}
                  alt={p.name}
                  className="h-8 w-auto max-w-[88px] object-contain"
                />
              </div>

              {/* Text */}
              <p
                className="text-[#6B6660] text-xs leading-relaxed flex-1"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {p.pitch}
              </p>

              {/* Arrow */}
              <span className="text-[#C8102E] text-lg shrink-0 inline-block transition-transform duration-200 ease-out group-hover:translate-x-1">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
