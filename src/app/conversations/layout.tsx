import { getAllConversation } from "@/libs/query";
import { ConversationList } from "../../components/conversation/conversation-list";
import { SideBar } from "../../components/layout/side-bar";

export default async function ConversationLayout({ children }: { children: React.ReactNode }) {
	const conversations = await getAllConversation();
	return (
		<SideBar>
			<div className="h-full">
				<ConversationList initialItems={conversations} />
				{children}
			</div>
		</SideBar>
	);
}
