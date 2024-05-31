import prisma from "@/libs/prismadb";
import bycrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const { email, password, username } = await request.json();
	if (!email || !password || !username) {
		return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
	}
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});
	if (!user || !user?.hashedPassword) {
		return NextResponse.json({ error: "No user found" }, { status: 404 });
	}
	const isValid = await bycrypt.compare(password, user.hashedPassword);
	if (!isValid) {
		return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
	}
	return NextResponse.json({ message: "User logged in", data: user }, { status: 200 });
}
