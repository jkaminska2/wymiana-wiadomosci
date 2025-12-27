import { useContext } from "react";
import { AppContext } from "../../context/AppContext"

export default function ChatHeader() {
    const { username, status, setStatus } = useContext(AppContext);
    return (
        <header style={{ padding: "10px", borderBottom: "1px solid black" }}>
            <h2>Zalogowany jako: {username}</h2>
            <label>
                Status:
                <select value={status} onChange={event => setStatus(event.target.value)}>
                    <option>Dostępny</option>
                    <option>Zaraz wracam</option>
                    <option>Niedostępny</option>
                </select>
            </label>
        </header>
    );
}