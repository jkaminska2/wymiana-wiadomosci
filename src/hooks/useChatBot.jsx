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
    const { messages, addMessage } = useContext(AppContext);
    useEffect(() => {
        if (messages.length === 0) return;
        const lastMessage = messages[messages.length - 1];
        if (lastMessage.author !== "me") return;
        const timeout = setTimeout(() => {
            const random = BOT_MESSAGES[Math.floor(Math.random() * BOT_MESSAGES.length)];
            addMessage(random, "bot");
        }, 2000);
        return () => clearTimeout(timeout);
    }, [messages, addMessage]);
}