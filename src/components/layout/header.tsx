"use client";

import useOtherUser from "@/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HiChevronLeft, HiEllipsisHorizontalCircle } from "react-icons/hi2";
import { Avatar } from "../ui/avatar";
import { ProfileDrawer } from "./profile-drawer";
import { GroupAvatar } from "../ui/group-avatar";
import useActiveList from "@/hooks/useActiveList";

interface HeaderProps {
	conversation: Conversation & {
		users: User[];
	};
}
export function Header({ conversation }: HeaderProps) {
	const otherUser = useOtherUser(conversation);
	const [drawerOpen,setDrawerOpen] =  useState(false)
	const { members } = useActiveList();
	const isActive = members.includes(otherUser?.email || "");
	const statusText = useMemo(() => {
		if (conversation.isGroup) return `${conversation.users.length} members`;
		return isActive ? "Active" : "Offline";
	}, [conversation, isActive]);


	return (
		<>
			<ProfileDrawer data={conversation} isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
			<div className="bg-card w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm ">
				<div className="flex gap-3 items-center">
					<Link
						className="lg:hidden block text-primary hover:opacity-75 transition cursor-pointer"
						href="/conversations"
					>
						<HiChevronLeft size={32} />
					</Link>
					<div className=" flex gap-3 items-center justify-center cursor-pointer" onClick={() => setDrawerOpen(true)}>
						{conversation.isGroup ? (
							<GroupAvatar users={conversation.users} />
						) : (
							<Avatar user={otherUser} />
						)}
						<div className="flex flex-col">
							<div>{conversation.name || otherUser?.name}</div>
							<div className="text-sm font-light text-muted-foreground">{statusText}</div>
						</div>
					</div>
				</div>
				<HiEllipsisHorizontalCircle
					size={32}
					onClick={() => setDrawerOpen(true)}
					className="text-primary cursor-pointer hover:opacity-75 transition"
				/>
			</div>
		</>
	);
}
