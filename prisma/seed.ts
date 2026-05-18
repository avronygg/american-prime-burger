import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const IMG = "https://americanprimeburger.cl/wp-content/uploads";

async function main() {
  // Limpiar tablas para re-seed limpio
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Categorías
  const hamburguesas = await prisma.category.create({
    data: { slug: "hamburguesas", name: "Hamburguesas", order: 1 },
  });
  const sandwich = await prisma.category.create({
    data: { slug: "sandwich", name: "Sándwich", order: 2 },
  });
  const compartir = await prisma.category.create({
    data: { slug: "compartir", name: "Para compartir", order: 3 },
  });
  const liquidos = await prisma.category.create({
    data: { slug: "liquidos", name: "Líquidos", order: 4 },
  });

  // ── HAMBURGUESAS ──────────────────────────────────────────────────────────
  await prisma.product.createMany({
    data: [
      {
        categoryId: hamburguesas.id,
        name: "Cheeseburger",
        description: "Hamburguesa 100% Angus Americano acompañada de queso cheddar y kétchup Heinz.",
        priceLocal: 5500,
        image: `${IMG}/2026/02/frame_141_1.webp`,
        order: 1,
      },
      {
        categoryId: hamburguesas.id,
        name: "Double Cheese",
        description: "Doble hamburguesa 100% Angus Americano de 110g c/u con doble queso cheddar, pepinillos Heinz, cebolla picada y nuestra icónica salsa Mac Prime.",
        priceLocal: 10990,
        image: `${IMG}/2026/02/frame_140_1.webp`,
        order: 2,
      },
      {
        categoryId: hamburguesas.id,
        name: "Traditional Prime Burger",
        description: "Hamburguesa 100% Angus Americano de 150g acompañado con lechuga, queso cheddar, tomate, cebolla morada, kétchup y mostaza Heinz.",
        priceLocal: 9990,
        image: `${IMG}/2026/02/frame_143_1.webp`,
        order: 3,
      },
      {
        categoryId: hamburguesas.id,
        name: "Classic Oklahoma Burger",
        description: "Una smash Burger Angus 100% Americana con cebolla, queso cheddar, pepinillos y mostaza Heinz.",
        priceLocal: 9990,
        image: `${IMG}/2026/02/frame_142_1.webp`,
        order: 4,
      },
      {
        categoryId: hamburguesas.id,
        name: "Doble Oklahoma Burger",
        description: "Doble smash Angus Americano de 110g c/u con cebolla, queso cheddar, pepinillos y mostaza Heinz.",
        priceLocal: 12990,
        image: `${IMG}/2026/02/frame_137_1.webp`,
        order: 5,
      },
      {
        categoryId: hamburguesas.id,
        name: "Texas Burger",
        description: "Hamburguesa 100% Angus Americano de 150g, láminas de queso cheddar, aros de cebolla, tocino y nuestra salsa BBQ Prime.",
        priceLocal: 9990,
        image: `${IMG}/2026/02/frame_138_1.webp`,
        order: 6,
      },
      {
        categoryId: hamburguesas.id,
        name: "Texas Prime",
        description: "Hamburguesa 100% Angus Americano, pulled pork de 12 horas de cocción, queso americano, aros de cebolla, crujiente tocino ahumado y nuestra salsa BBQ Prime.",
        priceLocal: 12990,
        image: `${IMG}/2026/02/frame_150_1.webp`,
        order: 7,
      },
      {
        categoryId: hamburguesas.id,
        name: "Burger Pastrami Prime",
        description: "150g de hamburguesa 100% Angus Americano, 100g de pastrami, cebolla, pepinillos Heinz y nuestra salsa Mac Prime.",
        priceLocal: 12990,
        image: `${IMG}/2026/02/frame_139_1.webp`,
        order: 8,
      },
      {
        categoryId: hamburguesas.id,
        name: "Kidsburger",
        description: "Hamburguesa 100% Angus Americano especial para los más pequeños.",
        priceLocal: 4990,
        image: null,
        isNew: true,
        order: 9,
      },
    ],
  });

  // ── SÁNDWICH ──────────────────────────────────────────────────────────────
  await prisma.product.createMany({
    data: [
      {
        categoryId: sandwich.id,
        name: "Pulled Pork Prime",
        description: "Suave pan de papa, 150g de carne de cerdo ahumada en leña de cerezo y durazno, desmechada con cremosa ensalada de repollo coleslaw, pepinillos y nuestra salsa BBQ Prime.",
        priceLocal: 9990,
        image: `${IMG}/2026/02/frame_146_1.webp`,
        order: 1,
      },
      {
        categoryId: sandwich.id,
        name: "Sándwich Brisket",
        description: "Suave pan de papa con 200g de brisket Angus de la casa ahumado en roble francés, nuestra deliciosa salsa de cebolla caramelizada y crujiente mix de hojas.",
        priceLocal: 11990,
        image: `${IMG}/2026/02/frame_144_1.webp`,
        order: 2,
      },
      {
        categoryId: sandwich.id,
        name: "Sándwich de Pastrami Prime",
        description: "Suave pan de papa, 200g de pastrami Angus de la casa ahumado en roble americano, queso fundido, pepinillos y mostaza.",
        priceLocal: 11990,
        image: `${IMG}/2026/02/frame_147_1.webp`,
        order: 3,
      },
    ],
  });

  // ── PARA COMPARTIR ────────────────────────────────────────────────────────
  await prisma.product.createMany({
    data: [
      {
        categoryId: compartir.id,
        name: "Papas Fritas",
        description: "Crujientes papas fritas (150g).",
        priceLocal: 3990,
        image: null,
        order: 1,
      },
      {
        categoryId: compartir.id,
        name: "Papas Fritas Familiares",
        description: "Crujientes papas fritas para compartir (400g).",
        priceLocal: 5990,
        image: null,
        order: 2,
      },
      {
        categoryId: compartir.id,
        name: "Costillas de Maíz",
        description: "Costillas de maíz al estilo americano.",
        priceLocal: 4990,
        image: `${IMG}/2024/12/maiz.webp`,
        isNew: true,
        order: 3,
      },
      {
        categoryId: compartir.id,
        name: "Pollo Frito",
        description: "Pollo frito estilo sureño americano.",
        priceLocal: 5990,
        image: null,
        isNew: true,
        order: 4,
      },
      {
        categoryId: compartir.id,
        name: "Aros de Cebolla",
        description: "Aros de cebolla apanados y fritos.",
        priceLocal: 3990,
        image: null,
        isNew: true,
        order: 5,
      },
    ],
  });

  // ── LÍQUIDOS ──────────────────────────────────────────────────────────────
  await prisma.product.createMany({
    data: [
      {
        categoryId: liquidos.id,
        name: "Agua",
        description: "Mineral con gas o mineral sin gas.",
        priceLocal: 1500,
        order: 1,
      },
      {
        categoryId: liquidos.id,
        name: "Bebida",
        description: "Bebida en lata.",
        priceLocal: 2000,
        order: 2,
      },
      {
        categoryId: liquidos.id,
        name: "Espresso",
        description: "Café espresso.",
        priceLocal: 2000,
        order: 3,
      },
      {
        categoryId: liquidos.id,
        name: "Americano",
        description: "Una carga de café con agua caliente.",
        priceLocal: 2200,
        order: 4,
      },
      {
        categoryId: liquidos.id,
        name: "Cortado",
        description: "Café con un toque de leche.",
        priceLocal: 2300,
        order: 5,
      },
      {
        categoryId: liquidos.id,
        name: "Té",
        description: "Distintos sabores de té.",
        priceLocal: 2300,
        order: 6,
      },
      {
        categoryId: liquidos.id,
        name: "Cappuccino",
        description: "Café espresso con un toque de leche y espuma de leche.",
        priceLocal: 2400,
        order: 7,
      },
      {
        categoryId: liquidos.id,
        name: "Espresso Doble",
        description: "Doble carga de café espresso.",
        priceLocal: 2700,
        order: 8,
      },
      {
        categoryId: liquidos.id,
        name: "Latte",
        description: "Café espresso en taza grande con leche y espuma de leche.",
        priceLocal: 2800,
        order: 9,
      },
      {
        categoryId: liquidos.id,
        name: "Chocolate Caliente",
        description: "Chocolate caliente en taza grande.",
        priceLocal: 3000,
        order: 10,
      },
      {
        categoryId: liquidos.id,
        name: "Syrup",
        description: "Agrega syrup a tus cafés.",
        priceLocal: 300,
        order: 11,
      },
    ],
  });

  // ── USUARIO ADMIN ─────────────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash("admin123", 12);
  await prisma.adminUser.upsert({
    where: { email: "admin@americanprimeburger.cl" },
    update: {},
    create: {
      email: "admin@americanprimeburger.cl",
      password: hashedPassword,
      name: "Admin",
    },
  });

  console.log("✓ Seed completado con datos reales de americanprimeburger.cl");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
