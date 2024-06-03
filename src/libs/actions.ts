import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/libs/prismadb";

export async function getSession() {
	const session = await getServerSession(authOptions);
	return session;
}

export async function getCurrentUser() {
	try {
		const session = await getSession();
		if (!session?.user?.email) return null;

		const currentUser = await prisma.user.findUnique({
			where: {
				email: session.user.email as string,
			},
		});
		if (!currentUser) return null;
		return currentUser;
	} catch (error: any) {
		return null;
	}
}

/**
 ** Get All users Except the Current User
 */
export async function getAllUsers() {
	try {
		const session = await getSession();
		if (!session?.user?.email) return [];

		const users = await prisma.user.findMany({
			where: {
				NOT: {
					email: session?.user?.email,
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});
		return users;
	} catch (error: any) {
		return [];
	}
}
