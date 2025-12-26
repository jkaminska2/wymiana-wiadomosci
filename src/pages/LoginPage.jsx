import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function LoginPage() {
    const { setUsername } = useContext(AppContext);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    function handleSubmit(event) {
        event.preventDefault();
        if (!name.trim()) return;
        setUsername(name);
        navigate("/chat");
    }
    return (
        <form onSubmit={handleSubmit}>
            <h1>Wpisz swój nick</h1>
            <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Twój nick"
            />
            <button type="submit">Wejdź</button>
        </form>
    );
}