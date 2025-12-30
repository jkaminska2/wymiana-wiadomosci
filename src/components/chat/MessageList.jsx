import React, { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";
import "../../styles/components/MessageList.scss";

function MessageList({ messages }) {
    const bottomRef = useRef(null);
    const lastMessageId = useRef(null);
    useEffect(() => {
        const last = messages[messages.length - 1];
        const isNewMessage = last && last.id !== lastMessageId.current;
        if (isNewMessage) {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }
        lastMessageId.current = last?.id
    }, [messages]);
    return (
        <div className="chat-window">
            <ul className="messages">
                {messages.map((msg) => (
                    <MessageItem key={msg.id} message={msg} />
                ))}
                <div ref={bottomRef}></div>
            </ul>
        </div>
    );
}
export default React.memo(MessageList);