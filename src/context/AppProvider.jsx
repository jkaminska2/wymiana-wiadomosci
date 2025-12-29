import { UserProvider } from "./UserContext";
import { ChatProvider } from "./ChatContext";
import { ConversationsProvider } from "./ConversationsContext";

export default function AppProvider({ children }) {
    return (
        <UserProvider>
            <ChatProvider>
                <ConversationsProvider>
                    {children}
                </ConversationsProvider>
            </ChatProvider>
        </UserProvider>
    );
}