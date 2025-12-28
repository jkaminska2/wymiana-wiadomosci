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
    const { conversations, currentChat, addMessage, username } = useContext(AppContext);
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