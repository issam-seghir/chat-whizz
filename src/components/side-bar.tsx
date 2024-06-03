import { getCurrentUser } from "@/libs/query";
import { User } from "@prisma/client";
import React from "react";
import { DesktopSideBar } from "./desktop-side-bar";
import { MobileFooter } from "./mobile-footer";

export async function SideBar({ children }: { children: React.ReactNode }) {
	const data = await getCurrentUser();
	const currentUser: User | null = data?.data || null;
	return (
		<div className="h-full">
			<DesktopSideBar currentUser={currentUser} />
			<MobileFooter currentUser={currentUser}/>
			<main className="lg:pl-20 h-full">{children}</main>
		</div>
	);
}
