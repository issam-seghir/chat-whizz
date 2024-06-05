"use client";

import useRoutes from "../../hooks/useRoutes";

import useConversation from "@/hooks/useConverstaion";
import { User } from "@prisma/client";
import { MobileSideBarItem } from "./mobile-side-bar-item";
export function MobileFooter({ currentUser} : { currentUser: User | null}) {
	const routes = useRoutes();
	const { isOpen } = useConversation();
	if (isOpen) {
		return null;
	}
	return (
		<div className="fixed justify-between w-full bottom-0 flex items-center  z-40 bg-white lg:hidden border-t-[1px] ">
			{routes.map((route) => (
				<MobileSideBarItem key={route.name} {...route} />
			))}
		</div>
	);
}
