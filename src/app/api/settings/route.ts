import prisma from "@/libs/prismadb";
import { getCurrentUser } from "@/libs/query";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser?.data?.email || !currentUser?.data?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
		}
        const {name, image } = await request.json();

		if (!image && !name) {
			return new NextResponse("Invalid data", { status: 400 });
		}

			const updatedUser = await prisma.user.update({
                where : {
                    id: currentUser?.data?.id
                },
                data:{
                    name,
                    image
                }
			});
			return NextResponse.json(updatedUser);


	} catch (error: any) {
		console.log(error, "CONVERSATION ERROR");
		return new NextResponse("Internal Error", { status: 500 });
	}
}
