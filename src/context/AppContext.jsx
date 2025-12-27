import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const AppContext = createContext();

export function AppProvider({ children }) {
    const [username, setUsername] = useLocalStorage("username", "");
    const [messages, setMessages] = useState([]);
    function login(name) {
        setUsername(name)
    }
    function addMessage(text) {
        setMessages((prev) => [...prev, { text, author: "me" }]);
    }
    return (
        <AppContext.Provider value={{ username, login, messages, addMessage}}>
            {children}
        </AppContext.Provider>
    );
}