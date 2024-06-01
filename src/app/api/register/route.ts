import prisma from "@/libs/prismadb";
import bycrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const { email, password, username } = await request.json();

		// Check for missing credentials
		if (!email || !password || !username) {
			return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
		}

		// Check if user already exists
		const existingUser = await prisma.user.findUnique({ where: { email } });
		if (existingUser) {
			return NextResponse.json({ error: "User already exists" }, { status: 400 });
		}

		// Hash password and create user
		const hashedPassword = await bycrypt.hash(password, 12);
		const user = await prisma.user.create({
			data: {
				email,
				username,
				hashedPassword,
			},
		});
		return NextResponse.json({ message: "User created", user: user }, { status: 201 });
	} catch (error: any) {
		console.log(error, "REGESTER ERROR");
        return new NextResponse("Internal Error",{ status: 500 });
	}
}
