import MessageItem from "./MessageItem";

export default function MessageList({ messages }) {
    return (
        <div className="chat-window">
            <ul className="messages">
                {messages.map((msg) => (
                    <MessageItem key={msg.id} message={msg} />
                ))}
            </ul>
        </div>
    );
}