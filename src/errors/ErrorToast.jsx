import { useContext } from "react";
import { ErrorContext } from "../context/ErrorContext";
import "../styles/components/ErrorToast.scss";

export default function ErrorToast() {
    const { errors } = useContext(ErrorContext);
    return (
        <div className="error-toast-container">
            {errors.map(error => (
                <div key={error.id} className="error-toast">
                    {error.message}
                </div>
            ))}
        </div>
    );
}