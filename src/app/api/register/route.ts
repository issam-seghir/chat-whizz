import bycrypt from "bcrypt";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { email, password,username } = await request.json();
    if (!email || !password || !username) {
        return NextResponse("Missing credentials");
    }
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (!user || !user?.hashedPassword) {
        return NextResponse.unauthorized("No user found");
    }
    const isValid = await bycrypt.compare(password, user.hashedPassword);
    if (!isValid) {
        return NextResponse.unauthorized("Invalid password");
    }
    return NextResponse.ok({
        user,
    });
}
