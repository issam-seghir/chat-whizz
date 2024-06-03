import { Conversation, Message, User } from "@prisma/client";

export type FullMessage = Message & {
	sender: User;
	seen: User[];
};

export type FullConversation = Conversation & {
	users: User[];
	messages: FullMessage[];
};
