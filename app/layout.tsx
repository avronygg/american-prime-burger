import type { Metadata } from "next";
import { Anton, Manrope, Space_Mono } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "American Prime Burger — Providencia, Santiago",
  description:
    "Hamburguesas 100% Angus Americano, sándwiches ahumados y más. Regimiento Cazadores 1186, Local 3, Providencia.",
  openGraph: {
    title: "American Prime Burger",
    description: "La mejor carne Angus americana en Santiago.",
    url: "https://americanprimeburger.cl",
    siteName: "American Prime Burger",
    locale: "es_CL",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${anton.variable} ${manrope.variable} ${spaceMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
