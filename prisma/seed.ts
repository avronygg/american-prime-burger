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
  // Listado definitivo (cliente, may-2026): 11 hamburguesas. Todas en pan brioche,
  // todas de carne 100% Angus americano, todas incluyen 150 g de papas fritas.
  // priceDelivery queda null hasta que el cliente entregue los precios de delivery.
  await prisma.product.createMany({
    data: [
      {
        categoryId: hamburguesas.id,
        tags: ["100% Angus"],
        name: "Prime Jr.",
        description:
          "Hamburguesa de 110 g de carne 100% Angus americano con doble queso cheddar y kétchup, en pan brioche. Incluye 150 g de papas fritas.",
        ingredients: [
          { name: "Carne 100% Angus americano", grams: 110 },
          { name: "Doble queso cheddar (2 láminas)" },
          { name: "Kétchup" },
          { name: "Pan brioche" },
          { name: "Papas fritas", grams: 150 },
        ],
        priceLocal: 5990,
        image: "/images/prime-junior.png",
        isNew: true,
        order: 1,
      },
      {
        categoryId: hamburguesas.id,
        tags: ["100% Angus"],
        name: "Cheeseburger",
        description:
          "Hamburguesa de 150 g de carne 100% Angus americano con doble queso cheddar, pepinillos, cebolla blanca y salsa Mac Prime, en pan brioche. Incluye 150 g de papas fritas.",
        ingredients: [
          { name: "Carne 100% Angus americano", grams: 150 },
          { name: "Doble queso cheddar (2 láminas)" },
          { name: "Pepinillos" },
          { name: "Cebolla blanca" },
          { name: "Salsa Mac Prime" },
          { name: "Pan brioche" },
          { name: "Papas fritas", grams: 150 },
        ],
        priceLocal: 8990,
        image: "/images/cheeseburger.png",
        isNew: true,
        order: 2,
      },
      {
        categoryId: hamburguesas.id,
        tags: ["100% Angus"],
        name: "Doble Cheeseburger",
        description:
          "Doble hamburguesa con 220 g de carne 100% Angus americano (dos medallones de 110 g), cuatro láminas de queso cheddar, pepinillos, cebolla blanca y salsa Mac Prime, en pan brioche. Incluye 150 g de papas fritas.",
        ingredients: [
          { name: "Carne 100% Angus americano", grams: 220 },
          { name: "Cuatro láminas de queso cheddar" },
          { name: "Pepinillos" },
          { name: "Cebolla blanca" },
          { name: "Salsa Mac Prime" },
          { name: "Pan brioche" },
          { name: "Papas fritas", grams: 150 },
        ],
        priceLocal: 10990,
        image: `${IMG}/2026/02/frame_140_1.webp`,
        order: 3,
      },
      {
        categoryId: hamburguesas.id,
        tags: ["100% Angus"],
        name: "Traditional Burger",
        description:
          "Hamburguesa de 150 g de carne 100% Angus americano con lechuga, queso cheddar, tomate, cebolla morada, kétchup, mostaza y pepinillos, en pan brioche. Incluye 150 g de papas fritas.",
        ingredients: [
          { name: "Carne 100% Angus americano", grams: 150 },
          { name: "Lechuga" },
          { name: "Queso cheddar" },
          { name: "Tomate" },
          { name: "Cebolla morada" },
          { name: "Kétchup" },
          { name: "Mostaza" },
          { name: "Pepinillos" },
          { name: "Pan brioche" },
          { name: "Papas fritas", grams: 150 },
        ],
        priceLocal: 9990,
        image: `${IMG}/2026/02/frame_143_1.webp`,
        order: 4,
      },
      {
        categoryId: hamburguesas.id,
        tags: ["100% Angus"],
        name: "Doble Traditional Burger",
        description:
          "Doble hamburguesa con 220 g de carne 100% Angus americano (dos medallones de 110 g), lechuga, doble queso cheddar, tomate, cebolla morada, kétchup, mostaza y pepinillos, en pan brioche. Incluye 150 g de papas fritas.",
        ingredients: [
          { name: "Carne 100% Angus americano", grams: 220 },
          { name: "Lechuga" },
          { name: "Doble queso cheddar" },
          { name: "Tomate" },
          { name: "Cebolla morada" },
          { name: "Kétchup" },
          { name: "Mostaza" },
          { name: "Pepinillos" },
          { name: "Pan brioche" },
          { name: "Papas fritas", grams: 150 },
        ],
        priceLocal: 11990,
        image: "/images/doble-traditional.png",
        isNew: true,
        order: 5,
      },
      {
        categoryId: hamburguesas.id,
        tags: ["100% Angus"],
        name: "Oklahoma Burger",
        description:
          "Hamburguesa smash de 150 g de carne 100% Angus americano con cebolla, queso cheddar, pepinillos y mostaza Heinz, en pan brioche. Incluye 150 g de papas fritas.",
        ingredients: [
          { name: "Carne 100% Angus americano (smash)", grams: 150 },
          { name: "Cebolla" },
          { name: "Queso cheddar" },
          { name: "Pepinillos" },
          { name: "Mostaza Heinz" },
          { name: "Pan brioche" },
          { name: "Papas fritas", grams: 150 },
        ],
        priceLocal: 9990,
        image: `${IMG}/2026/02/frame_142_1.webp`,
        order: 6,
      },
      {
        categoryId: hamburguesas.id,
        tags: ["100% Angus"],
        name: "Doble Oklahoma Burger",
        description:
          "Doble hamburguesa smash con 220 g de carne 100% Angus americano (dos medallones de 110 g), cebolla, doble queso cheddar, pepinillos y mostaza Heinz, en pan brioche. Incluye 150 g de papas fritas.",
        ingredients: [
          { name: "Carne 100% Angus americano (smash)", grams: 220 },
          { name: "Cebolla" },
          { name: "Doble queso cheddar" },
          { name: "Pepinillos" },
          { name: "Mostaza Heinz" },
          { name: "Pan brioche" },
          { name: "Papas fritas", grams: 150 },
        ],
        priceLocal: 12990,
        image: `${IMG}/2026/02/frame_137_1.webp`,
        isNew: true,
        order: 7,
      },
      {
        categoryId: hamburguesas.id,
        tags: ["100% Angus"],
        name: "Texas Burger",
        description:
          "Hamburguesa de 150 g de carne 100% Angus americano con queso cheddar, aros de cebolla, tocino y salsa Barbecue Prime, en pan brioche. Incluye 150 g de papas fritas.",
        ingredients: [
          { name: "Carne 100% Angus americano", grams: 150 },
          { name: "Queso cheddar" },
          { name: "Aros de cebolla" },
          { name: "Tocino" },
          { name: "Salsa Barbecue Prime" },
          { name: "Pan brioche" },
          { name: "Papas fritas", grams: 150 },
        ],
        priceLocal: 9990,
        image: `${IMG}/2026/02/frame_138_1.webp`,
        order: 8,
      },
      {
        categoryId: hamburguesas.id,
        tags: ["100% Angus"],
        name: "Doble Texas Burger",
        description:
          "Doble hamburguesa con 220 g de carne 100% Angus americano (dos medallones de 110 g), doble queso cheddar, aros de cebolla, tocino y salsa Barbecue Prime, en pan brioche. Incluye 150 g de papas fritas.",
        ingredients: [
          { name: "Carne 100% Angus americano", grams: 220 },
          { name: "Doble queso cheddar" },
          { name: "Aros de cebolla" },
          { name: "Tocino" },
          { name: "Salsa Barbecue Prime" },
          { name: "Pan brioche" },
          { name: "Papas fritas", grams: 150 },
        ],
        priceLocal: 11990,
        image: "/images/doble-texas.png",
        isNew: true,
        order: 9,
      },
      {
        categoryId: hamburguesas.id,
        tags: ["100% Angus"],
        name: "Pastrami Prime",
        description:
          "Hamburguesa de 150 g de carne 100% Angus americano con 100 g de pastrami, cebolla, pepinillos Heinz y salsa Mac Prime, en pan brioche. Incluye 150 g de papas fritas.",
        ingredients: [
          { name: "Carne 100% Angus americano", grams: 150 },
          { name: "Pastrami", grams: 100 },
          { name: "Cebolla" },
          { name: "Pepinillos Heinz" },
          { name: "Salsa Mac Prime" },
          { name: "Pan brioche" },
          { name: "Papas fritas", grams: 150 },
        ],
        priceLocal: 12990,
        image: `${IMG}/2026/02/frame_139_1.webp`,
        order: 10,
      },
      {
        categoryId: hamburguesas.id,
        tags: ["100% Angus"],
        name: "Texas Prime",
        description:
          "Hamburguesa de carne 100% Angus americano con pulled pork de 12 horas de cocción, queso americano, aros de cebolla, crujiente tocino ahumado y salsa BBQ Prime, en pan brioche. Incluye 150 g de papas fritas.",
        ingredients: [
          { name: "Carne 100% Angus americano" },
          { name: "Pulled pork (12 h de cocción)" },
          { name: "Queso americano" },
          { name: "Aros de cebolla" },
          { name: "Tocino ahumado" },
          { name: "Salsa BBQ Prime" },
          { name: "Pan brioche" },
          { name: "Papas fritas", grams: 150 },
        ],
        priceLocal: 12990,
        image: `${IMG}/2026/02/frame_150_1.webp`,
        order: 11,
      },
    ],
  });

  // ── SÁNDWICH ──────────────────────────────────────────────────────────────
  await prisma.product.createMany({
    data: [
      {
        categoryId: sandwich.id,
        name: "Pulled Pork Prime",
        description: "Suave pan de papa, 150g de carne de cerdo ahumada en leña de cerezo y durazno, desmechada con cremosa ensalada de repollo coleslaw, pepinillos y nuestra salsa BBQ Prime. Incluye 150 g de papas fritas.",
        priceLocal: 9990,
        image: `${IMG}/2026/02/frame_146_1.webp`,
        order: 1,
      },
      {
        categoryId: sandwich.id,
        name: "Sándwich Brisket",
        description: "Suave pan de papa con 150 g de brisket Angus de la casa ahumado en roble francés, nuestra deliciosa salsa de cebolla caramelizada y crujiente mix de hojas. Incluye 150 g de papas fritas.",
        priceLocal: 11990,
        image: "/images/sandwich-brisket.png",
        order: 2,
      },
      {
        categoryId: sandwich.id,
        name: "Sándwich de Pastrami Prime",
        description: "Suave pan de papa, 200g de pastrami Angus de la casa ahumado en roble americano, queso fundido, pepinillos y mostaza. Incluye 150 g de papas fritas.",
        priceLocal: 11990,
        image: "/images/sandwich-pastrami-prime.png",
        order: 3,
      },
    ],
  });

  // ── PARA COMPARTIR ────────────────────────────────────────────────────────
  await prisma.product.createMany({
    data: [
      {
        categoryId: compartir.id,
        name: "Papas Fritas Individuales",
        description: "Papas fritas finas extra crunchy (150 g).",
        priceLocal: 3990,
        image: "/images/papas-individuales.png",
        order: 1,
      },
      {
        categoryId: compartir.id,
        name: "Papas Fritas Familiares",
        description: "Papas fritas finas extra crunchy (400 g).",
        priceLocal: 5990,
        image: "/images/papas-familiares.png",
        order: 2,
      },
      {
        categoryId: compartir.id,
        name: "Costillas de Maíz",
        description: "300 g de costillas de maíz dulce americanas con nuestras deliciosas especias de la casa y mix de quesos.",
        priceLocal: 5990,
        image: "/images/costillas-maiz.png",
        order: 3,
      },
      {
        categoryId: compartir.id,
        name: "Pollo Frito",
        description: "5 piezas de pollo frito agridulce, crujientes y jugosos, con nuestra salsa BBQ Prime.",
        priceLocal: 8990,
        image: "/images/pollo-frito.png",
        order: 4,
      },
      {
        categoryId: compartir.id,
        name: "Aros de Cebolla",
        description: "10 unidades de aros de cebolla acompañados de salsa BBQ y nuestra salsa de cebolla.",
        priceLocal: 3990,
        image: "/images/aros-de-cebolla.png",
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
