import { createContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const UserContext = createContext();
export function UserProvider({ children }) {
    const [theme, setTheme] = useLocalStorage("theme", "light");
    const [username, setUsername] = useLocalStorage("username", "");
    const [status, setStatus] = useLocalStorage("status", "dostępny");
    const [showTime, setShowTime] = useLocalStorage("showTime", true);
    useEffect(() => {
        document.body.setAttribute("data-theme", theme);
    }, [theme]);
    function login(name) {
        setUsername(name);
    }
    function logout() {
        localStorage.clear();
        setUsername("");
    }
    return (
        <UserContext.Provider value={{
            username,
            setUsername,
            login,
            status,
            setStatus,
            showTime,
            setShowTime,
            logout,
            theme,
            setTheme
        }}>
            {children}
        </UserContext.Provider>
    );
}