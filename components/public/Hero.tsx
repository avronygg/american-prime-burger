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

      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full pt-24 pb-16 grid md:grid-cols-2 gap-10 md:gap-16 items-center">

        {/* ── LEFT: Copy ── */}
        <div className="relative z-10">

          {/* Location badge */}
          <div className="flex items-center gap-3 mb-6 animate-fade-up">
            {/* Mini USA flag: horizontal stripes + blue canton */}
            <div className="relative overflow-hidden w-7 h-5 shrink-0 border border-[#2a2a2a]">
              <div className="absolute inset-0 flex flex-col">
                <div className="flex-1 bg-[#C8102E]" />
                <div className="flex-1 bg-[#F5EFE6]" />
                <div className="flex-1 bg-[#C8102E]" />
                <div className="flex-1 bg-[#F5EFE6]" />
                <div className="flex-1 bg-[#C8102E]" />
                <div className="flex-1 bg-[#F5EFE6]" />
                <div className="flex-1 bg-[#C8102E]" />
              </div>
              <div className="absolute top-0 left-0 w-[42%] h-[57%] bg-[#1B3A6B]" />
            </div>
            <p
              className="text-[#C8102E] text-xs tracking-[0.4em] uppercase"
              style={{ fontFamily: "var(--font-space-mono)" }}
            >
              Providencia · Santiago
            </p>
          </div>

          {/* Title — 3 lines proportional */}
          <h1
            className="uppercase leading-[0.9] mb-8 animate-fade-up delay-100"
            style={{ fontFamily: "var(--font-anton)" }}
          >
            <span className="block text-[#F5EFE6] text-[clamp(3rem,9vw,7.5rem)]">American</span>
            <span className="block text-[#C8102E]  text-[clamp(3rem,9vw,7.5rem)]">Prime</span>
            <span className="block text-[#F5EFE6]  text-[clamp(2.4rem,7.5vw,6.2rem)]">Burger</span>
          </h1>

          {/* Stars divider */}
          <div className="flex items-center gap-3 mb-6 animate-fade-up delay-150">
            <div className="h-px flex-1 bg-[#1A1A1A]" />
            <span className="text-[#C8102E] text-xs tracking-[0.5em]">★ ★ ★</span>
            <div className="h-px flex-1 bg-[#1A1A1A]" />
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 mb-8 animate-fade-up delay-200">
            {[
              { value: "100%", label: "Angus Americano" },
              { value: "12h",  label: "Ahumado lento"   },
              { value: "4.8★", label: "Google Reviews"  },
            ].map((s) => (
              <div key={s.label} className="flex flex-col">
                <span
                  className="text-[#C8102E] text-xl font-bold leading-none"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  {s.value}
                </span>
                <span
                  className="text-[#6B6660] text-[11px] uppercase tracking-widest mt-1"
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
              className="bg-[#C8102E] text-[#F5EFE6] px-8 py-4 text-sm uppercase tracking-[0.25em] font-bold hover:bg-[#8B0A1F] transition-colors"
              style={{ fontFamily: "var(--font-space-mono)" }}
            >
              Ver menú
            </a>
            <a
              href="https://linktr.ee/AmericanPrimeBurgerDelivery"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F5EFE6] text-sm uppercase tracking-[0.25em] hover:text-[#C8102E] transition-colors flex items-center gap-2"
              style={{ fontFamily: "var(--font-space-mono)" }}
            >
              Pedir delivery <span className="text-[#C8102E]">→</span>
            </a>
          </div>
        </div>

        {/* ── RIGHT: Photo ── */}
        <div className="relative animate-slide-right delay-200">
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
              className="text-[#C8102E] text-[10px] uppercase tracking-[0.35em]"
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

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden md:flex animate-fade-in delay-500">
        <span
          className="text-[#6B6660] text-[11px] uppercase tracking-[0.4em]"
          style={{ fontFamily: "var(--font-space-mono)" }}
        >
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-[#6B6660] to-transparent" />
      </div>
    </section>
  );
}
