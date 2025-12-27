import { useState, useContext, useEffect, useRef } from "react";
import { AppContext } from "../../context/AppContext";

export default function MessageItem({ message }) {
    const { editMessage, showTime, currentChat } = useContext(AppContext);
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(message.text);
    const inputRef = useRef(null)
    useEffect(() => {
        setText(message.text);
    }, [message.text]);
    function save() {
        if (!text.trim()) return;
        editMessage(currentChat, message.id, text);
        setIsEditing(false);
    }
    function cancel() {
        setText(message.text);
        setIsEditing(false);
    }
    return (
        <li>
            <strong>{message.author}: </strong>
            {isEditing ? (
                <>
                    <input
                        ref={inputRef}
                        value={text} 
                        onChange={event => setText(event.target.value)} 
                        onKeyDown={event => {
                            if (event.key === "Enter") {
                                event.preventDefault();
                                save();
                            }
                        }}
                    />
                    <button onClick={() => save()}>
                        Zapisz
                    </button>
                    <button onClick={() => cancel()}>
                        Anuluj
                    </button>
                </>
            ) : (
                <>
                    {message.text}
                    {message.edited && <em> (edytowano)</em>}
                    {message.author === "me" && (
                        <button
                            onClick={(event) => {
                                setIsEditing(true);
                                setTimeout(() => {
                                    inputRef.current?.focus();
                                }, 0);
                            }}
                        >
                            Edytuj
                        </button>
                    )}
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