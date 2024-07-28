"use client";
import useConversation from "@/hooks/useConverstaion";
import { pusherClient } from "@/libs/pusher";
import { FullConversation } from "@/libs/types";
import { User } from "@prisma/client";
import clsx from "clsx";
import { find } from "lodash";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import { GroupChatModel } from "../models/group-chat-model";
import { ConversationBox } from "./conversation-box";
import { Button } from "@/components/ui/button";

interface ConversationListProps {
	initialItems: FullConversation[];
	users: User[];
}

export function ConversationList({ users, initialItems }: ConversationListProps) {
	const { conversationId, isOpen } = useConversation();
	const [isModelOpen, setIsModelOpen] = useState(false);
	const router = useRouter();
	const [items, setItems] = useState(initialItems);
	const session = useSession();
	const pusherKey = useMemo(() => session?.data?.user?.email, [session?.data?.user?.email]);
	useEffect(() => {
		if (!pusherKey) return;

		pusherClient.subscribe(pusherKey);

		const conversationHandler = (conversation: FullConversation) => {
			setItems((current) => {
				if (find(current, { id: conversation.id })) {
					return current;
				}
				return [conversation, ...current];
			});
		};
		const updateConversationHandler = (newConversation: FullConversation) => {
			setItems((current) =>
				current.map((currentConversation) => {
					if (currentConversation.id === newConversation.id) {
						return {
							...currentConversation,
							messages: newConversation.messages,
						};
					}
					return currentConversation;
				})
			);
		};
		const removeConversationHandler = (conversation: FullConversation) => {
			setItems((current) => {
				return [...current.filter((conver) => conver.id !== conversation.id)];
			});
			if (conversation.id === conversationId) return router.push("/conversation");
		};

		pusherClient.bind("conversation:new", conversationHandler);
		pusherClient.bind("conversation:update", updateConversationHandler);
		pusherClient.bind("conversation:remove", removeConversationHandler);
		return () => {
			pusherClient.unsubscribe(pusherKey);
			pusherClient.unbind("conversation:new", conversationHandler);
			pusherClient.unbind("conversation:update", updateConversationHandler);
			pusherClient.unbind("conversation:remove", removeConversationHandler);
		};
	}, [pusherKey, conversationId, router]);

	return (
		<>
			<GroupChatModel users={users} isOpen={isModelOpen} onClose={() => setIsModelOpen(false)} />

			<aside
				className={clsx(
					"fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r ",
					isOpen ? "hidden" : " block w-full left-0"
				)}
			>
				<div className="px-5">
					<div className="flex justify-between items-center mb-4 pt-4">
						<div className="text-2xl font-bold py-4">Messages</div>
						<Button
							onClick={() => setIsModelOpen(true)}
							className="rounded-full p-2 cursor-pointer hover:opacity-75 transition"
						>
							<MdOutlineGroupAdd size={20} />
						</Button>
					</div>
					{items.map((item) => (
						<ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
					))}
				</div>
			</aside>
		</>
	);
}
