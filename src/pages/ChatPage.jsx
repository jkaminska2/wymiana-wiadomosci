import { AppContext } from "../context/AppContext";
import { useContext, useState } from "react";

export default function ChatPage() {
    const { username, messages, addMessage } = useContext(AppContext);
    const [message, setMessage] = useState("");
    function handleSend(event) {
        event.preventDefault();
        if (!message.trim()) return;
        addMessage(message);
        setMessage("");
    }
    return (
        <div>
            <h2>Chat - zalogowany jako {username}</h2>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg.author}: {msg.text}</li>
                ))}
            </ul>
            <form onSubmit={handleSend}>
                <input
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Napisz wiadomość..."
                />
                <button type="submit">Wyślij</button>
            </form>
        </div>
    );
}