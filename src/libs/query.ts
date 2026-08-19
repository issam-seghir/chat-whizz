import prisma from "@/libs/prismadb";
import { FullConversation, FullMessage } from "@/libs/types";
import { authOptions } from "@/libs/utils";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth/next";

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
		console.log(error);
		return null;
	}
}

/**
 ** Get All users Except the Current User
 */
export async function getAllUsers(): Promise<User[]> {
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
export async function getAllConversation(): Promise<FullConversation[]> {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser?.id) {
			return [];
		}

		const conversations = await prisma.conversation.findMany({
			where: {
				userIds: {
					has: currentUser.id,
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
		return conversations as FullConversation[];
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
		if (!currentUser?.id) {
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

export async function getMessages(conversationId: string): Promise<FullMessage[]> {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser?.id) {
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
		return messages as FullMessage[];
	} catch (error: any) {
		console.log(error);
		return [];
	}
}
