import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import ChatHeader from "../components/chat/ChatHeader";
import MessageList from "../components/chat/MessageList";
import MessageInput from "../components/chat/MessageInput";

export default function ChatPage() {
    const { messages } = useContext(AppContext);
    return (
        <div>
            <ChatHeader />
            <MessageList messages={messages} />
            <MessageInput />
        </div>
    );
}