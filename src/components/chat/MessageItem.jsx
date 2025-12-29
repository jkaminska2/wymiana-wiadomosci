import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import Avatar from "../avatar/Avatar";
import "../../styles/components/MessageItem.scss";
import { ConversationsContext } from "../../context/ConversationsContext";
import { UserContext } from "../../context/UserContext";
import { ChatContext } from "../../context/ChatContext";

function MessageItem({ message }) {
    const { showTime, username } = useContext(UserContext);
    const { editMessage } = useContext(ConversationsContext);
    const { currentChat } = useContext(ChatContext);
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
        <li className={`message-item ${isMine ? "mine" : "theirs"}`}>
            {!isMine && (
                <Avatar name={message.author} size={32} status="dostępny" />
            )}
            <div className="chat-side">
                {isMine && !isEditing && (
                    <button 
                        className="edit-button top-edit"
                        onClick={() => {
                            setIsEditing(true);
                            setTimeout(() => inputRef.current?.focus(), 0);
                        }}
                    >
                        Edytuj
                    </button>
                )}
                <div className="message">
                    {isEditing ? (
                        <div className="edit-mode">
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
                            <div className="edit-buttons">
                                <button onClick={save}>Zapisz</button>
                                <button onClick={cancel}>Anuluj</button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {message.text}
                            {message.edited && <em className="edited">(edytowano)</em>}
                        </>
                    )}
                </div>
                <div className="info">
                    {showTime && (
                        <span className="time">
                            {new Date(message.time).toLocaleTimeString("pl-PL", {
                                hour: "2-digit",
                                minute: "2-digit"
                            })}
                        </span>
                    )}
                </div>
            </div>
        </li>
    );
}

export default React.memo(MessageItem);