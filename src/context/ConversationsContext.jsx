import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const ConversationsContext = createContext();
export function ConversationsProvider({ children }) {
    const [conversations, setConversations] = useLocalStorage("conversations", {
        "Adam": []
    });
    function addContact(name) {
        setConversations(prev => {
            if (prev[name]) return prev;
            return { ...prev, [name]: [] };
        });
    }
    function addMessage(chatName, text, author) {
        setConversations(prev => ({
            ...prev,
            [chatName]: [
                ...(prev[chatName] || []),
                {
                    id: Date.now() + Math.random(),
                    text,
                    author,
                    edited: false,
                    time: Date.now()
                }
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
    function resetConversations() {
        const initial = { Adam: [] };
        setConversations(initial);
        localStorage.setItem("conversations", JSON.stringify(initial));
    }
    return (
        <ConversationsContext.Provider value={{
            conversations,
            addContact,
            addMessage,
            editMessage,
            resetConversations
        }}>
            {children}
        </ConversationsContext.Provider>
    );
}