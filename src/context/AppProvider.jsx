import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./UserContext";
import { ChatProvider } from "./ChatContext";
import { ConversationsProvider } from "./ConversationsContext";
import { ErrorProvider } from "./ErrorContext";
import ErrorToast from "../errors/ErrorToast";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchOnMount: false,
            retry: false
        }
    }
});
export default function AppProvider({ children }) {
    return (
        <ErrorProvider>
            <QueryClientProvider client={queryClient}>
                <UserProvider>
                    <ChatProvider>
                        <ConversationsProvider>
                            {children}
                            <ErrorToast />
                        </ConversationsProvider>
                    </ChatProvider>
                </UserProvider>
            </QueryClientProvider>
        </ErrorProvider>
    );
}