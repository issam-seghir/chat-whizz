"use client";

import useOtherUser from "@/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo } from "react";
import { HiChevronLeft, HiEllipsisHorizontalCircle } from "react-icons/hi2";
import { Avatar } from "./avatar";
// interface HeaderProps {
// 	conversation: Conversation & {
// 		users: User[];
// 	};
// }
export function Body() {

	return (
		<div className="flex-1 overflow-y-auto">
			Body
		</div>
	);
}
