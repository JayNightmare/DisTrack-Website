import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";

/**
 * Legacy Discord OAuth callback handler.
 * This component is deprecated in favor of DashboardCallback.js
 * which handles the new JWT token-based authentication flow.
 */
const DiscordCallback = () => {
    return (
        <div className="min-h-screen text-white p-8 space-y-6 bg-gradient-to-tl via-zinc-600/20 to-black from-black">
            <Navbar />
            <div className="flex justify-center items-center py-16">
                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-lg p-8 w-full max-w-md text-center">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h1 className="text-2xl font-bold text-yellow-400 mb-4">
                        Legacy OAuth Flow
                    </h1>
                    <p className="text-zinc-300 mb-6">
                        This authentication method is no longer supported.
                        Please use the main login page for the updated
                        authentication flow.
                    </p>
                    <Link
                        to="/login"
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-semibold"
                    >
                        Back to Login
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DiscordCallback;
