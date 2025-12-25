import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const AppContext = createContext();

export function AppProvider({ children }) {
    const [username, setUsername] = useLocalStorage("username", "");
    return (
        <AppContext.Provider value={{ username, setUsername}}>
            {children}
        </AppContext.Provider>
    );
}