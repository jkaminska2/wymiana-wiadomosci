import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../styles/pages/LoginPage.scss"

export default function LoginPage() {
    const { setUsername } = useContext(UserContext);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    function handleSubmit(event) {
        event.preventDefault();
        const trimmed = name.trim();
        if (trimmed.length < 3) {
            setError("Nick musi mieć co najmniej 3 znaki");
            return;
        }
        setUsername(name);
        navigate("/chat");
    }
    return (
        <div className="login-page">
            <form onSubmit={handleSubmit}>
                <h1>Wpisz swój nick</h1>
                <input
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value);
                        setError("");
                    }}
                    placeholder="Twój nick"
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">Wejdź</button>
            </form>
        </div>
    );
}