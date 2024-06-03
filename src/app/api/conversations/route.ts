import prisma from "@/libs/prismadb";
import { getCurrentUser } from "@/libs/query";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const currentUser = await getCurrentUser();
		const { userId, isGroup, members, name } = await request.json();
		if (!currentUser?.data?.email || !currentUser?.data?.id) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

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
								id: currentUser?.data.id,
							},
						],
					},
				},
				include: {
					users: true,
				},
			});
			return NextResponse.json(newConversation);
		}

		const exisitingConversations = await prisma.conversation.findMany({
			where: {
				OR: [
					{
						userIds: {
							equals: [currentUser?.data.id, userId],
						},
					},
					{
						userIds: {
							equals: [userId, currentUser?.data.id],
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
							id: currentUser?.data.id,
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
        return NextResponse.json(newConversation);
	} catch (error: any) {
		console.log(error, "CONVERSATION ERROR");
		return new NextResponse("Internal Error", { status: 500 });
	}
}
