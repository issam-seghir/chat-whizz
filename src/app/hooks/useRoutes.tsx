import { signOut } from "next-auth/react";
import { Url } from "next/dist/shared/lib/router/router";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { IconType } from "react-icons";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";

import useConversation from "@/app/hooks/useConverstaion";

interface Route {
	name: string;
	path?: string;
	href?: Url;
	icon: IconType;
	active?: boolean;
	onClick?: () => void;
}

const useRoutes = (): Route[] => {
	const pathname = usePathname();
	const { conversationId } = useConversation();

	const routes = useMemo(() => {
		return [
			{
				name: "Chat",
				path: "/conversations",
				icon: HiChat,
				active: pathname === "/conversations" || !!conversationId,
			},
			{
				name: "Users",
				path: `/users`,
				icon: HiUsers,
				active: pathname === "/users",
			},
			{
				name: "Logout",
				href: "#",
				icon: HiArrowLeftOnRectangle,
				onClick: () => signOut({ callbackUrl: "/", redirect: true }),
			},
		];
	}, [pathname, conversationId]);
	return routes;
};

export default useRoutes;
