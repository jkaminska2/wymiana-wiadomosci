import { AppContext } from "../../context/AppContext";
import { useContext, useState } from "react";
import Avatar from "../avatar/Avatar";
import "../../styles/components/ContactList.scss";

export default function ContactList() {
    const { conversations, currentChat, setCurrentChat, addContact, status, username } = useContext(AppContext);
    const [newName, setNewName] = useState("");
    function handleAdd() {
        if (!newName.trim()) return;
        addContact(newName);
        setNewName("");
    }
    return (
        <aside className="contact-list">
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
        </aside>
    );
}