import { Conversation } from "@prisma/client";
import { getConversationById } from "@/libs/actions";
import { getMessages } from "@/libs/actions";
import { EmptyState } from "@/components/empty-state";
import { Header } from "@/components/header";

interface IParams {
    ConversationId:string
}


const ConversationId = async ({params} : {params:IParams})=>{
    const conversation = await getConversationById(params.ConversationId);
    const messages = await getMessages(params.ConversationId);

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
            </div>
		</div>
	);
}

export default ConversationId
