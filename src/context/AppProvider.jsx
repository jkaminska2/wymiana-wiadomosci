import { UserProvider } from "./UserContext";
import { ChatProvider } from "./ChatContext";
import { ConversationsProvider } from "./ConversationsContext";
import { ErrorProvider } from "./ErrorContext";
import ErrorToast from "../errors/ErrorToast";

export default function AppProvider({ children }) {
    return (
        <ErrorProvider>
            <UserProvider>
                <ChatProvider>
                    <ConversationsProvider>
                        {children}
                        <ErrorToast />
                    </ConversationsProvider>
                </ChatProvider>
            </UserProvider>
        </ErrorProvider>
    );
}