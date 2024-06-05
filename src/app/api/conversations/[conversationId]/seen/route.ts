import prisma from "@/libs/prismadb";
import { getCurrentUser } from "@/libs/query";
import { NextResponse } from "next/server";
import { pusherServer } from "@/libs/pusher";

interface IParams {
	conversationId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser?.data?.email || !currentUser?.data?.id) {
			return new NextResponse("Unauthorized", { status: 401 });
		}
		const { conversationId } = params;

		if (!conversationId) {
			return new NextResponse("Invalid data", { status: 400 });
		}
		const conversation = await prisma.conversation.findUnique({
			where: {
				id: conversationId,
			},
			include: {
				messages: {
					include: {
						seen: true,
					},
				},
				users: true,
			},
		});
		const lastMessage = conversation?.messages[conversation.messages.length - 1];
		if (!lastMessage) return NextResponse.json(conversation);

		const updatedMessage = await prisma.message.update({
			where: {
				id: lastMessage.id,
			},
			data: {
				seen: {
					connect: {
						id: currentUser.data.id,
					},
				},
			},
			include: {
				sender: true,
				seen: true,
			},
		});

		await pusherServer.trigger(currentUser.data.email, "conversation:update", {
			id: conversationId,
			message: [updatedMessage],
		});
		if(lastMessage.senderId.indexOf(currentUser.data.id) !== 1) return NextResponse.json(conversation)

		await pusherServer.trigger(conversationId!, "message:update", updatedMessage);

		return NextResponse.json(updatedMessage);
	} catch (error: any) {
		console.log(error, "SEEN ERROR");
		return new NextResponse("Internal Error", { status: 500 });
	}
}
