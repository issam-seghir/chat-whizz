import { getAllConversation, getAllUsers } from "@/libs/query";
import { ConversationList } from "../../components/conversation/conversation-list";
import { SideBar } from "../../components/layout/side-bar";

export default async function ConversationLayout({ children }: { children: React.ReactNode }) {
	const conversations = await getAllConversation();
	const users = await getAllUsers();
	return (
		<SideBar>
			<div className="h-full">
				<ConversationList users={users} initialItems={conversations} />
				{children}
			</div>
		</SideBar>
	);
}
