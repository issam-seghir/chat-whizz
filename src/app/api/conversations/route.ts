import prisma from "@/libs/prismadb";
import { getSession } from "@/libs/query";
import { NextResponse } from "next/server";
// import { pusherServer } from "@/libs/pusher";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
	try {
		const session = await getSession();
		if (!session?.user?.email ) {
			return new NextResponse("Unauthorized", { status: 401 });
		}
		const currentUser = await prisma.user.findUnique({
			where: {
				email: session?.user?.email as string,
			},
			});
		if (!currentUser?.email || !currentUser?.id) {
			return new NextResponse("Unauthorized", { status: 401 });
		}
		const { userId, isGroup, members, name } = await request.json();

		if (isGroup && (!members || members.length < 2 || !name)) {
			return new NextResponse("Invalid data", { status: 400 });
		}

		if (isGroup) {
			const newConversation = await prisma.conversation.create({
				data: {
					name,
					isGroup,
					users: {
						connect: [
							...members.map((member: { value: string }) => ({
								id: member.value,
							})),
							{
								id: currentUser?.id,
							},
						],
					},
				},
				include: {
					users: true,
				},
			});
			// newConversation.users.forEach(user => {
			// 	if(user.email) {
			// 		pusherServer.trigger(user.email,"conversation:new",newConversation)
			// 	}
			// });
			return NextResponse.json(newConversation);
		}

		const exisitingConversations = await prisma.conversation.findMany({
			where: {
				OR: [
					{
						userIds: {
							equals: [currentUser?.id, userId],
						},
					},
					{
						userIds: {
							equals: [userId, currentUser?.id],
						},
					},
				],
			},
		});
		const singleConversation = exisitingConversations[0];

		if (singleConversation) {
			return NextResponse.json(singleConversation);
		}

		const newConversation = await prisma.conversation.create({
			data: {
				users: {
					connect: [
						{
							id: currentUser?.id,
						},
						{
							id: userId,
						},
					],
				},
			},
			include: {
				users: true,
			},
		});
		// newConversation.users.forEach((user) => {
		// 	if (user.email) {
		// 		pusherServer.trigger(user.email, "conversation:new", newConversation);
		// 	}
		// });
        return NextResponse.json(newConversation);
	} catch (error: any) {
		console.log(error, "CONVERSATION ERROR");
		return new NextResponse("Internal Error", { status: 500 });
	}
}
