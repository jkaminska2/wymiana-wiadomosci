import { createContext, useState, useCallback } from "react";

export const ErrorContext = createContext();
export function ErrorProvider({ children }) {
    const [errors, setErrors] = useState([]);
    const pushError = useCallback((error) => {
        setErrors(prev => [...prev, error]);
        setTimeout(() => {
            setErrors(prev => prev.filter(e => e.id !== error.id));
        }, 3000);
    }, []);
    return (
        <ErrorContext.Provider value={{ errors, pushError }}>
            {children}
        </ErrorContext.Provider>
    );
}