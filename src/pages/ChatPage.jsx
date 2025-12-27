import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import ChatHeader from "../components/chat/ChatHeader";
import MessageList from "../components/chat/MessageList";
import MessageInput from "../components/chat/MessageInput";
import ContactList from "../components/chat/ContactList";
import useChatBot from "../hooks/useChatBot";

export default function ChatPage() {
    const { conversations, currentChat } = useContext(AppContext);
    const messages = conversations[currentChat] || [];
    useChatBot();
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <ContactList />
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <ChatHeader />
                <MessageList messages={messages} />
                <MessageInput />
            </div>
        </div>
    );
}