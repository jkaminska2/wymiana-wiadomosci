import MessageItem from "./MessageItem";

export default function MessageList({ messages }) {
    return (
        <ul>
            {messages.map((msg) => (
                <MessageItem key={msg.id} message={msg} />
            ))}
        </ul>
    );
}