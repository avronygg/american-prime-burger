// Reseñas reales tomadas de Google Maps (American Prime Burger, Providencia).
// Elisa se truncó (texto original más extenso) para que la card no fuera 3× más
// alta que las otras; el "…" señala el corte honestamente.
const REVIEWS = [
  {
    name: "Chjalmar Ekman",
    avatar: "C",
    rating: 5,
    date: "Hace un año",
    badge: "Local Guide",
    text: "Las mejores carnes ahumadas (por ellos mismos) que he probado en Santiago en varios años, servidas en sándwich, brunch o solas, siempre con el mejor pan para cada corte. Un menú amplio con opciones que parten desde el brunch a los almuerzos…",
  },
  {
    name: "Elisa Vergara",
    avatar: "E",
    rating: 5,
    date: "Hace un año",
    badge: "Local Guide",
    text: "Comida con buena terminación \"gringa\". Excelente opción de brunch, pedí el de Pulled pork con waffle + un dulce: buena temperatura y humedad del sandwich, el waffle tierno y el tocino muy crocante. Excelente crocancia de los aros de cebolla (pedimos también una Texas Prime). Me encantó que tienen amplia oferta de cafés fríos…",
  },
  {
    name: "Felipe H",
    avatar: "F",
    rating: 5,
    date: "Hace un año",
    badge: "Local Guide",
    text: "Hace mucho tiempo que no probaba hamburguesas tan bien hechas. Se nota que los ingredientes son de excelente calidad, hay preocupación y por lo mismo logran el sabor real de hamburguesas americanas. Las meatballs de brisket puro sabor a carne y la cáscara delgadita y crujiente. Las papitas también de mucho mejor calidad que en otros locales. Precios justos y buen tamaño de porciones. ¡Volveré a ir definitivamente!",
  },
  {
    name: "Tiny Dream",
    avatar: "T",
    rating: 5,
    date: "Hace un año",
    text: "Ayer fuimos con nuestra perrita. Estuvo súper bien e incluso le prepararon su hamburguesa especial a ella. La atención muy buena, muy amables, la espera razonable y el sabor de la hamburguesa se sentía y no se escondía bajo el sabor de la salsa. Las papitas son estilo McDonald's.",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill={i < count ? "#E4A82C" : "#2a2a2a"}
          className="w-4 h-4"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="bg-[#080808] py-16 md:py-24 border-t border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-5 md:px-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14">
          <div>
            <h2
              className="text-[#F5EFE6] text-[clamp(2rem,5vw,4rem)] uppercase leading-none"
              style={{ fontFamily: "var(--font-anton)" }}
            >
              Reseñas Google
            </h2>
          </div>

          {/* Google rating summary */}
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p
                className="text-[#F5EFE6] text-4xl font-bold leading-none"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                4.8
              </p>
              <Stars count={5} />
              <p
                className="text-[#6B6660] text-[10px] mt-1 uppercase tracking-widest"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                Google Reviews
              </p>
            </div>
            {/* Google G logo */}
            <svg viewBox="0 0 24 24" className="w-10 h-10 opacity-30" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className="bg-[#1A1A1A] p-5 flex flex-col gap-3 border border-[#222] hover:border-[#C8102E]/30 transition-colors duration-300"
            >
              {/* Top */}
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full bg-[#C8102E] flex items-center justify-center text-[#F5EFE6] text-sm font-bold shrink-0"
                  style={{ fontFamily: "var(--font-anton)" }}
                >
                  {r.avatar}
                </div>
                <div>
                  <p
                    className="text-[#F5EFE6] text-sm font-medium leading-tight"
                    style={{ fontFamily: "var(--font-manrope)" }}
                  >
                    {r.name}
                  </p>
                  <p
                    className="text-[#6B6660] text-[10px] uppercase tracking-wider"
                    style={{ fontFamily: "var(--font-space-mono)" }}
                  >
                    {r.badge && (
                      <>
                        <span className="text-[#C8102E]">{r.badge}</span>
                        {" · "}
                      </>
                    )}
                    {r.date}
                  </p>
                </div>
              </div>

              <Stars count={r.rating} />

              <p
                className="text-[#6B6660] text-xs leading-relaxed flex-1"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {r.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://www.google.com/maps/search/?api=1&query=American+Prime+Burger+Regimiento+Cazadores+1186+Providencia"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[#6B6660] hover:text-[#F5EFE6] text-[11px] uppercase tracking-[0.2em] transition-colors border-b border-[#2a2a2a] pb-1"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            Ver todas las reseñas en Google →
          </a>
        </div>
      </div>
    </section>
  );
}
