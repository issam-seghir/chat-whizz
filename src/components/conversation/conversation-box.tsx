import { FullConversation, FullMessage } from "@/libs/types";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import useOtherUser from "../../hooks/useOtherUser";
import { Avatar } from "../ui/avatar";
import { GroupAvatar } from "../ui/group-avatar";

interface ConversationBoxProps {
	data: FullConversation;
	selected?: boolean;
}

export function ConversationBox({ data, selected }: ConversationBoxProps) {
	const router = useRouter();
	const otherUser = useOtherUser(data);
	const session = useSession();
	const [lastMessage, setLastMessage] = useState<FullMessage | null>(null);

	const handleClick = useCallback(() => {
		router.push(`/conversations/${data.id}`);
	}, [data.id, router]);

	useEffect(() => {
		if (data.messages && data.messages.length > 0) {
			setLastMessage(data.messages[data.messages.length - 1]);
		}
	}, [data.messages]);

	const userEmail = useMemo(() => {
		return session.data?.user?.email;
	}, [session.data?.user?.email]);

	const hasSeen = useMemo(() => {
		if (!lastMessage) return false;

		const seenArray = lastMessage.seen || [];
		if (!userEmail) return false;
		return seenArray.filter((user) => user.email === userEmail).length !== 0;
	}, [userEmail, lastMessage]);

	const lastMessageText = useMemo(() => {
		if (lastMessage?.image) return "Sent an image";
		if (lastMessage?.body) return lastMessage.body;
		return "Started a Conversation";
	}, [lastMessage]);

	return (
		<div
			onClick={handleClick}
			className={clsx(
				"w-full relative mb-3 bg-card  hover:bg-accent flex items-center space-x-3  rounded-lg transition cursor-pointer p-3 ",
				selected ? "bg-accent text-accent-foreground" : "hover:bg-accent/50 transition-colors"
			)}
		>
			{data.isGroup ? <GroupAvatar users={data.users} /> : <Avatar user={otherUser} />}
			<div className="min-w-0 flex-1">
				<div className="focus:outline-none">
					<div className="flex justify-between items-center mb-1">
						<p className="text-md font-medium">{data.name || otherUser?.name}</p>
						{lastMessage?.createdAt && (
							<p className="text-xs font-light text-muted-foreground">
								{format(new Date(lastMessage.createdAt), "p")}
							</p>
						)}
					</div>
					<p
						className={clsx(
							"truncate text-sm",
							hasSeen ? "text-muted-foreground" : "dark:text-dark-50 font-semibold"
						)}
					>
						{lastMessageText}
					</p>
				</div>
			</div>
		</div>
	);
}
