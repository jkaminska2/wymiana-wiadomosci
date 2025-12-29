import { ConversationsContext } from "../../context/ConversationsContext";
import { ChatContext } from "../../context/ChatContext";
import { UserContext } from "../../context/UserContext";
import { handleError } from "../../errors/errorHandler";
import { ErrorContext } from "../../context/ErrorContext";
import { useContext, useState } from "react";
import Avatar from "../avatar/Avatar";
import "../../styles/components/ContactList.scss";

export default function ContactList() {
    const { pushError } = useContext(ErrorContext);
    const { conversations, addContact } = useContext(ConversationsContext);
    const { currentChat, setCurrentChat, isContactsOpen } = useContext(ChatContext);
    const { username, status } = useContext(UserContext);
    const [newName, setNewName] = useState("");
    function handleAdd() {
        if (!newName.trim()) {
            const err = handleError("Nie można dodać pustego kontaktu");
            pushError(err);
            return;
        }
        if (conversations[newName]) {
            const err = handleError(`Kontakt "${newName}" już istnieje`);
            pushError(err);
            return;
        }
        try {
            addContact(newName);
            setNewName("");
        } catch (e) {
            const err = handleError("Błąd podczas dodawania kontaktu", e);
            pushError(err);
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
                            <Avatar name={name} size={32} status={name === username ? status : "dostępny"} />
                            {name}
                        </li>
                    ))}
                </ul>
                <div>
                    <input
                        value={newName}
                        onChange={event => setNewName(event.target.value)}
                        onKeyDown={event => {
                            if (event.key === "Enter") {
                                handleAdd();
                            }
                        }}
                        placeholder="Nowy kontakt"
                    />
                    <button onClick={handleAdd}>Dodaj</button>
                </div>
            </div>
        </aside>
    );
}