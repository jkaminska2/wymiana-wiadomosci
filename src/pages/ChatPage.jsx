import { ChatContext } from "../context/ChatContext";
import { ConversationsContext } from "../context/ConversationsContext";
import { useContext } from "react";
import ChatHeader from "../components/chat/ChatHeader";
import MessageList from "../components/chat/MessageList";
import MessageInput from "../components/chat/MessageInput";
import ContactList from "../components/chat/ContactList";
import useChatBot from "../hooks/useChatBot";
import "../styles/pages/ChatPage.scss"

export default function ChatPage() {
    const { conversations } = useContext(ConversationsContext);
    const { currentChat, isContactsOpen } = useContext(ChatContext)
    const messages = conversations[currentChat] ?? [];
    useChatBot();
    return (
        <>
            <ChatHeader />
            <div className= "chat-layout">
                {isContactsOpen && <ContactList />}
                <div className="message-area">
                    <MessageList messages={messages} />
                    <MessageInput />
                </div>
            </div>
        </>
    );
}