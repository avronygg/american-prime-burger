import FadeIn from "./FadeIn";

const PLATFORMS = [
  {
    name: "PedidosYa",
    pitch: "Pídela y paga con app. Promos frecuentes y delivery rápido en Providencia.",
    href: "https://www.pedidosya.cl/restaurantes/santiago/american-prime-burger-7fb747dc-ec48-4538-a56b-d3640984573c-menu",
  },
  {
    name: "Uber Eats",
    pitch: "Tracking en vivo del repartidor y entrega en minutos a la puerta.",
    href: "https://www.ubereats.com/cl/store/american-prime-burger/owquGf-IVlyZitym0aaxAw?diningMode=DELIVERY",
  },
];

export default function DeliverySection() {
  return (
    <section id="delivery" className="bg-[#0F0F0F] py-16 md:py-24 border-t border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-5 md:px-10">

        {/* ── Heading ── */}
        <FadeIn className="mb-10 md:mb-14 max-w-2xl">
          <p
            className="text-[#C8102E] text-[10px] uppercase tracking-[0.4em] mb-3"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            ★ Delivery
          </p>
          <h2
            className="text-[#F5EFE6] text-[clamp(2.4rem,6vw,4.5rem)] uppercase leading-[0.95] mb-4"
            style={{ fontFamily: "var(--font-anton)" }}
          >
            Pide a<br />
            <span className="text-[#C8102E]">domicilio</span>
          </h2>
          <p
            className="text-[#6B6660] text-sm md:text-base leading-relaxed"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Llevamos la American Prime hasta tu puerta. Elige tu plataforma favorita
            y pídela en un par de clics.
          </p>
        </FadeIn>

        {/* ── Two delivery cards ── */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {PLATFORMS.map((p, i) => (
            <FadeIn key={p.name} delay={i * 100} direction="up" className="h-full">
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-[#1A1A1A] p-7 md:p-9 flex flex-col gap-4 h-full border border-[#222] transition-transform duration-300 hover:-translate-y-1 active:scale-[0.99] apb-focus-ring"
                style={{ boxShadow: "4px 4px 0 #C8102E" }}
              >
                <p
                  className="text-[#6B6660] text-[10px] uppercase tracking-[0.35em]"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  Plataforma
                </p>

                <h3
                  className="text-[#F5EFE6] text-3xl md:text-4xl uppercase leading-none"
                  style={{ fontFamily: "var(--font-anton)" }}
                >
                  {p.name}
                </h3>

                <p
                  className="text-[#A09890] text-sm leading-relaxed flex-1"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  {p.pitch}
                </p>

                <div
                  className="inline-flex items-center gap-2 bg-[#C8102E] text-[#F5EFE6] px-5 py-3 text-xs uppercase tracking-[0.25em] font-bold self-start group-hover:bg-[#8B0A1F] transition-colors mt-2"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  Pedir ahora{" "}
                  <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1">
                    →
                  </span>
                </div>

                {/* Red bottom accent that draws on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#C8102E] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
