import { useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";

const BOT_MESSAGES = [
    "Super!",
    "Ciekawe...",
    "Brzmi ekstra!!",
    "Że co?",
    "Haha!!!",
    "Okej"
];
export default function useChatBot() {
    const { conversations, currentChat, addMessage } = useContext(AppContext);
    useEffect(() => {
        const messages = conversations[currentChat] || [];
        if (messages.length === 0) return;
        const lastMessage = messages[messages.length - 1];
        if (lastMessage.author !== "me") return;
        const timeout = setTimeout(() => {
            const random = BOT_MESSAGES[Math.floor(Math.random() * BOT_MESSAGES.length)];
            addMessage(currentChat, random, "bot");
        }, 1500);
        return () => clearTimeout(timeout);
    }, [conversations, currentChat, addMessage]);
}