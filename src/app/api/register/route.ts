import prisma from "@/libs/prismadb";
import bycrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const { email, password, username } = await request.json();
	if (!email || !password || !username) {
		return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
	}


	const hashedPassword = await bycrypt.hash(password, 12);
    const user = await prisma.user.create({
        data: {
            email,
            username,
            hashedPassword,
        },
    });
    return NextResponse.json({ message: "User created", data: user }, { status: 201 });
}
