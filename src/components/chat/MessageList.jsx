import MessageItem from "./MessageItem";

export default function MessageList({ messages }) {
    return (
        <ul>
            {messages.map((msg, index) => (
                <MessageItem key={index} message={msg} index={index} />
            ))}
        </ul>
    );
}