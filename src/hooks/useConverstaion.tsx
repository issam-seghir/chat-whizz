import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import { useMemo } from 'react';

const useConversation = () => {
    const params = useParams();
    const conversationId = useMemo(() => {
       if(!params?.conversationId) {
        return "";
       }
       return params.conversationId as string;
    }, [params?.conversationId]);
    const [conversations, setConversations] = useState([]);

    const isOpen = useMemo(() => !!conversationId, [conversationId]);

    return useMemo(() => {
        return {
            conversationId,
            isOpen,
        };
    }, [conversationId, isOpen]);
};

export default useConversation;
