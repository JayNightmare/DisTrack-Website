import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Particles from "../components/particles";
import { useAuth } from "../contexts/AuthContext";
import { generateLinkCode, clearLinkCode } from "../api/userApi";
import { useNavigate } from "react-router-dom";

// Page reached when user clicks "Connect To Discord" (or VSCode extension deep link)
// If logged out -> show prompt to login
// If logged in -> allow generating a 6 digit code (linkCode) stored on their account.
// VSCode extension will ask the user for this code and then call backend to map extension install to discord user.

export default function LinkAccount() {
    const { user, isLoggedIn, updateUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [linkCode, setLinkCode] = useState(null);
    const [expiresAt, setExpiresAt] = useState(null); // ISO timestamp from backend
    const [cooldown, setCooldown] = useState(0); // seconds remaining before regenerate allowed
    const [copied, setCopied] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn && user?.linkCode) {
            setLinkCode(user.linkCode);
            if (user.linkCodeExpiresAt) setExpiresAt(user.linkCodeExpiresAt);
        }
    }, [isLoggedIn, user]);

    // Countdown timers for expiry & cooldown
    useEffect(() => {
        if (!expiresAt && cooldown <= 0) return;
        const interval = setInterval(() => {
            if (expiresAt && new Date(expiresAt).getTime() <= Date.now()) {
                setLinkCode(null);
                setExpiresAt(null);
            }
            setCooldown((c) => (c > 0 ? c - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, [expiresAt, cooldown]);

    const copyCode = () => {
        if (!linkCode) return;
        navigator.clipboard.writeText(linkCode).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const handleGenerate = async () => {
        if (cooldown > 0) return; // guard
        setLoading(true);
        setError(null);
        setSuccess(null);
        const data = await generateLinkCode();
        if (data?.linkCode) {
            setLinkCode(data.linkCode);
            if (data.expiresAt) setExpiresAt(data.expiresAt);
            if (typeof data.cooldownSeconds === "number")
                setCooldown(data.cooldownSeconds);
            updateUser({
                linkCode: data.linkCode,
                linkCodeExpiresAt: data.expiresAt || null,
            });
            setSuccess("Link code generated.");
        } else {
            setError("Failed to generate link code");
        }
        setLoading(false);
    };

    const handleClear = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        const data = await clearLinkCode();
        if (data?.success) {
            setLinkCode(null);
            updateUser({ linkCode: null });
            setSuccess("Link code cleared.");
            setExpiresAt(null);
            setCooldown(0);
        } else {
            setError("Failed to clear link code");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen text-white p-8 space-y-6 bg-gradient-to-tl via-zinc-600/20 to-black from-black">
            <Navbar />
            <Particles className="absolute inset-0 -z-10" quantity={100} />
            <div className="max-w-xl mx-auto mt-10 bg-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-lg p-6 space-y-6">
                <h1 className="text-2xl font-bold text-indigo-400 text-center">
                    Link VSCode Extension
                </h1>

                {!isLoggedIn && (
                    <div className="text-center space-y-4">
                        <p className="text-zinc-300">
                            You need to login with Discord to link your
                            extension.
                        </p>
                        <button
                            onClick={() => navigate("/login")}
                            className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-md font-semibold"
                        >
                            Login with Discord
                        </button>
                    </div>
                )}

                {isLoggedIn && (
                    <div className="space-y-4">
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            Generate a one-time 6 character alphanumeric link
                            code. Enter this code in the VSCode extension to
                            securely associate it with your DisTrack account.
                            Codes automatically expire and you can regenerate
                            after a short cooldown.
                        </p>
                        {linkCode ? (
                            <div className="flex flex-col items-center space-y-3">
                                <div className="text-4xl font-mono tracking-widest text-indigo-300 bg-zinc-800/60 px-6 py-4 rounded-lg border border-indigo-600/40">
                                    {linkCode}
                                </div>
                                <div className="flex gap-2 text-xs text-zinc-400">
                                    {expiresAt && (
                                        <span>
                                            Expires in:{" "}
                                            {expiresAt
                                                ? Math.max(
                                                      0,
                                                      Math.floor(
                                                          (new Date(
                                                              expiresAt
                                                          ).getTime() -
                                                              Date.now()) /
                                                              1000
                                                      )
                                                  )
                                                : 0}
                                            s
                                        </span>
                                    )}
                                    {cooldown > 0 && (
                                        <span className="text-amber-400">
                                            Regenerate in {cooldown}s
                                        </span>
                                    )}
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={copyCode}
                                        disabled={!linkCode}
                                        className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-md disabled:opacity-50 flex items-center gap-2"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 16h8a2 2 0 002-2V6a2 2 0 00-2-2H8a2 2 0 00-2 2v8a2 2 0 002 2zm0 4h8"
                                            />
                                        </svg>
                                        {copied ? "Copied" : "Copy"}
                                    </button>
                                    <button
                                        onClick={handleGenerate}
                                        disabled={loading || cooldown > 0}
                                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md disabled:opacity-50"
                                    >
                                        Regenerate
                                    </button>
                                    <button
                                        onClick={handleClear}
                                        disabled={loading}
                                        className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-md disabled:opacity-50"
                                    >
                                        Clear
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center">
                                <div className="flex flex-col items-center gap-2">
                                    <button
                                        onClick={handleGenerate}
                                        disabled={loading || cooldown > 0}
                                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-md font-semibold disabled:opacity-50"
                                    >
                                        {loading
                                            ? "Generating..."
                                            : cooldown > 0
                                            ? `Wait ${cooldown}s`
                                            : "Generate Link Code"}
                                    </button>
                                    {cooldown > 0 && (
                                        <span className="text-xs text-amber-400">
                                            You can generate a new code after
                                            cooldown.
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}
                        {error && (
                            <div className="text-sm text-red-400 bg-red-900/20 border border-red-500/40 p-3 rounded">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="text-sm text-green-400 bg-green-900/20 border border-green-500/40 p-3 rounded">
                                {success}
                            </div>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
