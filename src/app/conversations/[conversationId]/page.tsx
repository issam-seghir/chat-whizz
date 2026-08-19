import { Header } from "@/components/layout/header";
import { Body } from "@/components/ui/body";
import { EmptyState } from "@/components/ui/empty-state";
import { getConversationById, getMessages } from "@/libs/query";
import { Form } from "../../../components/layout/form";

interface IParams {
	conversationId: string;
}

const ConversationId = async ({ params }: { params: Promise<IParams> }) => {
	const { conversationId } = await params;
	const conversation = await getConversationById(conversationId);
	const messages = await getMessages(conversationId);

    if(!conversation){
        return (
			<div className="lg:pl-80 justify-center items-center flex ">
					<EmptyState />
			</div>
		);
    }
    return (
		<div className="lg:pl-80 h-full">
			<div className="h-full flex flex-col">
				<Header conversation={conversation} />
				<Body initialMessages={messages} />
				<Form />
			</div>
		</div>
	);
}

export default ConversationId
