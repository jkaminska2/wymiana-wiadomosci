import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const AppContext = createContext();

export function AppProvider({ children }) {
    const [username, setUsername] = useLocalStorage("username", "");
    const [status, setStatus] = useLocalStorage("status", "Dostępny");
    const [conversations, setConversations] = useLocalStorage("conversations", {
        "Bot": []
    });
    const [currentChat, setCurrentChat] = useState("Bot");
    const [showTime, setShowTime] = useLocalStorage("showTime", true)
    function login(name) {
        setUsername(name)
    }
    function addContact(name) {
        setConversations(prev => {
            if (prev[name]) return prev;
            return {
                ...prev, [name]: []
            };
        });
    }
    function addMessage(chatName, text, author = "me") {
        setConversations((prev) => ({
            ...prev,
            [chatName]: [
                ...(prev[chatName] || []),
                { id: Date.now() + Math.random(), text, author, edited: false, time: Date.now() }
            ]
        }));
    }
    function editMessage(chatName, messageId, newText) {
        setConversations(prev => {
            const updatedChat = prev[chatName].map(msg =>
                msg.id === messageId
                    ? { ...msg, text: newText, edited: true }
                    : msg
            );
            return { ...prev, [chatName]: updatedChat };
        });
    }
    return (
        <AppContext.Provider value={{
            username,
            setUsername,
            login,
            status,
            setStatus,
            conversations,
            currentChat,
            setCurrentChat,
            addContact,
            addMessage,
            editMessage,
            showTime,
            setShowTime
        }}>
            {children}
        </AppContext.Provider>
    );
}