import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

export const ChatContext = createContext();
export function ChatProvider({ children }) {
    const [currentChat, setCurrentChat] = useState("Adam");
    const [isContactsOpen, setIsContactsOpen] = useState(false);
    const { username } = useContext(UserContext);
    useEffect(() => {
        if (username && !currentChat) {
            setCurrentChat("Adam");
        }
    }, [username, currentChat]);
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