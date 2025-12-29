import { useState, useContext, useRef, useCallback } from "react";
import { AppContext } from "../../context/AppProvider";
import EmojiPicker from "./EmojiPicker";
import "../../styles/components/MessageInput.scss";

export default function MessageInput() {
    const [message, setMessage] = useState("");
    const { addMessage, currentChat } = useContext(AppContext);
    const inputRef = useRef(null);
    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        if (!message.trim()) return;
        addMessage(currentChat, message);
        setMessage("");
    }, [message, currentChat, addMessage]);
    const handleEmoji = useCallback((emoji) => {
        setMessage(prev => prev + emoji);
        inputRef.current?.focus();
    }, []);
    return (
        <form className="message-input" onSubmit={handleSubmit}>
            <input 
                ref={inputRef}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Napisz wiadomość..."
            />
            <EmojiPicker onSelect={handleEmoji} />
            <button type="submit" className="send-button">Wyślij</button>
        </form>
    );
}