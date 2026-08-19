import { AuthOptions } from "next-auth";

import bycrypt from "bcrypt";

import prisma from "@/libs/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,
	debug: process.env.NODE_ENV === "development",
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			// 	 profile(profile) {
			// return {
			//   id: profile.id.toString(),
			//   name: profile.name || profile.login,
			//   username: profile.login,
			//   email: profile.email,
			//   image: profile.avatar_url,
			//   followers: profile.followers,
			//   verified: true
			// };
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
};
