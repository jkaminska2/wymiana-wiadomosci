import { AppContext } from "../../context/AppContext";
import { useContext, useState } from "react";
import Avatar from "../avatar/Avatar";

export default function ContactList() {
    const { conversations, currentChat, setCurrentChat, addContact, status, username } = useContext(AppContext);
    const [newName, setNewName] = useState("");
    function handleAdd() {
        if (!newName.trim()) return;
        addContact(newName);
        setNewName("");
    }
    return (
        <aside style={{ width: "250px", borderRight: "1px solid black", padding: "10px" }}>
            <h3>Kontakty</h3>
            <ul>
                {Object.keys(conversations).map(name => (
                    <li
                        key={name}
                        onClick={() => setCurrentChat(name)}
                        style={{ 
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            padding: "5px 0",
                            fontWeight: name === currentChat ? "bold" : "normal" 
                        }}
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