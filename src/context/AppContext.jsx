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
        if (!conversations[name]) {
            setConversations({
                ...conversations,
                [name]: []
            });
        }
    }
    function addMessage(text, author = "me") {
        setConversations((prev) => ({
            ...prev,
            [currentChat]: [
                ...prev[currentChat],
                { text, author, edited: false, time: Date.now() }
            ]
        }));
    }
    function editMessage(index, newText) {
        setConversations(prev => {
            const updated = [...prev[currentChat]];
            updated[index] = {
                ...updated[index],
                text: newText,
                edited: true
            };
            return { ...prev, [currentChat]: updated };
        });
    }
    return (
        <AppContext.Provider value={{
            username,
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