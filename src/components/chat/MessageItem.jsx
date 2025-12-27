import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";

export default function MessageItem({ message }) {
    const { editMessage, showTime, currentChat } = useContext(AppContext);
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(message.text);
    useEffect(() => {
        setText(message.text);
    }, [message.text]);
    function save() {
        if (!text.trim()) return;
        editMessage(currentChat, message.id, text);
        setIsEditing(false);
    }
    return (
        <li onClick={() => message.author === "me" && setIsEditing(true)}>
            <strong>{message.author}: </strong>
            {isEditing ? (
                <>
                    <input 
                        value={text} 
                        onChange={event => setText(event.target.value)} 
                        onKeyDown={event => {
                            if (event.key === "Enter") {
                                event.preventDefault();
                                save();
                            }
                        }}
                    />
                    <button 
                        onClick={(event) => {
                            event.stopPropagation();
                            save();
                        }}
                    >
                        Zapisz
                    </button>
                </>
            ) : (
                <>
                    {message.text}
                    {message.edited && <em> (edytowano)</em>}
                </>
            )}
            {showTime && (
                <span>
                    {new Date(message.time).toLocaleTimeString("pl-PL", {
                        hour: "2-digit",
                        minute: "2-digit"
                    })}
                </span>
            )}
        </li>
    );
}