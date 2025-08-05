import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { generateDiscordAuthUrl } from "../services/discordAuth";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Particles from "../components/particles";

const Login = () => {
    const { login, isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showDemoLogin, setShowDemoLogin] = useState(false);

    useEffect(() => {
        // Redirect if already logged in
        if (isLoggedIn) {
            navigate("/dashboard");
        }
    }, [isLoggedIn, navigate]);

    const handleDiscordLogin = () => {
        setIsLoading(true);
        const authUrl = generateDiscordAuthUrl();
        window.location.href = authUrl;
    };

    const handleDemoSubmit = async (e) => {
        e.preventDefault();
        if (!username.trim()) return;

        setIsLoading(true);

        // Mock login - for demo purposes only
        const mockUser = {
            id: `demo_${username.toLowerCase()}`,
            userId: `demo_${username.toLowerCase()}`,
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

                    {!showDemoLogin ? (
                        <div className="space-y-4">
                            {/* Discord Login Button */}
                            <button
                                onClick={handleDiscordLogin}
                                disabled={isLoading}
                                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-600 disabled:opacity-50 text-white rounded-lg transition-colors font-semibold flex items-center justify-center gap-3"
                            >
                                <svg
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                                </svg>
                                {isLoading
                                    ? "Connecting..."
                                    : "Continue with Discord"}
                            </button>

                            <div className="text-center">
                                <div className="flex items-center justify-center mb-4">
                                    <div className="border-t border-zinc-600 flex-1"></div>
                                    <div className="px-4 text-zinc-400 text-sm">
                                        or
                                    </div>
                                    <div className="border-t border-zinc-600 flex-1"></div>
                                </div>

                                <button
                                    onClick={() => setShowDemoLogin(true)}
                                    className="text-zinc-400 hover:text-zinc-300 text-sm underline"
                                >
                                    Try Demo Login
                                </button>
                            </div>

                            <p className="text-zinc-400 text-sm text-center mt-4">
                                Sign in with Discord to sync your coding stats
                                and join the leaderboard!
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <form
                                onSubmit={handleDemoSubmit}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="block text-zinc-300 font-semibold mb-2">
                                        Demo Username
                                    </label>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500"
                                        placeholder="Enter any username"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading || !username.trim()}
                                    className="w-full py-3 bg-orange-600 hover:bg-orange-700 disabled:bg-zinc-600 disabled:opacity-50 text-white rounded-lg transition-colors font-semibold"
                                >
                                    {isLoading
                                        ? "Creating Demo Account..."
                                        : "Demo Login"}
                                </button>
                            </form>

                            <div className="text-center">
                                <button
                                    onClick={() => setShowDemoLogin(false)}
                                    className="text-zinc-400 hover:text-zinc-300 text-sm underline"
                                >
                                    Back to Discord Login
                                </button>
                            </div>

                            <p className="text-zinc-400 text-sm text-center mt-4">
                                This is a demo login. Your data won't be saved.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Login;
