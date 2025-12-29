import React, { useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppProvider"
import Avatar from "../avatar/Avatar";
import "../../styles/components/ChatHeader.scss";

function ChatHeader() {
    const navigate = useNavigate();
    const { username, status, setStatus } = useContext(AppContext);
    const goToSettings = useCallback(() => {
        navigate("/settings");
    }, [navigate]);
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
            <button className="settings-button" onClick={goToSettings}>
                Ustawienia
            </button>
        </header>
    );
}

export default React.memo(ChatHeader);