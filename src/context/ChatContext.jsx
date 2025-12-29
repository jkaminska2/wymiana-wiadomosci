import { createContext, useState } from "react";

export const ChatContext = createContext();
export function ChatProvider({ children }) {
    const [currentChat, setCurrentChat] = useState("Adam");
    return (
        <ChatContext.Provider value={{ currentChat, setCurrentChat }}>
            {children}
        </ChatContext.Provider>
    );
}