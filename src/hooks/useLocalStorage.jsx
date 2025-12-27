import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const saved = localStorage.getItem(key);
            return saved ? JSON.parse(saved) : initialValue;
        } catch {
            return initialValue;
        }
    });
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    const setStoredValue = (update) => {
        setValue(prev => {
            const newValue = typeof update === "function" ? update(prev) : update;
            return JSON.parse(JSON.stringify(newValue));
        });
    };
    return [value, setStoredValue];
}