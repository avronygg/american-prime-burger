import type { Metadata } from "next";
import { Anton, Manrope, Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
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
  metadataBase: new URL("https://americanprimeburger.cl"),
  verification: {
    google: "kqpHFnlUMQnqun6_fanzKVUcgfrbb-UrJjwvetbnqNM",
  },
  applicationName: "American Prime Burger",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
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
    images: [
      {
        url: "/images/hero.webp",
        width: 1200,
        height: 1200,
        alt: "Hamburguesa de American Prime Burger en Providencia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "American Prime Burger",
    description: "Hamburguesas Angus americanas y sándwiches ahumados en Providencia.",
    images: ["/images/hero.webp"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${anton.variable} ${manrope.variable} ${spaceMono.variable}`}>
      <body>
        {children}
        <Analytics />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-N9FP42Q0T8"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-N9FP42Q0T8');
          `}
        </Script>
      </body>
    </html>
  );
}
