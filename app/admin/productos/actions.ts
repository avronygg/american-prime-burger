"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function toggleProductAvailability(id: string, available: boolean) {
  await prisma.product.update({ where: { id }, data: { available } });
  revalidatePath("/admin/productos");
  revalidatePath("/");
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/productos");
  revalidatePath("/");
}

export async function saveProduct(formData: FormData) {
  const id = formData.get("id") as string | null;
  const categoryId = formData.get("categoryId") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const priceLocal = parseInt(formData.get("priceLocal") as string);
  const priceDeliveryRaw = formData.get("priceDelivery") as string;
  const priceDelivery = priceDeliveryRaw ? parseInt(priceDeliveryRaw) : null;
  const available = formData.get("available") === "on";
  const isNew = formData.get("isNew") === "on";
  const order = parseInt(formData.get("order") as string) || 0;

  const image = (formData.get("image") as string) || null;

  const data = { categoryId, name, description, priceLocal, priceDelivery, image, available, isNew, order };

  if (id) {
    await prisma.product.update({ where: { id }, data });
  } else {
    await prisma.product.create({ data });
  }

  revalidatePath("/admin/productos");
  revalidatePath("/");
  redirect("/admin/productos");
}
