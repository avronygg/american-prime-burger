import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#0F0F0F] flex items-center overflow-hidden">
      {/* Left red accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#C8102E] z-10" />

      {/* USA flag stripe — top decoration: blue canton ★ + repeating red/white stripes */}
      <div className="absolute top-0 left-0 right-0 flex h-[5px] z-20">
        <div className="w-8 bg-[#1B3A6B] shrink-0 flex items-center justify-center">
          <span className="text-[#F5EFE6] text-[4px] leading-none">★</span>
        </div>
        <div
          className="flex-1"
          style={{ background: "repeating-linear-gradient(90deg, #C8102E 0px, #C8102E 20px, #F5EFE6 20px, #F5EFE6 40px)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full pt-20 pb-12 md:pt-24 md:pb-16 grid md:grid-cols-2 gap-8 md:gap-16 items-center">

        {/* ── LEFT: Copy ── */}
        <div className="relative z-10">

          {/* Logo — hidden on mobile (nav already shows it) */}
          <div className="hidden md:block mb-5 md:mb-8 animate-fade-up">
            <Image
              src="/images/logo-white.png"
              alt="American Prime Burger"
              width={320}
              height={100}
              className="h-14 md:h-28 w-auto object-contain"
              priority
            />
          </div>

          {/* Pre-headline tag — card oscura con sombra dura roja */}
          <div
            className="inline-block bg-[#1A1A1A] px-4 py-3 mb-5 md:mb-6 max-w-lg animate-fade-up"
            style={{ boxShadow: "3px 3px 0 #C8102E" }}
          >
            <p
              className="text-[#F5EFE6] text-sm md:text-base leading-snug"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              ¡Llegó la mejor hamburguesa directo desde{" "}
              <span className="text-[#C8102E] font-bold uppercase tracking-wide">
                Estados Unidos
              </span>{" "}
              con el auténtico sabor americano!
            </p>
          </div>

          {/* Title — 3 equal lines */}
          <h1
            className="uppercase leading-[1.15] md:leading-[1.05] mb-4 md:mb-6 animate-fade-up delay-100"
            style={{ fontFamily: "var(--font-anton)" }}
          >
            <span className="block text-[#F5EFE6] text-[clamp(4rem,12vw,7.5rem)]">American</span>
            <span className="block text-[#C8102E]  text-[clamp(4rem,12vw,7.5rem)]">Prime</span>
            <span className="block text-[#F5EFE6]  text-[clamp(4rem,12vw,7.5rem)]">Burger</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-[#6B6660] text-sm md:text-base leading-relaxed mb-4 md:mb-6 max-w-md animate-fade-up delay-150"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Carne Angus Americano 100% en todas nuestras preparaciones. Hamburguesas y Sándwiches Ahumados.
          </p>

          {/* Quality seals */}
          <div className="flex flex-wrap gap-2 mb-6 md:mb-8 animate-fade-up delay-200">
            {[
              "★ Carne 100% Angus americano",
              "♨ Ahumado 12 a 16 horas",
            ].map((seal) => (
              <span
                key={seal}
                className="border border-[#C8102E]/60 text-[#F5EFE6] text-[10px] md:text-[11px] uppercase tracking-[0.2em] px-3 py-1.5"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                {seal}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 md:gap-4 animate-fade-up delay-300">
            <a
              href="#menu"
              className="bg-[#C8102E] text-[#F5EFE6] px-7 py-3.5 md:px-8 md:py-4 text-sm uppercase tracking-[0.25em] font-bold hover:bg-[#8B0A1F] transition-all duration-200 ease-out active:scale-[0.97] apb-focus-ring"
              style={{ fontFamily: "var(--font-space-mono)" }}
            >
              Ver menú
            </a>
            <a
              href="https://linktr.ee/AmericanPrimeBurgerDelivery"
              target="_blank"
              rel="noopener noreferrer"
              className="group text-[#F5EFE6] text-sm uppercase tracking-[0.25em] hover:text-[#C8102E] transition-colors flex items-center gap-2 apb-focus-ring"
              style={{ fontFamily: "var(--font-space-mono)" }}
            >
              Pedir delivery <span className="text-[#C8102E] inline-block transition-transform duration-200 ease-out group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

        {/* ── RIGHT: Photo ── */}
        <div className="relative animate-slide-right delay-200">
          <div className="absolute inset-0 translate-x-3 translate-y-3 md:translate-x-5 md:translate-y-5 bg-[#C8102E]" />

          <div className="relative w-full aspect-square md:aspect-[4/5] overflow-hidden">
            <Image
              src="/images/hero.png"
              alt="American Prime Burger — las mejores hamburguesas de Providencia"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 768px) 90vw, 50vw"
            />
            <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-[#0F0F0F]/50 to-transparent" />
          </div>
        </div>

      </div>

    </section>
  );
}
