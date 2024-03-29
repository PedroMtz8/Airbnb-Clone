import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { welcomeMail } from '@/app/providers/nodemailer';

export async function POST(req: Request) {
  const body = await req.json();

  const { email, name, password } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    }
  });
  if (existingUser) {
    return new Response('User already exists', { status: 400 });
  }

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });
  console.log('antes de enviar el correo')
  await welcomeMail(name, email);
  console.log('despues de enviar el correo')

  return NextResponse.json(user);
}