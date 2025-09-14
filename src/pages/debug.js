import React from "react";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const Debug = () => {
    const { user, isLoggedIn, loading } = useAuth();

    const testLogin = () => {
        const testUser = {
            id: "test123",
            userId: "test123",
            discordId: "123456789",
            username: "TestUser",
            displayName: "Test User",
            bio: "This is a test user",
            avatarUrl: "https://avatar.iran.liara.run/public",
            socials: {},
            email: "test@example.com",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        localStorage.setItem("distrack_user", JSON.stringify(testUser));
        window.location.reload();
    };

    const testLogout = () => {
        localStorage.removeItem("distrack_user");
        window.location.reload();
    };

    return (
        <div className="min-h-screen text-white p-8 space-y-6 bg-gradient-to-tl via-zinc-600/20 to-black from-black">
            <Navbar />

            <div className="container mx-auto max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">
                    Authentication Debug
                </h1>

                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-lg p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Auth State</h2>
                    <div className="space-y-2">
                        <p>
                            <strong>Loading:</strong>{" "}
                            {loading ? "true" : "false"}
                        </p>
                        <p>
                            <strong>Is Logged In:</strong>{" "}
                            {isLoggedIn ? "true" : "false"}
                        </p>
                        <p>
                            <strong>User Object:</strong>
                        </p>
                        <pre className="bg-zinc-800 p-4 rounded text-sm overflow-auto">
                            {JSON.stringify(user, null, 2)}
                        </pre>
                    </div>
                </div>

                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-lg p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-4">
                        localStorage
                    </h2>
                    <div className="space-y-2">
                        <p>
                            <strong>distrack_user:</strong>
                        </p>
                        <pre className="bg-zinc-800 p-4 rounded text-sm overflow-auto">
                            {localStorage.getItem("distrack_user") || "null"}
                        </pre>
                        <p>
                            <strong>discord_auth_state:</strong>
                        </p>
                        <pre className="bg-zinc-800 p-4 rounded text-sm overflow-auto">
                            {sessionStorage.getItem("discord_auth_state") ||
                                "null"}
                        </pre>
                    </div>
                </div>

                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">
                        Test Actions
                    </h2>
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={testLogin}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                        >
                            Test Login
                        </button>
                        <button
                            type="button"
                            onClick={testLogout}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                        >
                            Test Logout
                        </button>
                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Debug;
