import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import prisma from "@/app/libs/prismadb";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { welcomeMail } from '@/app/providers/nodemailer';
import nodemailer from "nodemailer";

const emailSender = "pedrocmartinez568@gmail.com"

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: emailSender,
    pass: process.env.MAILER_PASSWORD
  },
});

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        
        if (!user || !user?.hashedPassword)
          throw new Error("Invalid credentials");

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword)
          throw new Error("The password or email does not match");

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user.email && user.name) {

        const userDB = await prisma.user.findUnique({
          where: {
            email: user.email,
          },
        });
        console.log('EXISTE?', userDB)

        if (!userDB) {
          console.log('NO EXISTEEEE')
          const mailOptions = {
            from: emailSender,
            to: user.email,
            subject: `Welcome to Airbnb ${user.name}!`,
            text: `Welcome to Airbnb ${user.name}!`,
            html: `
            <h1>${user.name} You signed up Airbnb</h1>
            <p>Enjoy traveling with all available trips around the world!</p>
            `
          };


          await transporter.sendMail(mailOptions);
        }

      }
      return true
    },
  },
  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
