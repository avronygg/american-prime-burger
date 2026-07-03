import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pedir delivery — American Prime Burger",
  description: "Pide American Prime Burger a domicilio por PedidosYa, Uber Eats o Rappi. Delivery en Providencia, Santiago.",
};

const PLATFORMS = [
  {
    name: "PedidosYa",
    logo: "/images/logos/pedidosya.svg",
    pitch: "Promos frecuentes · Delivery rápido en Providencia",
    href: "https://www.pedidosya.cl/restaurantes/santiago/american-prime-burger-7fb747dc-ec48-4538-a56b-d3640984573c-menu",
    logoHeight: "h-8",
  },
  {
    name: "Uber Eats",
    logo: "/images/logos/ubereats.svg",
    pitch: "Tracking en vivo · Entrega en minutos",
    href: "https://www.ubereats.com/cl/store/american-prime-burger/owquGf-IVlyZitym0aaxAw?diningMode=DELIVERY",
    logoHeight: "h-7",
  },
  {
    name: "Rappi",
    logo: "/images/logos/rappi.png",
    pitch: "Pide con Rappi · Directo a tu puerta",
    href: "https://www.rappi.cl/restaurantes/delivery/74603-american-prime-burger",
    logoHeight: "h-8",
  },
];

export default function PedirPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] flex flex-col items-center justify-center px-5 py-12">

      {/* USA flag top stripe */}
      <div className="fixed top-0 left-0 right-0 flex h-[4px] z-20">
        <div className="w-7 bg-[#1B3A6B] shrink-0" />
        <div
          className="flex-1"
          style={{ background: "repeating-linear-gradient(90deg, #C8102E 0px, #C8102E 18px, #F5EFE6 18px, #F5EFE6 36px)" }}
        />
      </div>

      <div className="w-full max-w-sm flex flex-col items-center gap-8">

        {/* Logo */}
        <Link href="/" className="block">
          <Image
            src="/images/logo-white.png"
            alt="American Prime Burger"
            width={200}
            height={60}
            className="h-16 w-auto object-contain"
            priority
          />
        </Link>

        {/* Headline */}
        <div className="text-center">
          <h1
            className="text-[#F5EFE6] text-[clamp(2.2rem,10vw,3rem)] uppercase leading-none mb-2"
            style={{ fontFamily: "var(--font-anton)" }}
          >
            Pide a{" "}
            <span className="text-[#C8102E]">domicilio</span>
          </h1>
          <p
            className="text-[#6B6660] text-sm"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Elige tu plataforma favorita
          </p>
        </div>

        {/* Platform cards */}
        <div className="w-full flex flex-col gap-3">
          {PLATFORMS.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 bg-[#1A1A1A] border border-[#222] px-5 py-4 hover:border-[#C8102E]/60 transition-all duration-200 active:scale-[0.98]"
              style={{ boxShadow: "3px 3px 0 #C8102E" }}
            >
              {/* Logo */}
              <div className="w-24 shrink-0 flex items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.logo}
                  alt={p.name}
                  className={`${p.logoHeight} w-auto max-w-[90px] object-contain`}
                />
              </div>

              {/* Pitch */}
              <p
                className="text-[#6B6660] text-xs leading-relaxed flex-1"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {p.pitch}
              </p>

              {/* Arrow */}
              <span className="text-[#C8102E] shrink-0 inline-block transition-transform duration-200 ease-out group-hover:translate-x-1">
                →
              </span>
            </a>
          ))}
        </div>

        {/* Footer */}
        <p
          className="text-[#2a2a2a] text-[10px] uppercase tracking-widest text-center"
          style={{ fontFamily: "var(--font-space-mono)" }}
        >
          Regimiento Cazadores 1186, Local 3 · Providencia
        </p>

      </div>
    </main>
  );
}
