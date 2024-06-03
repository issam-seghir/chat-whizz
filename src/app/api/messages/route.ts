import { getCurrentUser } from "@/libs/actions";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser?.email || !currentUser?.id) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const { message, image, conversationId } = await request.json();
		if (!message || !image) {
			return new NextResponse("Invalid data", { status: 400 });
		}
		const newMessage = await prisma.message.create({
			data: {
				body: message,
				image,
				conversation: {
					connect: {
						id: conversationId,
					},
				},
				sender: {
					connect: {
						id: currentUser.id,
					},
				},
				seen: {
					connect: {
						id: currentUser.id,
					},
				},
			},
			include: {
				seen: true,
				sender: true,
			},
		});

		const updatedConversation = await prisma.conversation.update({
			where: {
				id: conversationId,
			},
			data: {
				lastMessageAt: new Date(),
				messages: {
					connect: {
						id: newMessage.id,
					},
				},
			},
			include: {
				users: true,
				messages: {
					include: {
						seen: true,
					},
				},
			},
		});
		return NextResponse.json(newMessage);
	} catch (error: any) {
		console.log(error, "MESSAGE ERROR");
		return new NextResponse("Internal Error", { status: 500 });
	}
}
