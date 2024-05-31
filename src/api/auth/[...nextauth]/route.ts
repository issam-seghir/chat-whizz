import bycrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth , {AuthOptions} from 'next-auth';
import { PrismaAdapter  } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import prisma from "@/libs/prismadb";
import { PrismaClient } from "@prisma/client";

// fix prisma adapter typing error when used with prisma extensions like
// prisma extension accelerate
//? see the issus : https://github.com/nextauthjs/next-auth/pull/9798
//? see the fix : https://github.com/nextauthjs/next-auth/commit/29c56dcbf3085d992535a3248d0f6257a12ac0d0

export function ExtendedPrismaAdapter(
  prisma: PrismaClient | ReturnType<PrismaClient["$extends"]>
): ReturnType<typeof PrismaAdapter> {
  const p = prisma as PrismaClient;
  // Add your own functionality here
  return PrismaAdapter(p);
}

export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		GithubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		}),
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "email", type: "email" },
				password: { label: "password", type: "password" },
			},
			async authorize(credentials) {
				{
					if (!credentials?.email || !credentials?.password) {
						throw new Error("Missing credentials");
					}
					const user = await prisma.user.findUnique({
						where: {
							email: credentials.email,
						},
					});
					if (!user || !user?.hashedPassword) {
						throw new Error("No user found");
					}
					const isValid = await bycrypt.compare(credentials.password, user.hashedPassword);
					if (!isValid) {
						throw new Error("Invalid password");
					}
					return user;
				}
			},
		}),
	],
	adapter: ExtendedPrismaAdapter(prisma),
});