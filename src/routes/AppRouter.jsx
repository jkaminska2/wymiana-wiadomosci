import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ChatPage from "../pages/ChatPage";
import SettingsPage from "../pages/SettingsPage";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function AppRouter() {
  const { username } = useContext(AppContext);
  return (
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
  );
}