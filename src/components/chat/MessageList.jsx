import React, { useEffect, useRef, useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import MessageItem from "./MessageItem";
import "../../styles/components/MessageList.scss";

function MessageList({ messages }) {
    const { isTyping } = useContext(ChatContext);
    const bottomRef = useRef(null);
    const lastMessageId = useRef(null);
    useEffect(() => {
        const last = messages[messages.length - 1];
        const isNewMessage = last && last.id !== lastMessageId.current;
        if (isNewMessage || isTyping) {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }
        lastMessageId.current = last?.id
    }, [messages, isTyping]);
    return (
        <div className="chat-window">
            <ul className="messages">
                {messages.map((msg) => (
                    <MessageItem key={msg.id} message={msg} />
                ))}
                {isTyping && (
                    <li className="typing-indicator">
                        <span></span><span></span><span></span>
                    </li>
                )}
                <div ref={bottomRef}></div>
            </ul>
        </div>
    );
}
export default React.memo(MessageList);