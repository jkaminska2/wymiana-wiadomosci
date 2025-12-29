import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../styles/pages/SettingsPage.scss"

export default function SettigsPage() {
    const navigate = useNavigate();
    const { showTime, setShowTime } = useContext(UserContext);
    return (
        <div className="settings-page">
            <h1>Ustawienia</h1>
            <label>
                <input
                    type="checkbox"
                    checked={showTime}
                    onChange={event => setShowTime(event.target.checked)} 
                />
                Pokaż godzinę wysłania wiadomości
            </label>
            <button onClick={() => navigate("/chat")}>
                Powrót
            </button>
        </div>
    );
}