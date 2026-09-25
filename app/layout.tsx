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
  title: "Hamburguesas Americanas en Providencia | American Prime Burger",
  description:
    "Hamburguesas 100% Angus americano y sándwiches ahumados 12–16 horas en Providencia, Santiago. Abierto todos los días 11:00–21:30. Revisa el menú y pide delivery.",
  openGraph: {
    title: "Hamburguesas Americanas en Providencia | American Prime Burger",
    description: "Hamburguesas 100% Angus americano y sándwiches ahumados en Providencia, Santiago. Todos los días 11:00–21:30.",
    url: "https://americanprimeburger.cl",
    siteName: "American Prime Burger",
    locale: "es_CL",
    type: "website",
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "Hamburguesas de American Prime Burger en Providencia, Santiago",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamburguesas Americanas en Providencia | American Prime Burger",
    description: "Hamburguesas 100% Angus americano y sándwiches ahumados en Providencia, Santiago. Todos los días 11:00–21:30.",
    images: ["/images/og.jpg"],
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
