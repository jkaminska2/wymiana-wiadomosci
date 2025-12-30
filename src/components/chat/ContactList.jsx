import { useContext, useState } from "react";
import { ConversationsContext } from "../../context/ConversationsContext";
import { ChatContext } from "../../context/ChatContext";
import { UserContext } from "../../context/UserContext";
import { ErrorContext } from "../../context/ErrorContext";
import { handleError } from "../../errors/errorHandler";
import Avatar from "../avatar/Avatar";
import "../../styles/components/ContactList.scss";

export default function ContactList() {
    const { pushError } = useContext(ErrorContext);
    const { conversations, addContact, deleteConversation } = useContext(ConversationsContext);
    const { currentChat, setCurrentChat, isContactsOpen } = useContext(ChatContext);
    const { username, status } = useContext(UserContext);
    const [newName, setNewName] = useState("");
    function handleAdd() {
        if (!newName.trim()) {
            pushError(handleError("Nie można dodać pustego kontaktu"));
            return;
        }
        if (conversations[newName]) {
            pushError(handleError(`Kontakt "${newName}" już istnieje`));
            return;
        }
        try {
            addContact(newName);
            setNewName("");
        } catch (e) {
            pushError(handleError("Błąd podczas dodawania kontaktu", e));
        }
    }
    return (
        <aside className={`contact-list ${isContactsOpen ? "open" : ""}`}>
            <div className="contact-list-inner">
                <h3>Kontakty</h3>
                <ul>
                    {Object.keys(conversations).map(name => (
                        <li
                            key={name}
                            className={name === currentChat ? "active" : ""}
                            onClick={() => setCurrentChat(name)}
                        >
                            <Avatar
                                name={name}
                                size={32}
                                status={name === username ? status : "dostępny"}
                            />
                            <span className="contact-name">{name}</span>
                            <button
                                className="delete-contact"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (window.confirm(`Usunąć rozmowę z ${name}?`)) {
                                        deleteConversation(name);
                                        if (name === currentChat) {
                                            setCurrentChat(Object.keys(conversations)[0] || "");
                                        }
                                    }
                                }}
                            >
                                ✕
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="add-contact">
                    <input
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && handleAdd()}
                        placeholder="Nowy kontakt"
                    />
                    <button onClick={handleAdd}>Dodaj</button>
                </div>
            </div>
        </aside>
    );
}