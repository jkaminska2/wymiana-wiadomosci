import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function MessageItem({ message, index }) {
    const { editMessage, showTime } = useContext(AppContext);
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(message.text);
    function save() {
        if (!text.trim()) return;
        editMessage(index, text);
        setIsEditing(false);
    }
    return (
        <li onClick={() => message.author === "me" && setIsEditing(true)}>
            <strong>{message.author}: </strong>
            {isEditing ? (
                <>
                    <input value={text} onChange={event => setText(event.target.value)} />
                    <button onClick={save}>Zapisz</button>
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