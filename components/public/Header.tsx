"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Hamburguesas", href: "#hamburguesas" },
  { label: "Sándwich",     href: "#sandwich"     },
  { label: "Compartir",    href: "#compartir"    },
  { label: "Líquidos",     href: "#liquidos"     },
];

export default function Header() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0F0F0F]/95 backdrop-blur-md border-b-2 border-[#C8102E]"
            : "bg-[#0F0F0F]/60 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0" onClick={() => setMenuOpen(false)}>
            <Image
              src="/images/logo-white.png"
              alt="American Prime Burger"
              width={200}
              height={60}
              className="h-12 md:h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav — menu sections */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-[#6B6660] hover:text-[#F5EFE6] transition-colors px-3 py-2 text-[11px] uppercase tracking-[0.2em] hover:bg-[#1A1A1A] apb-focus-ring"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a
              href="#locales"
              className="text-[#6B6660] hover:text-[#F5EFE6] transition-colors text-[11px] uppercase tracking-[0.2em] apb-focus-ring"
              style={{ fontFamily: "var(--font-space-mono)" }}
            >
              Cómo llegar
            </a>
            <a
              href="https://linktr.ee/AmericanPrimeBurgerDelivery"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#C8102E] text-[#F5EFE6] px-4 py-2 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#8B0A1F] transition-all duration-200 ease-out active:scale-[0.97] apb-focus-ring"
              style={{ fontFamily: "var(--font-space-mono)" }}
            >
              Pedir <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1">→</span>
            </a>
          </div>

          {/* Mobile: hamburger button (44×44 touch target per a11y) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-11 h-11 shrink-0 cursor-pointer apb-focus-ring active:scale-95 transition-transform"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className={`block h-[2px] bg-[#F5EFE6] transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[7px] w-6" : "w-6"}`} />
            <span className={`block h-[2px] bg-[#F5EFE6] transition-all duration-300 ${menuOpen ? "opacity-0 w-0" : "w-4"}`} />
            <span className={`block h-[2px] bg-[#F5EFE6] transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px] w-6" : "w-5"}`} />
          </button>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-[#0F0F0F] flex flex-col pt-24 pb-10 px-8 transition-all duration-400 ${
          menuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-2 mb-10">
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-[#F5EFE6] text-4xl uppercase py-3 border-b border-[#1A1A1A] hover:text-[#C8102E] transition-colors apb-focus-ring"
              style={{ fontFamily: "var(--font-anton)", animationDelay: `${i * 60}ms` }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#locales"
            onClick={() => setMenuOpen(false)}
            className="text-[#6B6660] text-4xl uppercase py-3 border-b border-[#1A1A1A] hover:text-[#C8102E] transition-colors apb-focus-ring"
            style={{ fontFamily: "var(--font-anton)" }}
          >
            Información
          </a>
        </nav>

        <a
          href="https://linktr.ee/AmericanPrimeBurgerDelivery"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-[#C8102E] text-[#F5EFE6] py-4 text-center text-sm uppercase tracking-[0.3em] font-bold hover:bg-[#8B0A1F] transition-all duration-200 ease-out active:scale-[0.98] apb-focus-ring mt-auto"
          style={{ fontFamily: "var(--font-space-mono)" }}
        >
          Pedir delivery <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1">→</span>
        </a>

        <p
          className="text-[#2a2a2a] text-[10px] uppercase tracking-widest mt-6 text-center"
          style={{ fontFamily: "var(--font-space-mono)" }}
        >
          Regimiento Cazadores 1186, Local 3 · Providencia
        </p>
      </div>
    </>
  );
}
