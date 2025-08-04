import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Particles from "../components/particles";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username.trim()) return;

        setIsLoading(true);

        // Mock login - in production, this would be an API call
        const mockUser = {
            id: `${username.toLowerCase()}`,
            userId: `${username.toLowerCase()}`,
            username: username,
            displayName: username,
            bio: `Hello! I'm ${username}`,
            avatarUrl: `https://avatar.iran.liara.run/public/${Math.floor(
                Math.random() * 100
            )}`,
            socials: {},
        };

        setTimeout(() => {
            login(mockUser);
            navigate(`/user/${mockUser.userId}`);
        }, 1000);
    };

    return (
        <div className="min-h-screen text-white p-8 space-y-6 bg-gradient-to-tl via-zinc-600/20 to-black from-black">
            <Navbar />
            <Particles className="absolute inset-0 -z-10" quantity={100} />

            <div className="flex justify-center items-center py-16">
                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-lg p-8 w-full max-w-md">
                    <h1 className="text-2xl font-bold text-center mb-6">
                        Login to DisTrack
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-zinc-300 font-semibold mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500"
                                placeholder="Enter your username"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || !username.trim()}
                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-600 disabled:opacity-50 text-white rounded-lg transition-colors font-semibold"
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <p className="text-zinc-400 text-sm text-center mt-4">
                        This is a demo login. Enter any username to create a
                        profile.
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Login;
