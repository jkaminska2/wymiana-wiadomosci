import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import EmojiPicker from "./EmojiPicker";

export default function MessageInput() {
    const [message, setMessage] = useState("");
    const { addMessage, currentChat } = useContext(AppContext);
    function handleSubmit(event) {
        event.preventDefault();
        if (!message.trim()) return;
        addMessage(currentChat, message);
        setMessage("");
    }
    function handleEmoji(emoji) {
        setMessage(prev => prev + emoji);
    }
    return (
        <form 
            onSubmit={handleSubmit}
            style={{ display: "flex", padding: "10px", borderTop: "1px solid black" }}
        >
            <EmojiPicker onSelect={handleEmoji} />
            <input 
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Napisz wiadomość..."
                style={{ flex: 1, marginRight: "10px" }}
            />
            <button>Wyślij</button>
        </form>
    );
}