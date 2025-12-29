import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext"
import Avatar from "../avatar/Avatar";
import "../../styles/components/ChatHeader.scss";

export default function ChatHeader() {
    const navigate = useNavigate();
    const { username, status, setStatus } = useContext(AppContext);
    return (
        <header className="chat-header">
            <div className="left-side">
                <Avatar name={username || "U"} size={40} status={status} />
                <div className="user-info">
                    <h2>{username}</h2>
                    <label className="status-select">
                        Status:
                        <select value={status} onChange={event => setStatus(event.target.value)}>
                            <option value="dostępny">Dostępny</option>
                            <option value="zaraz wracam">Zaraz wracam</option>
                            <option value="niedostępny">Niedostępny</option>
                        </select>
                    </label>
                </div>
            </div>
            <button className="settings-button" onClick={() => navigate("/settings")}>
                Ustawienia
            </button>
        </header>
    );
}