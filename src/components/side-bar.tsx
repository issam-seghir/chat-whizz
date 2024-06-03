import React from "react";
import { DesktopSideBar } from "./desktop-side-bar";
import {MobileFooter} from "./mobile-footer";
import { getCurrentUser } from "@/libs/actions";
import { User } from "@prisma/client";

export async function SideBar({ children }: { children: React.ReactNode }) {
	const currentUser : User | null = await getCurrentUser();
	return (
		<div className="h-full">
			<DesktopSideBar currentUser={currentUser} />
			<MobileFooter currentUser={currentUser}/>
			<main className="lg:pl-20 h-full">{children}</main>
		</div>
	);
}
