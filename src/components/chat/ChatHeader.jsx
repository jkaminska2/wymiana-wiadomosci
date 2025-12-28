import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext"
import Avatar from "../avatar/Avatar";

export default function ChatHeader() {
    const navigate = useNavigate();
    const { username, status, setStatus } = useContext(AppContext);
    return (
        <header style={{ padding: "10px", borderBottom: "1px solid black", display: "flex", alignItems: "center" }}>
            <Avatar name={username || "U"} size={40} status={status} />
            <h2 style={{ marginLeft: 10 }}>{username}</h2>
            <label>
                Status:
                <select value={status} onChange={event => setStatus(event.target.value)}>
                    <option value="dostępny">Dostępny</option>
                    <option value="zaraz wracam">Zaraz wracam</option>
                    <option value="niedostępny">Niedostępny</option>
                </select>
            </label>
            <button onClick={() => navigate("/settings")}>
                Ustawienia
            </button>
        </header>
    );
}