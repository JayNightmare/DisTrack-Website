import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const WelcomeBackModal = ({ isOpen, onClose, user, onUpdateDisplayName }) => {
    console.log("WelcomeBackModal rendered with user:", user);
    const [displayName, setDisplayName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShowConfetti(true);
            // Stop confetti after 3 seconds
            const timer = setTimeout(() => setShowConfetti(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!displayName.trim()) return;

        setIsLoading(true);
        try {
            await onUpdateDisplayName(displayName.trim());
            onClose();
        } catch (error) {
            console.error("Failed to update display name:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSkip = () => {
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            {showConfetti && (
                <Confetti
                    width={
                        typeof window !== "undefined" ? window.innerWidth : 1200
                    }
                    height={
                        typeof window !== "undefined" ? window.innerHeight : 800
                    }
                    recycle={false}
                    numberOfPieces={200}
                />
            )}

            <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 w-full max-w-md mx-4">
                <div className="text-center">
                    <div className="mb-4">
                        <div className="text-6xl mb-2">🎉</div>
                        <h2 className="text-2xl font-bold text-white mb-2">
                            Welcome Back!
                        </h2>
                        <p className="text-zinc-300">
                            Great to see you again, {user?.username}!
                        </p>
                    </div>

                    <div className="mb-6">
                        <p className="text-zinc-400 text-sm mb-4">
                            We noticed you don't have a display name set yet, or
                            it's set to "Anonymous". Would you like to update it
                            now?
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-zinc-300 font-semibold mb-2 text-left">
                                Display Name
                            </label>
                            <input
                                type="text"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500"
                                placeholder="Enter your display name"
                                maxLength={32}
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={handleSkip}
                                className="flex-1 py-3 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg transition-colors font-semibold"
                            >
                                Skip for now
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading || !displayName.trim()}
                                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-600 disabled:opacity-50 text-white rounded-lg transition-colors font-semibold"
                            >
                                {isLoading ? "Updating..." : "Update"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default WelcomeBackModal;
