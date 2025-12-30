import { createContext, useState, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { UserContext } from "./UserContext";

export const ConversationsContext = createContext();
export function ConversationsProvider({ children }) {
    const { username } = useContext(UserContext);
    const [lastUserMessageId, setLastUserMessageId] = useState(null);
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
        const newMessage = {
            id: Date.now() + Math.random(),
            text,
            author,
            edited: false,
            time: Date.now() 
        };
        setConversations(prev => ({
            ...prev,
            [chatName]: [
                ...(prev[chatName] || []),
                newMessage
            ]
        }));
        if (author === username) {
            setLastUserMessageId(newMessage.id);
        }
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
            resetConversations,
            lastUserMessageId
        }}>
            {children}
        </ConversationsContext.Provider>
    );
}