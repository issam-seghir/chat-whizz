"use client";

import useConversation from "@/hooks/useConverstaion";
import { FullMessage } from "@/libs/types";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import MessageBox from "../conversation/message-box";
interface BodyProps {
	initialMessages: FullMessage[];
}
export function Body({ initialMessages }: BodyProps) {
	const [messages, setMessages] = useState(initialMessages);
	const messageRef = useRef<HTMLDivElement>(null);
	const { conversationId } = useConversation();
	const scrollToBottom = () => {
		messageRef.current?.scrollIntoView({ behavior: "smooth" });
	};
	useEffect(() => {
		scrollToBottom();
	}, [messages]);
	useEffect(() => {
		axios.post(`/api/conversations/${conversationId}/seen`);
	}, [conversationId]);

	return (
		<div className="flex-1 overflow-y-auto">
			{messages.map((message, i) => (
				<MessageBox key={message.id} isLast={i === messages.length - 1} data={message} />
			))}
			<div ref={messageRef} className="pt-8" />
		</div>
	);
}
