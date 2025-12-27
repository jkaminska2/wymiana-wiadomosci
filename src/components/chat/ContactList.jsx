import { AppContext } from "../../context/AppContext";
import { useContext, useState } from "react";

export default function ContactList() {
    const { conversations, currentChat, setCurrentChat, addContact } = useContext(AppContext);
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
                        style={{ fontWeight: name === currentChat ? "bold" : "normal", cursor: "pointer" }}
                    >
                        {name}
                    </li>
                ))}
            </ul>
            <div>
                <input
                    value={newName}
                    onChange={event => setNewName(event.target.value)}
                    placeholder="Nowy kontakt"
                />
                <button onClick={handleAdd}>Dodaj</button>
            </div>
        </aside>
    );
}