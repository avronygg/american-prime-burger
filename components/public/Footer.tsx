export default function Footer() {
  return (
    <footer id="locales" className="bg-[#0F0F0F] border-t-4 border-[#C8102E]">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid md:grid-cols-3 gap-12">

        {/* Brand */}
        <div>
          <p
            className="text-[#C8102E] text-[10px] uppercase tracking-[0.4em] mb-2"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            Est. Providencia
          </p>
          <h2
            className="text-[#F5EFE6] text-4xl uppercase leading-tight mb-4"
            style={{ fontFamily: "var(--font-anton)" }}
          >
            American<br />Prime<br />Burger
          </h2>
          <p
            className="text-[#6B6660] text-xs leading-relaxed"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Carne 100% Angus Americano.<br />
            Ahumados de leña. Santiago, Chile.
          </p>
        </div>

        {/* Location & Hours */}
        <div>
          <p
            className="text-[#C8102E] text-[10px] uppercase tracking-[0.4em] mb-4"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            Dónde encontrarnos
          </p>
          <address
            className="not-italic text-[#F5EFE6] text-lg leading-snug mb-6"
            style={{ fontFamily: "var(--font-anton)" }}
          >
            Regimiento Cazadores 1186<br />
            Local 3, Providencia<br />
            Santiago
          </address>
          <div style={{ fontFamily: "var(--font-space-mono)" }}>
            <p className="text-[#6B6660] text-[10px] uppercase tracking-[0.3em] mb-2">Horario</p>
            <p className="text-[#F5EFE6] text-xs">Lun – Vie · 12:00 – 22:00</p>
            <p className="text-[#F5EFE6] text-xs">Sáb – Dom · 12:00 – 23:00</p>
          </div>
        </div>

        {/* Social & Delivery */}
        <div>
          <p
            className="text-[#C8102E] text-[10px] uppercase tracking-[0.4em] mb-4"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            Síguenos
          </p>
          <div className="flex flex-col gap-3 mb-8">
            {[
              { label: "Instagram", href: "https://instagram.com/americanprimeburger" },
              { label: "Facebook", href: "https://facebook.com/americanprimeburger" },
              { label: "TikTok", href: "https://tiktok.com/@americanprimeburger" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6B6660] hover:text-[#F5EFE6] transition-colors text-sm uppercase tracking-widest"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                {s.label} ↗
              </a>
            ))}
          </div>
          <a
            href="https://linktr.ee/AmericanPrimeBurgerDelivery"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#C8102E] text-[#F5EFE6] px-6 py-3 text-xs uppercase tracking-[0.2em] hover:bg-[#8B0A1F] transition-colors font-bold"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            Pedir delivery →
          </a>
        </div>
      </div>

      <div className="border-t border-[#1A1A1A] px-5 md:px-8 py-5 max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-2">
        <p
          className="text-[#2a2a2a] text-[10px] uppercase tracking-widest"
          style={{ fontFamily: "var(--font-space-mono)" }}
        >
          © {new Date().getFullYear()} American Prime Burger
        </p>
        <p
          className="text-[#2a2a2a] text-[10px] uppercase tracking-widest"
          style={{ fontFamily: "var(--font-space-mono)" }}
        >
          +569 71479783
        </p>
      </div>
    </footer>
  );
}
