import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = "https://americanprimeburger.cl";
const WHATSAPP_HREF = "https://wa.me/56971479783?text=" + encodeURIComponent("Hola! Quiero hacer un pedido de delivery 🍔");

// Comunas cercanas a Providencia; la cobertura exacta depende de cada app.
const COMUNAS = ["Providencia", "Ñuñoa", "Las Condes", "Santiago Centro", "Vitacura"];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${siteUrl}/` },
    { "@type": "ListItem", position: 2, name: "Delivery", item: `${siteUrl}/pedir` },
  ],
};

export const metadata: Metadata = {
  title: "Delivery de hamburguesas en Providencia | American Prime Burger",
  description: "Delivery de hamburguesas Angus y sándwiches ahumados en Providencia, Ñuñoa y Las Condes. Pide por PedidosYa, Uber Eats, Rappi o WhatsApp. Todos los días 11:00–21:30.",
  alternates: { canonical: "/pedir" },
  robots: { index: true, follow: true },
  openGraph: {
    url: "/pedir",
    title: "Delivery de hamburguesas en Providencia | American Prime Burger",
    description: "Pide American Prime Burger por PedidosYa, Uber Eats, Rappi o WhatsApp. Delivery en Providencia y comunas cercanas.",
  },
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
    logo: "/images/logos/rappi.webp",
    pitch: "Pide con Rappi · Directo a tu puerta",
    href: "https://www.rappi.cl/restaurantes/delivery/74603-american-prime-burger",
  },
];

export default function PedirPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] flex flex-col items-center px-4 py-10 md:py-16 md:justify-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />

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
              fontSize: "clamp(2.4rem, 11vw, 4.5rem)",
            }}
          >
            Delivery de<br />
            hamburguesas en{" "}
            <span className="text-[#C8102E]">Providencia</span>
          </h1>
          <p
            className="text-[#6B6660] text-sm md:text-base leading-relaxed"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Ya llegamos directo a tu casa. Elige tu plataforma favorita y pide en un par de clics.
          </p>
        </div>

        {/* Rating + hours */}
        <div
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-space-mono)" }}
        >
          <span className="text-[#F5EFE6]">
            <span className="text-[#E4A82C]">★</span> 4.8 en Google
          </span>
          <span className="text-[#2a2a2a]" aria-hidden="true">|</span>
          <span className="text-[#F5EFE6]">Todos los días · 11:00 – 21:30</span>
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

          {/* WhatsApp */}
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 bg-[#25D366] text-[#0F0F0F] px-6 py-4 text-xs md:text-sm uppercase tracking-[0.2em] font-bold hover:brightness-110 transition-all duration-200 active:scale-[0.98] apb-focus-ring"
            style={{ fontFamily: "var(--font-space-mono)", boxShadow: "4px 4px 0 #C8102E" }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Pedir por WhatsApp
          </a>
        </div>

        {/* Coverage */}
        <div className="w-full text-center px-2">
          <h2
            className="text-[#F5EFE6] text-2xl uppercase mb-3"
            style={{ fontFamily: "var(--font-anton)" }}
          >
            Zona de <span className="text-[#C8102E]">delivery</span>
          </h2>
          <p
            className="text-[#6B6660] text-sm leading-relaxed mb-4"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Despachamos hamburguesas Angus y sándwiches ahumados desde Providencia a comunas cercanas.
            La cobertura exacta depende de cada app.
          </p>
          <ul className="flex flex-wrap justify-center gap-2" style={{ fontFamily: "var(--font-space-mono)" }}>
            {COMUNAS.map((c) => (
              <li
                key={c}
                className="border border-[#2a2a2a] text-[#F5EFE6] text-[10px] uppercase tracking-[0.2em] px-3 py-1.5"
              >
                {c}
              </li>
            ))}
          </ul>
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
