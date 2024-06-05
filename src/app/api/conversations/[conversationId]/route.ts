import prisma from "@/libs/prismadb";
import { getCurrentUser } from "@/libs/query";
import { NextResponse } from "next/server";
import { pusherServer } from "@/libs/pusher";
interface IParams {
	conversationId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser?.data?.email || !currentUser?.data?.id) {
			return new NextResponse("Unauthorized", { status: 401 });
		}
		const { conversationId } = params;

		if (!conversationId) {
			return new NextResponse("Invalid data", { status: 400 });
		}
		const existingConversation = await prisma.conversation.findUnique({
			where: {
				id: conversationId,
			},
			include: {
				users: true,
			},
		});
		if (!existingConversation) return new NextResponse("Conversation doesn't exist", { status: 400 });

		const deletedConversation = await prisma.conversation.delete({
			where: {
				id: conversationId,
				userIds: {
					hasSome: [currentUser.data.id],
				},
			},
		});
		existingConversation.users.forEach(user => {
			if(user.email) {
				return pusherServer.trigger(user.email, "conversation:remove",existingConversation);
			}
		});;

		return NextResponse.json(deletedConversation);
	} catch (error: any) {
		console.log(error, "CONVERSATION  DELETE ERROR");
		return new NextResponse("Internal Error", { status: 500 });
	}
}
