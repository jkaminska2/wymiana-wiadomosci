import { useQuery } from "@tanstack/react-query";
import { useEffect, useContext } from "react";
import { ConversationsContext } from "../context/ConversationsContext";
import { ChatContext } from "../context/ChatContext";
import { fetchBotReply } from "../api/bot";

export default function useChatBot() {
    const { addMessage, lastUserMessageId, resetLastUserMessageId } = useContext(ConversationsContext);
    const { currentChat } = useContext(ChatContext);
    const { data } = useQuery({
        queryKey: ["botReply", lastUserMessageId],
        queryFn: () => fetchBotReply(),
        enabled: !!lastUserMessageId,
        staleTime: 0,
        cacheTime: 0
    });
    useEffect(() => {
        if (!data) return;
        const timeout = setTimeout(() => {
            addMessage(currentChat, data, currentChat);
            resetLastUserMessageId();
        }, 1500);
        return () => clearTimeout(timeout);
    }, [data]);
}