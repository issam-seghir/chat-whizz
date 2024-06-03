"use client";

import useOtherUser from "@/hooks/useOtherUser";
import { Conversation, User, Message } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState, useRef, useEffect } from "react";
import { HiChevronLeft, HiEllipsisHorizontalCircle } from "react-icons/hi2";
import { Avatar } from "./avatar";
import { FullMessage } from "@/libs/types";
import useConversation from "@/hooks/useConverstaion";
import MessageBox from "./message-box";
interface BodyProps {
	initialMessages: FullMessage[];
}
export function Body({ initialMessages }: BodyProps) {
	const [messages, setMessages] = useState(initialMessages);
	const messageRef = useRef<HTMLDivElement>(null);
	const {conversationId} = useConversation();
	const scrollToBottom = () => {
		messageRef.current?.scrollIntoView({ behavior: "smooth" });
	};
	useEffect(() => {
	  scrollToBottom();

	}, [messages]);

	// const otherUser = useOtherUser(messages[0]?.conversation);
	// const lastMessage = useMemo(() => {
	// 	return messages[messages.length - 1];
	// }, [messages]);
	// const lastMessageText = useMemo(() => {
	// 	if (lastMessage?.image) return "Sent an image";
	// 	if (lastMessage?.body) return lastMessage.body;
	// 	return "Started a conversation";
	// }, [lastMessage]);
	// const lastMessageDate = useMemo(() => {
	// 	if (!lastMessage) return "";
	// 	return new Date(lastMessage.createdAt).toLocaleString();
	// }, [lastMessage]);
	// const lastMessageSeen = useMemo(() => {
	// 	if (!lastMessage) return false;
	// 	const seenArray = lastMessage.seen || [];
	// 	return seenArray.length === 2;
	// }, [lastMessage]);
	// const lastMessageSeenText = useMemo(() => {
	// 	if (!lastMessageSeen) return "";
	// 	return "Seen";
	// }, [lastMessageSeen]);
	// const lastMessageSeenIcon = useMemo(() => {
	// 	if (!lastMessageSeen) return null;
	// 	return <HiEllipsisHorizontalCircle className="text-gray-400" />;
	// }, [lastMessageSeen]);
	// const lastMessageSeenClass = useMemo(() => {
	// 	if (!lastMessageSeen) return "";
	// 	return "text-gray-400";
	// }, [lastMessageSeen]);
	// const lastMessageSeenContainerClass = useMemo(() => {
	// 	if (!lastMessageSeen) return "";
	// 	return "flex items-center gap-1";
	// }, [lastMessageSeen]);
	// const lastMessageSeenContainer = useMemo(() => {
	// 	if (!lastMessageSeen) return null;
	// 	return <div className={lastMessageSeenContainerClass}>
	// 		{lastMessageSeenIcon}
	// 		<span className={lastMessageSeenClass}>{lastMessageSeenText}</span>
	// 	</div>;
	// }, [lastMessageSeen]);
	// const lastMessageContainer = useMemo(() => {
	// 	return <div className="flex items-center gap-1">
	// 		<span>{lastMessageText}</span>
	// 		{lastMessageSeenContainer}
	// 	</div>;
	// }, [lastMessageText, lastMessageSeenContainer]);
	// const lastMessageDateContainer = useMemo(() => {
	// 	return <div className="text-gray-400 text-sm">{lastMessageDate}</div>;
	// }, [lastMessageDate]);
	// const conversationLink = useMemo(() => {
	// 	return `/conversations/${messages[0]?.conversationId}`;
	// }, [messages[0]?.conversationId]);
	// const conversationName = useMemo(() => {
	// 	return messages[0]?.conversation?.name || otherUser?.name;
	// }, [messages[0]?.conversation?.name, otherUser?.name]);
	// const conversationAvatar = useMemo(() => {
	// 	return <Avatar user={otherUser} />;
	// }, [otherUser]);
	// const conversationHeader = useMemo(() => {
	// 	return <div className="flex items-center justify-between">
	// 		<Link href={conversationLink}>
	// 			<a className="flex items-center gap-2">
	// 				<HiChevronLeft className="text-gray-400" />
	// 				{conversationAvatar}
	// 				<span>{conversationName}</span>
	// 			</a>
	// 		</Link>
	// 	</div>;
	// }
	// , [conversationLink, conversationAvatar, conversationName]);
	// const messageItem = useMemo(() => {
	// 	return messages.map((message) => (
	// 		<MessageItem key={message.id} message={message} />
	// 	));
	// }, [messages]);
	return(
		 <div className="flex-1 overflow-y-auto">
			{messages.map((message,i) => (
				<MessageBox key={message.id} isLast={i === messages.length -1 } data={message} />
			))}
			<div ref={messageRef} className="pt-24" />
	</div>);
}
