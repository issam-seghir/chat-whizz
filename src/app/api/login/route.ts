import prisma from "@/libs/prismadb";
import bycrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const { email, password } = await request.json();

		// Check for missing credentials
		if (!email || !password) {
			return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
		}
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (!existingUser) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }
        // Check if password is correct
        const passwordMatch = await bycrypt.compare(password, existingUser.hashedPassword);
        if (!passwordMatch) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
        }
        return NextResponse.json({ message: "Login successfully", user: existingUser }, { status: 200 });

	} catch (error: any) {
		console.log(error, "REGESTER ERROR");
		return new NextResponse("Internal Error", { status: 500 });
	}
}
