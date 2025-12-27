import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function MessageInput() {
    const [message, setMessage] = useState("");
    const { addMessage } = useContext(AppContext);
    function handleSubmit(event) {
        event.preventDefault();
        if (!message.trim()) return;
        addMessage(message);
        setMessage("");
    }
    return (
        <form onSubmit={handleSubmit}>
            <input 
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Napisz wiadomość..."
            />
            <button>Wyślij</button>
        </form>
    );
}