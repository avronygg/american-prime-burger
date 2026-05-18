const REVIEWS = [
  {
    name: "Sebastián M.",
    rating: 5,
    date: "Hace 2 semanas",
    text: "Las mejores hamburguesas de Providencia sin ninguna duda. La Double Cheese es brutal — la carne Angus se nota la diferencia desde el primer mordisco. Servicio rápido y el local tiene muy buena onda.",
    avatar: "S",
  },
  {
    name: "Valentina R.",
    rating: 5,
    date: "Hace 1 mes",
    text: "El Pulled Pork Prime es una locura. El ahumado en leña se siente de verdad, no es de esos lugares que dicen ahumado y no sabe a nada. Llevo 3 veces y siempre quedo muy satisfecha. 100% recomendado.",
    avatar: "V",
  },
  {
    name: "Diego F.",
    rating: 5,
    date: "Hace 3 semanas",
    text: "Probé el Texas Prime y fue lo mejor que he comido en Santiago en mucho tiempo. El brisket del sándwich también está increíble. Lugar con identidad propia, no es un fast food cualquiera.",
    avatar: "D",
  },
  {
    name: "Camila T.",
    rating: 5,
    date: "Hace 2 meses",
    text: "Ambiente americano auténtico, la comida llega caliente y rápido. Las papas fritas están crujientes como tienen que ser. Los cafés también muy buenos. Definitivamente mi lugar favorito en Providencia.",
    avatar: "C",
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
            <p
              className="text-[#C8102E] text-[10px] uppercase tracking-[0.4em] mb-1"
              style={{ fontFamily: "var(--font-space-mono)" }}
            >
              ── Lo que dicen
            </p>
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
                    className="text-[#6B6660] text-[10px]"
                    style={{ fontFamily: "var(--font-space-mono)" }}
                  >
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
            href="https://g.page/r/americanprimeburger/review"
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
