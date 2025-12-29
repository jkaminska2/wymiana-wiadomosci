import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const LoginPage = lazy(() => import("../pages/LoginPage"));
const ChatPage = lazy(() => import("../pages/ChatPage"));
const SettingsPage = lazy(() => import("../pages/SettingsPage"));
export default function AppRouter() {
  const { username } = useContext(UserContext);
  return (
    <Suspense fallback={<div className="loading">Ładowanie...</div>}>
      <Routes>
        <Route
          path="/"
          element={username ? <Navigate to="/chat" /> : <LoginPage />}
        />
        <Route
          path="/chat"
          element={username ? <ChatPage /> : <Navigate to="/" />}
        />
        <Route
          path="/settings"
          element={username ? <SettingsPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Suspense>
  );
}