import { useState, useContext, useRef, useCallback } from "react";
import { ChatContext } from "../../context/ChatContext";
import { ConversationsContext } from "../../context/ConversationsContext";
import { UserContext } from "../../context/UserContext";
import EmojiPicker from "./EmojiPicker";
import "../../styles/components/MessageInput.scss";

export default function MessageInput() {
    const [message, setMessage] = useState("");
    const { addMessage } = useContext(ConversationsContext);
    const { currentChat } = useContext(ChatContext);
    const { username } = useContext(UserContext);
    const inputRef = useRef(null);
    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        if (!message.trim()) return;
        addMessage(currentChat, message, username);
        setMessage("");
    }, [message, currentChat, addMessage, username]);
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