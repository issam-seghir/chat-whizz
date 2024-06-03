import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullConversation } from "../libs/types";
import { User } from "@prisma/client";


const useOtherUser = (conversation: FullConversation | { users: User[] }) => {
	const { data: session } = useSession();

	const otherUser = useMemo(() => {
		if (!session?.user?.email) return null;
		return conversation.users.filter((user) => user.email !== session?.user?.email);
	}, [session?.user?.email, conversation.users]);
	return otherUser?.[0];
};

export default useOtherUser;
