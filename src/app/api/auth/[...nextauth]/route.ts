import NextAuth , {AuthOptions} from "next-auth";
import bycrypt from "bcrypt";

// Prisma
import prisma from "@/libs/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

// Providers
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

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

export const authOptions  : AuthOptions= {
	adapter: ExtendedPrismaAdapter(prisma),
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
} ;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
