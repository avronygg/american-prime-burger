export default function MapSection() {
  return (
    <section id="locales" className="bg-[#0F0F0F] py-16 md:py-24 border-t border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-5 md:px-10">

        <div className="mb-8 md:mb-12">
          <h2
            className="text-[#F5EFE6] text-[clamp(2rem,5vw,4rem)] uppercase leading-none"
            style={{ fontFamily: "var(--font-anton)" }}
          >
            Encuéntranos
          </h2>
        </div>

        <div className="grid md:grid-cols-5 gap-6 md:gap-8 items-stretch">

          {/* Map embed — 3/5 */}
          <div className="md:col-span-3 overflow-hidden" style={{ boxShadow: "4px 4px 0 #C8102E" }}>
            <iframe
              src="https://maps.google.com/maps?q=Regimiento+Cazadores+1186,+Providencia,+Santiago,+Chile&hl=es&z=16&output=embed"
              width="100%"
              height="400"
              style={{ border: 0, display: "block", filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación American Prime Burger"
            />
          </div>

          {/* Info card — 2/5 */}
          <div className="md:col-span-2 bg-[#1A1A1A] p-7 flex flex-col justify-between gap-6 border border-[#222]">

            <div>
              <p
                className="text-[#C8102E] text-[9px] uppercase tracking-[0.4em] mb-2"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                Dirección
              </p>
              <address
                className="not-italic text-[#F5EFE6] text-2xl md:text-3xl uppercase leading-tight mb-1"
                style={{ fontFamily: "var(--font-anton)" }}
              >
                Regimiento<br />Cazadores 1186<br />Local 3
              </address>
              <p
                className="text-[#6B6660] text-xs mt-2"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                Providencia, Santiago
              </p>
            </div>

            <div>
              <p
                className="text-[#C8102E] text-[9px] uppercase tracking-[0.4em] mb-2"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                Horario
              </p>
              <div className="space-y-1" style={{ fontFamily: "var(--font-space-mono)" }}>
                {[
                  { days: "Lun y Jue",     hours: "11:00 – 21:30" },
                  { days: "Mar, Mié, Vie", hours: "10:45 – 21:30" },
                  { days: "Sáb y Dom",     hours: "10:30 – 21:30" },
                ].map((h) => (
                  <div key={h.days} className="flex justify-between gap-4">
                    <span className="text-[#6B6660] text-xs">{h.days}</span>
                    <span className="text-[#F5EFE6] text-xs">{h.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p
                className="text-[#C8102E] text-[9px] uppercase tracking-[0.4em] mb-2"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                Contacto
              </p>
              <a
                href="tel:+56971479783"
                className="text-[#F5EFE6] text-sm hover:text-[#C8102E] transition-colors"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                +569 7147 9783
              </a>
            </div>

            <a
              href="https://maps.google.com/?q=Regimiento+Cazadores+1186,+Providencia,+Santiago"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#C8102E] text-[#F5EFE6] py-3 text-center text-xs uppercase tracking-[0.25em] font-bold hover:bg-[#8B0A1F] transition-colors mt-auto"
              style={{ fontFamily: "var(--font-space-mono)" }}
            >
              Abrir en Google Maps →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
