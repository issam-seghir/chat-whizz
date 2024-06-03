import { getAllConversation } from "@/libs/actions";
import { ConversationList } from "../../components/conversation-list";
import { SideBar } from "../../components/side-bar";

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
