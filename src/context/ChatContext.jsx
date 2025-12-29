import { createContext, useState } from "react";

export const ChatContext = createContext();
export function ChatProvider({ children }) {
    const [currentChat, setCurrentChat] = useState("Adam");
    const [isContactsOpen, setIsContactsOpen] = useState(false);
    function resetChat() {
        setCurrentChat("");
    }
    return (
        <ChatContext.Provider value={{ 
            currentChat, 
            setCurrentChat, 
            resetChat,
            isContactsOpen,
            setIsContactsOpen
        }}>
            {children}
        </ChatContext.Provider>
    );
}