import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pedir delivery — American Prime Burger",
  description: "American Prime Burger ya llega directo a tu casa. Pide por PedidosYa, Uber Eats o Rappi. Delivery en Providencia, Santiago.",
};

const PLATFORMS = [
  {
    name: "PedidosYa",
    logo: "/images/logos/pedidosya.svg",
    pitch: "Promos frecuentes · Delivery rápido",
    href: "https://www.pedidosya.cl/restaurantes/santiago/american-prime-burger-7fb747dc-ec48-4538-a56b-d3640984573c-menu",
  },
  {
    name: "Uber Eats",
    logo: "/images/logos/ubereats.svg",
    pitch: "Tracking en vivo · Entrega en minutos",
    href: "https://www.ubereats.com/cl/store/american-prime-burger/owquGf-IVlyZitym0aaxAw?diningMode=DELIVERY",
  },
  {
    name: "Rappi",
    logo: "/images/logos/rappi.png",
    pitch: "Pide con Rappi · Directo a tu puerta",
    href: "https://www.rappi.cl/restaurantes/delivery/74603-american-prime-burger",
  },
];

export default function PedirPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] flex flex-col items-center px-4 py-10 md:py-16 md:justify-center">

      {/* USA flag top stripe */}
      <div className="fixed top-0 left-0 right-0 flex h-[5px] z-20">
        <div className="w-8 bg-[#1B3A6B] shrink-0 flex items-center justify-center">
          <span className="text-[#F5EFE6] text-[4px] leading-none">★</span>
        </div>
        <div
          className="flex-1"
          style={{ background: "repeating-linear-gradient(90deg, #C8102E 0px, #C8102E 20px, #F5EFE6 20px, #F5EFE6 40px)" }}
        />
      </div>

      <div className="w-full max-w-lg flex flex-col items-center gap-7 md:gap-10 mt-2">

        {/* Logo */}
        <Link href="/" className="block mt-2">
          <Image
            src="/images/logo-white.png"
            alt="American Prime Burger"
            width={240}
            height={72}
            className="h-16 md:h-20 w-auto object-contain"
            priority
          />
        </Link>

        {/* Headline */}
        <div className="text-center px-2">
          <h1
            className="text-[#F5EFE6] uppercase leading-[0.95] mb-3"
            style={{
              fontFamily: "var(--font-anton)",
              fontSize: "clamp(2.8rem, 14vw, 5rem)",
            }}
          >
            Ya llegamos<br />
            directo a{" "}
            <span className="text-[#C8102E]">tu casa</span>
          </h1>
          <p
            className="text-[#6B6660] text-sm md:text-base leading-relaxed"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Elige tu plataforma favorita y pide en un par de clics.
          </p>
        </div>

        {/* Platform cards */}
        <div className="w-full flex flex-col gap-3 md:gap-4">
          {PLATFORMS.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-5 bg-[#1A1A1A] border border-[#222] px-6 py-6 md:px-8 md:py-8 hover:border-[#C8102E]/60 hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98]"
              style={{ boxShadow: "4px 4px 0 #C8102E" }}
            >
              {/* Logo */}
              <div className="shrink-0 w-28 md:w-36 flex items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.logo}
                  alt={p.name}
                  className="h-9 md:h-11 w-auto max-w-full object-contain"
                />
              </div>

              {/* Divider */}
              <div className="w-px self-stretch bg-[#2a2a2a] shrink-0" />

              {/* Pitch + CTA */}
              <div className="flex-1 min-w-0">
                <p
                  className="text-[#6B6660] text-xs md:text-sm leading-relaxed mb-3"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  {p.pitch}
                </p>
                <div
                  className="inline-flex items-center gap-2 bg-[#C8102E] text-[#F5EFE6] px-4 py-2 md:px-5 md:py-2.5 text-[11px] md:text-xs uppercase tracking-[0.2em] font-bold group-hover:bg-[#8B0A1F] transition-colors"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  Pedir ahora
                  <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1">→</span>
                </div>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#C8102E] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          ))}
        </div>

        {/* Badge */}
        <div
          className="flex items-center gap-2 border border-[#C8102E]/30 px-4 py-2"
          style={{ fontFamily: "var(--font-space-mono)" }}
        >
          <span className="text-[#C8102E] text-[10px]">★</span>
          <span className="text-[#6B6660] text-[10px] uppercase tracking-[0.25em]">
            Carne 100% Angus Americano
          </span>
          <span className="text-[#C8102E] text-[10px]">★</span>
        </div>

        {/* Footer */}
        <p
          className="text-[#2a2a2a] text-[10px] uppercase tracking-widest text-center pb-2"
          style={{ fontFamily: "var(--font-space-mono)" }}
        >
          Regimiento Cazadores 1186, Local 3 · Providencia
        </p>

      </div>
    </main>
  );
}
