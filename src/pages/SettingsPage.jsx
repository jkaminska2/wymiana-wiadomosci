import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function SettigsPage() {
    const navigate = useNavigate();
    const { showTime, setShowTime } = useContext(AppContext);
    return (
        <div>
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