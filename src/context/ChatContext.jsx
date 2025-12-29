import { createContext, useState } from "react";

export const ChatContext = createContext();
export function ChatProvider({ children }) {
    const [currentChat, setCurrentChat] = useState("Adam");
    function resetChat() {
        setCurrentChat("");
    }
    return (
        <ChatContext.Provider value={{ currentChat, setCurrentChat, resetChat }}>
            {children}
        </ChatContext.Provider>
    );
}