"use client";

const PHRASES = [
  "100% Angus Americano",
  "Carnes Ahumadas",
  "Hamburguesas Americanas",
  "Sándwiches de la Casa",
  "Ahumado 12 Horas",
  "Recetas Propias de la Casa",
  "Brisket",
  "Pastrami",
  "Pulled Pork",
];

const CONTENT = PHRASES.join("   ★   ") + "   ★   ";

export default function MarqueeStrip({ variant = "red" }: { variant?: "red" | "dark" }) {
  const bg  = variant === "dark" ? "bg-[#080808]"  : "bg-[#C8102E]";
  const txt = variant === "dark" ? "text-[#C8102E]" : "text-[#F5EFE6]";

  return (
    <div className={`overflow-hidden py-3 select-none ${bg}`} aria-hidden>
      <div className="animate-marquee inline-flex whitespace-nowrap">
        {[0, 1].map((i) => (
          <span
            key={i}
            className={`text-[11px] uppercase tracking-[0.4em] ${txt}`}
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            {CONTENT}
          </span>
        ))}
      </div>
    </div>
  );
}
