import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import HomePage from "./pages/homepage";
import Contact from "./pages/contact";
import FAQ from "./pages/faq";
import Downloads from "./pages/downloads";
import Leaderboard from "./pages/leaderboard";
import Showcase from "./pages/showcase";
import User from "./pages/user";
import Login from "./pages/login";
import Debug from "./pages/debug";
// import DiscordCallback from "./components/DiscordCallback";
import Dashboard from "./pages/dashboard";
import DashboardCallback from "./components/DashboardCallback";
import LinkAccount from "./pages/linkAccount";

// Import test auth for debugging
import "./utils/testAuth";

export default function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/downloads" element={<Downloads />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/showcase" element={<Showcase />} />
                <Route path="/user/:id" element={<User />} />
                <Route path="/login" element={<Login />} />
                <Route path="/debug" element={<Debug />} />
                <Route path="/auth/distrack" element={<DashboardCallback />} />
                <Route path="/link-account" element={<LinkAccount />} />
            </Routes>
        </AuthProvider>
    );
}
