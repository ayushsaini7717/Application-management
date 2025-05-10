import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import type { User } from "next-auth";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "email", placeholder: "Enter your email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user=await prisma.user.findFirst({
          where: {
            email: credentials?.username,
          }
        })
        if(user){
          const verify=await bcrypt.compare(credentials?.password!,user?.password);
          if (verify) {
            return user;
          }
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: "/signup"
  },
  callbacks: {
    async signIn({ user }: { user: User }) {
      if (!user.email) return false;

      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!existingUser) {
        redirect("/signup");
      }

      return true;
    },
  },
};