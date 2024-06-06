import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/utils";
import prisma from "@/libs/prismadb";

export async function getSession() {
	const session = await getServerSession(authOptions);
	return session;
}

export async function getCurrentUser() {
	try {
		const session = await getSession();
		if (!session?.user?.email) return null;

		const currentUser = await prisma.user
			.findUnique({
				cacheStrategy: {
					swr: 60,
				},
				where: {
					email: session.user.email as string,
				},
			})
			.withAccelerateInfo();
		if (!currentUser) return null;
		return currentUser;
	} catch (error: any) {
		console.log(error);
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
		console.log(error);
		return [];
	}
}

/**
 ** Get All Conversations of the Current User
 */
export async function getAllConversation() {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser?.data?.id) {
			return [];
		}

		const conversations = await prisma.conversation.findMany({
			where: {
				userIds: {
					has: currentUser?.data?.id,
				},
			},
			include: {
				users: true,
				messages: {
					include: {
						sender: true,
						seen: true,
					},
				},
			},
			orderBy: {
				lastMessageAt: "desc",
			},
		});
		return conversations;
	} catch (error: any) {
		console.log(error);
		return [];
	}
}

/**
 ** Get  Conversation By id
 */

export async function getConversationById(conversationId: string) {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser?.data?.id) {
			return null;
		}

		const conversation = await prisma.conversation.findUnique({
			where: {
				id: conversationId,
			},
			include: {
				users: true,
			},
		});
		return conversation;
	} catch (error: any) {
		console.log(error);

		return null;
	}
}

/**
 ** Get  Messages
 */

export async function getMessages(conversationId: string) {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser?.data?.id) {
			return [];
		}

		const messages = await prisma.message.findMany({
			where: {
				conversationId: conversationId,
			},
			include: {
				sender: true,
				seen: true,
			},
			orderBy: {
				createdAt: "asc",
			},
		});
		return messages;
	} catch (error: any) {
		console.log(error);
		return [];
	}
}
