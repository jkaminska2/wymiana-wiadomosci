import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { ChatContext } from "../context/ChatContext";
import { ConversationsContext } from "../context/ConversationsContext";
import "../styles/pages/SettingsPage.scss"


export default function SettingsPage() {
    const navigate = useNavigate();
    const { showTime, setShowTime, logout, theme, setTheme } = useContext(UserContext);
    const { resetConversations } = useContext(ConversationsContext);
    const { resetChat } = useContext(ChatContext);
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
            <label>
                <input 
                    type="checkbox"
                    checked={theme === "dark"}
                    onChange={e => setTheme(e.target.checked ? "dark" : "light")}
                />
                Tryb ciemny
            </label>
            <button onClick={() => navigate("/chat")}>
                Powrót
            </button>
            <button
                className="logout-button"
                onClick={() => {
                    logout();
                    resetConversations();
                    resetChat();
                    navigate("/");
                }}
            >
                Wyloguj
            </button>
        </div>
    );
}