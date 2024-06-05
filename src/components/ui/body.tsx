"use client";

import useConversation from "@/hooks/useConverstaion";
import { pusherClient } from "@/libs/pusher";
import { FullMessage } from "@/libs/types";
import axios from "axios";
import { find } from "lodash";
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

	useEffect(() => {
		pusherClient.subscribe(conversationId);
		scrollToBottom();

		const messageHandler = (message: FullMessage) => {
			axios.post(`/api/conversations/${conversationId}/seen`);
			setMessages((current) => {
				if (find(current, { id: message.id })) {
					return current;
				}
				return [...current, message];
			});
			scrollToBottom();
		};
		const messageUpdateHandler = (newMessage: FullMessage) => {
			setMessages((current) => current.map((currentMessage) => {
				if(currentMessage.id === newMessage.id) return newMessage
				return currentMessage
			}));
		};
		pusherClient.bind("messages:new", messageHandler);
		pusherClient.bind("messages:update", messageUpdateHandler);
		return () => {
			pusherClient.unsubscribe(conversationId);
			pusherClient.unbind("messages:new", messageHandler);
			pusherClient.unbind("messages:update", messageUpdateHandler);
		};
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
