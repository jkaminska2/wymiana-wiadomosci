import { useState, useContext, useEffect, useRef } from "react";
import { AppContext } from "../../context/AppContext";
import Avatar from "../avatar/Avatar";
import "../../styles/components/MessageItem.scss";

export default function MessageItem({ message }) {
    const { editMessage, showTime, currentChat, username } = useContext(AppContext);
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(message.text);
    const inputRef = useRef(null)
    const isMine = message.author === username;
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
        <li className={`message-item ${isMine ? "mine" : "theirs"}`}
            style={{ 
                display: "flex", 
                alignItems: "center",
                justifyContent: isMine ? "flex-end" : "flex-start",
                gap: "8px",
                marginBottom: "12px" 
            }}
        >
            {!isMine && (
                <div style={{alignSelf: "flex-end" }}>
                    <Avatar
                        name={message.author}
                        size={32}
                        status="dostępny"
                    />
                </div>
            )}
            <div className="chat-side" style={{ maxWidth: "60%", display: "flex", flexDirection: "column" }}>
                <div classname="message"
                    style={{
                        background: isMine ? "#0084FF" : "#E4E6EB",
                        color: isMine ? "white" : "black",
                        padding: "8px 12px",
                        borderRadius: "18px",
                        borderBottomLeftRadius: isMine ? "18px" : "4px",
                        borderBottomRightRadius: isMine ? "4px" : "18px",
                        whiteSpace: "pre-wrap",
                        position: "relative"
                    }}
                >
                    {isEditing ? (
                        <div className="edit-mode" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                            <input
                                ref={inputRef}
                                value={text} 
                                onChange={event => setText(event.target.value)} 
                                style={{
                                    padding: "6px",
                                    borderRadius: "8px",
                                    border: "1px solid #ccc",
                                    fontSize: "14px"
                                }}
                                onKeyDown={event => {
                                    if (event.key === "Enter") {
                                        event.preventDefault();
                                        save();
                                    }
                                }}
                            />
                            <div className="edit-buttons" style={{ display: "flex", gap: "6px" }}>
                                <button 
                                    onClick={save}
                                    style={{
                                        padding: "4px 8px",
                                        background: "#0084FF",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "6px",
                                        cursor: "pointer"
                                    }}
                                >
                                    Zapisz
                                </button>
                                <button 
                                    onClick={cancel}
                                    style={{
                                        padding: "4px 8px",
                                        background: "#ccc",
                                        border: "none",
                                        borderRadius: "6px",
                                        cursor: "pointer"
                                    }}
                                >
                                    Anuluj
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {message.text}
                            {message.edited && <em style={{ opacity: 0.7, marginLeft: "4px" }}> (edytowano)</em>}
                        </>
                    )}
                </div>
                <div className="info">
                    {showTime && (
                        <span className="time" style={{ fontSize: "10px", opacity: 0.6, marginTop: "2px", alignSelft: isMine ? "flex-end" : "flex-start" }}>
                            {new Date(message.time).toLocaleTimeString("pl-PL", {
                                hour: "2-digit",
                                minute: "2-digit"
                            })}
                        </span>
                    )}
                    {isMine && !isEditing && (
                        <button className="edit-button"
                            onClick={() => {
                                setIsEditing(true);
                                setTimeout(() => inputRef.current?.focus(), 0);
                            }}
                            style={{ marginTop: "4px", fontSize: "11px", opacity: 0.7, background: "none", border: "none", cursor: "pointer", alignSelf: "flex-end" }}
                        >
                            Edytuj
                        </button>
                    )}
                </div>
            </div>
        </li>
    );
}