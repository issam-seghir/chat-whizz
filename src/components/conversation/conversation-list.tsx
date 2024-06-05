"use client";
import useConversation from "@/hooks/useConverstaion";
import { FullConversation } from "@/libs/types";
import clsx from "clsx";
import { useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import { ConversationBox } from "./conversation-box";
import { GroupChatModel } from "../models/group-chat-model";
import { User } from "@prisma/client";

interface ConversationListProps {
	initialItems: FullConversation[];
	users: User[];
}

export function ConversationList({ users,initialItems }: ConversationListProps) {
	const { conversationId, isOpen } = useConversation();
	const [isModelOpen,setIsModelOpen]  = useState(false)
	return (
		<>
			<GroupChatModel users={users} isOpen={isModelOpen} onClose={() => setIsModelOpen(false)} />

			<aside
				className={clsx(
					"fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200",
					isOpen ? "hidden" : " block w-full left-0"
				)}
			>
				<div className="px-5">
					<div className="flex justify-between items-center mb-4 pt-4">
						<div className="text-2xl font-bold text-neutral-800  py-4">Messages</div>
						<div
							onClick={() => setIsModelOpen(true)}
							className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition"
						>
							<MdOutlineGroupAdd size={20} />
						</div>
					</div>
					{initialItems.map((item) => (
						<ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
					))}
				</div>
			</aside>
		</>
	);
}
