import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#0F0F0F] flex items-center overflow-hidden">
      {/* Left red accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#C8102E] z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full pt-20 pb-16 grid md:grid-cols-2 gap-10 md:gap-16 items-center">

        {/* ── LEFT: Copy — siempre primero en mobile y desktop ── */}
        <div className="relative z-10">
          <p
            className="text-[#C8102E] text-[10px] tracking-[0.5em] uppercase mb-5 animate-fade-up"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            ▪ Providencia · Santiago
          </p>

          <h1
            className="uppercase leading-[0.88] mb-8 animate-fade-up delay-100"
            style={{ fontFamily: "var(--font-anton)" }}
          >
            <span className="block text-[#F5EFE6] text-[clamp(3.2rem,10vw,8rem)]">American</span>
            <span className="block text-[#C8102E]  text-[clamp(3.2rem,10vw,8rem)]">Prime</span>
            <span className="block text-[#F5EFE6] text-[clamp(2rem,6vw,4.8rem)]">Burger</span>
          </h1>

          {/* Stats */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 mb-8 animate-fade-up delay-200">
            {[
              { value: "100%", label: "Angus Americano" },
              { value: "12h",  label: "Ahumado lento"   },
              { value: "4.8★", label: "Google Reviews"  },
            ].map((s) => (
              <div key={s.label} className="flex flex-col">
                <span
                  className="text-[#C8102E] text-lg font-bold leading-none"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  {s.value}
                </span>
                <span
                  className="text-[#6B6660] text-[10px] uppercase tracking-widest mt-0.5"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 animate-fade-up delay-300">
            <a
              href="#menu"
              className="bg-[#C8102E] text-[#F5EFE6] px-7 py-3.5 text-xs uppercase tracking-[0.25em] font-bold hover:bg-[#8B0A1F] transition-colors"
              style={{ fontFamily: "var(--font-space-mono)" }}
            >
              Ver menú
            </a>
            <a
              href="https://linktr.ee/AmericanPrimeBurgerDelivery"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F5EFE6] text-xs uppercase tracking-[0.25em] hover:text-[#C8102E] transition-colors flex items-center gap-2"
              style={{ fontFamily: "var(--font-space-mono)" }}
            >
              Pedir delivery <span className="text-[#C8102E]">→</span>
            </a>
          </div>
        </div>

        {/* ── RIGHT: Photo — segundo siempre ── */}
        <div className="relative animate-slide-right delay-200">
          {/* Hard red shadow */}
          <div className="absolute inset-0 translate-x-3 translate-y-3 md:translate-x-5 md:translate-y-5 bg-[#C8102E]" />

          <div className="relative w-full aspect-[4/5] overflow-hidden">
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

          {/* Floating badge */}
          <div className="absolute -bottom-4 -left-4 bg-[#0F0F0F] border-2 border-[#C8102E] px-4 py-3 z-10">
            <p
              className="text-[#C8102E] text-[9px] uppercase tracking-[0.35em]"
              style={{ fontFamily: "var(--font-space-mono)" }}
            >
              Carne Angus
            </p>
            <p
              className="text-[#F5EFE6] text-xl uppercase leading-tight"
              style={{ fontFamily: "var(--font-anton)" }}
            >
              Americana
            </p>
          </div>
        </div>
      </div>

      {/* Scroll hint — solo desktop */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden md:flex animate-fade-in delay-500">
        <span
          className="text-[#6B6660] text-[9px] uppercase tracking-[0.4em]"
          style={{ fontFamily: "var(--font-space-mono)" }}
        >
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-[#6B6660] to-transparent" />
      </div>
    </section>
  );
}
