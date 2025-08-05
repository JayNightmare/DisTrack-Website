import React, { useState } from "react";

const NewUserSetupModal = ({ isOpen, onClose, discordUser, onCreateUser }) => {
    const [displayName, setDisplayName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1); // 1: display name, 2: extension guide

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!displayName.trim()) return;

        setIsLoading(true);
        try {
            await onCreateUser(discordUser, displayName.trim());
            setStep(2); // Move to extension guide
        } catch (error) {
            console.error("Failed to create user:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFinish = () => {
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 w-full max-w-md mx-4">
                {step === 1 ? (
                    <div>
                        <div className="text-center mb-6">
                            <div className="text-6xl mb-2">👋</div>
                            <h2 className="text-2xl font-bold text-white mb-2">
                                Welcome to DisTrack!
                            </h2>
                            <p className="text-zinc-300">
                                Hi {discordUser?.username}! Let's set up your
                                profile.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-zinc-300 font-semibold mb-2">
                                    Choose a Display Name
                                </label>
                                <input
                                    type="text"
                                    value={displayName}
                                    onChange={(e) =>
                                        setDisplayName(e.target.value)
                                    }
                                    className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500"
                                    placeholder="Enter your display name"
                                    maxLength={32}
                                    required
                                />
                                <p className="text-zinc-400 text-xs mt-1">
                                    This is how other users will see you on the
                                    leaderboard
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading || !displayName.trim()}
                                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-600 disabled:opacity-50 text-white rounded-lg transition-colors font-semibold"
                            >
                                {isLoading ? "Creating Profile..." : "Continue"}
                            </button>
                        </form>
                    </div>
                ) : (
                    <div>
                        <div className="text-center mb-6">
                            <div className="text-6xl mb-2">🚀</div>
                            <h2 className="text-2xl font-bold text-white mb-2">
                                Almost Done!
                            </h2>
                            <p className="text-zinc-300">
                                Install the DisTrack VS Code extension to start
                                tracking your coding time.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                                <h3 className="text-white font-semibold mb-2">
                                    📦 Install the Extension
                                </h3>
                                <p className="text-zinc-300 text-sm mb-3">
                                    Get the DisTrack extension from the VS Code
                                    marketplace:
                                </p>
                                <a
                                    href="https://marketplace.visualstudio.com/items?itemName=distrack.distrack"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold text-sm"
                                >
                                    Install Extension
                                </a>
                            </div>

                            <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                                <h3 className="text-white font-semibold mb-2">
                                    🔗 Connect Your Account
                                </h3>
                                <p className="text-zinc-300 text-sm">
                                    After installing, sign in to the extension
                                    with your Discord account to link your
                                    coding activity.
                                </p>
                            </div>

                            <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                                <h3 className="text-white font-semibold mb-2">
                                    📊 Start Tracking
                                </h3>
                                <p className="text-zinc-300 text-sm">
                                    Once connected, your coding time will
                                    automatically appear on the leaderboard!
                                </p>
                            </div>

                            <button
                                onClick={handleFinish}
                                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-semibold"
                            >
                                Go to My Profile
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewUserSetupModal;
