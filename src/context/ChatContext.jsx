import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

export const ChatContext = createContext();
export function ChatProvider({ children }) {
  const [currentChat, setCurrentChat] = useState("Adam");
  const [isTyping, setIsTyping] = useState(false);
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const { username } = useContext(UserContext);
  useEffect(() => {
    if (username && !currentChat) {
      setCurrentChat("Adam");
    }
  }, [username, currentChat]);
  const resetChat = () => {
    setCurrentChat("");
  };
  const ensureValidChat = (conversations) => {
    const names = Object.keys(conversations);
    if (!names.includes(currentChat)) {
        setCurrentChat(names[0] || "");
    }
  };
  return (
    <ChatContext.Provider
      value={{
        currentChat,
        setCurrentChat,
        resetChat,
        isContactsOpen,
        setIsContactsOpen,
        ensureValidChat,
        isTyping,
        setIsTyping
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}