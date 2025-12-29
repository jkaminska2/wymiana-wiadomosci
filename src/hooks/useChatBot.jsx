import { useEffect, useContext } from "react";
import { ConversationsContext } from "../context/ConversationsContext";
import { UserContext } from "../context/UserContext";
import { ChatContext } from "../context/ChatContext";

const BOT_MESSAGES = [
    "Super!",
    "Ciekawe...",
    "Brzmi ekstra!!",
    "Że co?",
    "Haha!!!",
    "Okej"
];
export default function useChatBot() {
    const { conversations, addMessage } = useContext(ConversationsContext);
    const { currentChat } = useContext(ChatContext);
    const { username } = useContext(UserContext);
    useEffect(() => {
        const last = conversations[currentChat]?.slice(-1)[0];
        if (!last || last.author !== username) return;
        const timeout = setTimeout(() => {
            const random = BOT_MESSAGES[Math.floor(Math.random() * BOT_MESSAGES.length)];
            addMessage(currentChat, random, currentChat);
        }, 1500);
        return () => clearTimeout(timeout);
    }, [conversations, currentChat, addMessage, username]);
}