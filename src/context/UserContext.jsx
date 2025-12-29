import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const UserContext = createContext();
export function UserProvider({ children }) {
    const [username, setUsername] = useLocalStorage("username", "");
    const [status, setStatus] = useLocalStorage("status", "dostępny");
    const [showTime, setShowTime] = useLocalStorage("showTime", true);
    function login(name) {
        setUsername(name);
    }
    return (
        <UserContext.Provider value={{
            username,
            setUsername,
            login,
            status,
            setStatus,
            showTime,
            setShowTime
        }}>
            {children}
        </UserContext.Provider>
    );
}