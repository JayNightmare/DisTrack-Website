import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage";
import Contact from "./pages/contact";
import Dashboard from "./pages/dashboard";
import FAQ from "./pages/faq";
import Extension from "./pages/extension";
import Leaderboard from "./pages/leaderboard";
import Showcase from "./pages/showcase";
import User from "./pages/user";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/extension" element={<Extension />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/showcase" element={<Showcase />} />
            <Route path="/user/:id" element={<User />} />
        </Routes>
    );
}
