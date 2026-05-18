import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signIn } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Faltan credenciales" }, { status: 400 });
  }

  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: "Email o contraseña incorrectos." }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return NextResponse.json({ error: "Email o contraseña incorrectos." }, { status: 401 });
  }

  await signIn("credentials", { email, password, redirect: false });

  return NextResponse.json({ ok: true });
}
