import { useContext } from "react";
import { AppContext } from "../../context/AppContext"

export default function ChatHeader() {
    const { username } = useContext(AppContext);
    return (
        <header>
            <h2>Zalogowany jako: {username}</h2>
        </header>
    );
}