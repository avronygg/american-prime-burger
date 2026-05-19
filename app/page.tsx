import { prisma } from "@/lib/prisma";
import Header from "@/components/public/Header";
import Hero from "@/components/public/Hero";
import CategoryNav from "@/components/public/CategoryNav";
import ProductCard from "@/components/public/ProductCard";
import DrinkCard from "@/components/public/DrinkCard";
import FadeIn from "@/components/public/FadeIn";
import Reviews from "@/components/public/Reviews";
import MapSection from "@/components/public/MapSection";
import Footer from "@/components/public/Footer";

export const revalidate = 60;

const DRINK_SLUGS = ["liquidos"];

export default async function HomePage() {
  const categories = await prisma.category.findMany({
    where: { active: true },
    include: {
      products: { orderBy: { order: "asc" } },
    },
    orderBy: { order: "asc" },
  });

  return (
    <>
      <Header />

      <main>
        {/* ── Hero ── */}
        <Hero />

        {/* ── Sticky category nav ── */}
        <CategoryNav
          categories={categories.map((c) => ({ id: c.id, slug: c.slug, name: c.name }))}
        />

        {/* ── Menu sections ── */}
        <div id="menu" className="bg-[#0F0F0F]">
          {categories.map((category, catIdx) => {
            const isDrinks = DRINK_SLUGS.includes(category.slug);

            return (
              <div
                key={category.id}
                id={category.slug}
                className={`scroll-mt-28 py-16 md:py-20 border-b border-[#1A1A1A] ${
                  catIdx % 2 === 1 ? "bg-[#080808]" : "bg-[#0F0F0F]"
                }`}
              >
                <div className="max-w-7xl mx-auto px-5 md:px-10">

                  {/* Section header */}
                  <FadeIn className="flex items-end justify-between mb-8 md:mb-12">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[#C8102E] text-xs tracking-[0.4em]">★</span>
                        <p
                          className="text-[#C8102E] text-xs uppercase tracking-[0.4em]"
                          style={{ fontFamily: "var(--font-space-mono)" }}
                        >
                          {String(catIdx + 1).padStart(2, "0")}
                        </p>
                      </div>
                      <h2
                        className="text-[#F5EFE6] text-[clamp(2.4rem,6vw,4.5rem)] uppercase leading-none"
                        style={{ fontFamily: "var(--font-anton)" }}
                      >
                        {category.name}
                      </h2>
                    </div>
                    <span
                      className="text-[#6B6660] text-xs uppercase tracking-widest hidden md:block tabular-nums"
                      style={{ fontFamily: "var(--font-space-mono)" }}
                    >
                      {category.products.length} productos
                    </span>
                  </FadeIn>

                  {/* Products */}
                  {category.products.length === 0 ? (
                    <p
                      className="text-[#6B6660] text-sm"
                      style={{ fontFamily: "var(--font-space-mono)" }}
                    >
                      Próximamente
                    </p>
                  ) : isDrinks ? (
                    <FadeIn direction="up" delay={100}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 max-w-3xl">
                        {category.products.map((product) => (
                          <DrinkCard key={product.id} product={product} />
                        ))}
                      </div>
                    </FadeIn>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                      {category.products.map((product, i) => (
                        <FadeIn key={product.id} direction="up" delay={i * 60} className="h-full">
                          <ProductCard product={product} />
                        </FadeIn>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── USA flag divider: blue canton + red/white stripes ── */}
        <div className="flex h-2">
          <div className="w-16 bg-[#1B3A6B] shrink-0" />
          <div className="flex-[3] bg-[#C8102E]" />
          <div className="flex-[1] bg-[#F5EFE6]" />
          <div className="flex-[3] bg-[#C8102E]" />
          <div className="flex-[1] bg-[#F5EFE6]" />
          <div className="flex-[3] bg-[#C8102E]" />
          <div className="flex-[1] bg-[#F5EFE6]" />
          <div className="flex-[3] bg-[#C8102E]" />
        </div>

        {/* ── Google Reviews ── */}
        <Reviews />

        {/* ── Map & Location ── */}
        <MapSection />
      </main>

      <Footer />

      {/* ── WhatsApp FAB ── */}
      <a
        href="https://wa.me/56971479783"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white w-14 h-14 flex items-center justify-center hover:scale-110 transition-transform"
        style={{ boxShadow: "3px 3px 0 #0F0F0F" }}
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </>
  );
}
