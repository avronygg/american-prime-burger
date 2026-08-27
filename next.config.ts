import type { NextConfig } from "next";

// 31 días en segundos. Se usa en dos lugares que tienen que ir de la mano:
// el Cache-Control de las imágenes de origen (/images/*) y el minimumCacheTTL
// del optimizador. Next define la expiración de la imagen optimizada como
// max(minimumCacheTTL, Cache-Control del origen).
const IMAGE_CACHE_SECONDS = 60 * 60 * 24 * 31;

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/hamburguesas-cerca-de-mi",
        destination: "/",
        permanent: true,
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "americanprimeburger.cl",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],

    // Los archivos de public/ se sirven con `max-age=0`, así que sin esto la
    // imagen optimizada expiraba cada 4 horas (default de Next 16) y se volvía
    // a generar — una escritura de caché nueva cada vez, para cada ancho.
    minimumCacheTTL: IMAGE_CACHE_SECONDS,

    // Cada ancho de esta lista es una variante distinta que se optimiza y se
    // cachea por separado. Con los defaults (8 deviceSizes + 7 imageSizes) la
    // home ofrecía 202 combinaciones imagen×ancho. Los originales miden como
    // máximo 2000px, así que 2048 y 3840 solo generaban variantes inútiles.
    deviceSizes: [640, 828, 1080, 1920],
    imageSizes: [128, 256, 384],
  },

  async rewrites() {
    return [
      {
        // Las fotos de public/images/ se guardan en WebP (pesan ~93% menos que
        // los PNG originales, misma resolución). Las rutas .png se mantienen
        // vivas porque la base de datos guarda `/images/foo.png` en
        // Product.image: esta regla las resuelve al archivo .webp real.
        //
        // Solo afecta a los .png sueltos dentro de /images/. Los de subcarpetas
        // (/images/logos/*) no coinciden, porque :name no cruza slashes.
        source: "/images/:name.png",
        destination: "/images/:name.webp",
      },
    ];
  },

  async headers() {
    return [
      {
        // Fotos de producto, logo y demás assets estáticos. Al darles un
        // Cache-Control largo, la versión optimizada lo hereda: el navegador
        // deja de re-pedir cada imagen en cada visita y el optimizador deja de
        // regenerarlas.
        //
        // OJO: si se reemplaza una foto manteniendo el mismo nombre de archivo,
        // los visitantes pueden seguir viendo la anterior hasta 31 días. Para
        // cambiar una foto: renombrar el archivo (cheeseburger-2.png) o subirla
        // desde el admin, que genera una URL nueva en cada subida.
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: `public, max-age=${IMAGE_CACHE_SECONDS}`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
