import { Header } from "@/components/layout/header";
import { Body } from "@/components/ui/body";
import { EmptyState } from "@/components/ui/empty-state";
import { getConversationById, getMessages } from "@/libs/query";
import { Form } from "../../../components/form";

interface IParams {
	conversationId: string;
}


const ConversationId = async ({params} : {params:IParams})=>{
    const conversation = await getConversationById(params.conversationId);
    const messages = await getMessages(params.conversationId);

    if(!conversation){
        return (
            <div className="lg:pl-80 h-full">
                <div className="h-full flex flex-col">
                    <EmptyState />
                </div>
            </div>
        )
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
