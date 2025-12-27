import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext"

export default function ChatHeader() {
    const navigate = useNavigate();
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
            <button onClick={() => navigate("/settings")}>
                Ustawienia
            </button>
        </header>
    );
}