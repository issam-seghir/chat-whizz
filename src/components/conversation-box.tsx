import { FullConversation } from "@/libs/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { Avatar } from "./avatar";
import { Conversation, Message, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import {format} from "date-fns";
import clsx from "clsx";
import useOtherUser from "../hooks/useOtherUser";


interface ConversationBoxProps {
	data: FullConversation;
	selected?: boolean;
}

export function ConversationBox({ data ,selected }: ConversationBoxProps) {
	const router = useRouter();
    const otherUser= useOtherUser(data)
    const session = useSession();

    const handleClick = useCallback(
      () => {
      router.push(`/conversations/${data.id}`)
      },
      [data.id,router],
    )

    const lastMessage = useMemo(() => {
        const messages = data.messages || [];
        return messages[messages.length - 1]
    }, [data.messages])

    const userEmail = useMemo(() => {
        return session.data?.user?.email;
    }, [session.data?.user?.email])


    const hasSeen = useMemo(() => {
		if (!lastMessage) return false;

		const seenArray = lastMessage.seen || [];
		if (!userEmail) return false;
		return seenArray.filter((user) => user.email === userEmail).length !== 0;
	}, [userEmail,lastMessage]);

    const lastMessageText = useMemo(() => {
        if(lastMessage?.image) return "Sent an image"
        if (lastMessage?.body) return lastMessage.body
        return "Started a Conversation"
    }, [lastMessage])

	return (
		<div
			onClick={handleClick}
			className={clsx(
				"w-full relative flex items-center space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer p-3 ",
				selected ? "bg-neutral-100" : "bg-white"
			)}
		>
			<Avatar user={otherUser} />
			<div className="min-w-0 flex-1">
				<div className="focus:outline-none">
					<div className="flex justify-between items-center mb-1">
						<p className="text-md font-medium text-gray-900">{data.name || otherUser?.name}</p>
						{lastMessage?.createdAt && (
							<p className="text-xs font-light text-gray-400">
								{format(new Date(lastMessage.createdAt),"p")}
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
