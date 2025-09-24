import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { searchUsers } from "../api/userApi";

const UserSearchModal = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    const handleSearch = async (searchQuery) => {
        if (!searchQuery.trim()) {
            setResults([]);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const searchResults = await searchUsers(searchQuery.trim());
            setResults(searchResults || []);
        } catch (err) {
            console.error("Search error:", err);
            setError("Failed to search users. Please try again.");
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    // Debounce search with useEffect
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (query.trim()) {
                handleSearch(query);
            } else {
                setResults([]);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
    };

    const handleUserSelect = () => {
        setQuery("");
        setResults([]);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 pt-20">
            <div className="bg-zinc-900 rounded-lg max-w-2xl w-full mx-4 max-h-[70vh] overflow-hidden border border-zinc-700">
                <div className="p-4 border-b border-zinc-700">
                    <div className="flex items-center space-x-3">
                        <svg
                            className="w-5 h-5 text-zinc-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={handleInputChange}
                            placeholder="Search for users..."
                            className="flex-1 bg-transparent text-white text-lg placeholder-zinc-400 outline-none"
                        />
                        <button
                            onClick={onClose}
                            className="text-zinc-400 hover:text-white transition-colors"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="max-h-96 overflow-y-auto">
                    {loading && (
                        <div className="p-8 text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto mb-4"></div>
                            <p className="text-zinc-400">Searching...</p>
                        </div>
                    )}

                    {error && (
                        <div className="p-4 text-center">
                            <p className="text-red-400">{error}</p>
                        </div>
                    )}

                    {!loading && !error && query && results.length === 0 && (
                        <div className="p-8 text-center">
                            <svg
                                className="w-12 h-12 text-zinc-500 mx-auto mb-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            <p className="text-zinc-400">
                                No users found for "{query}"
                            </p>
                        </div>
                    )}

                    {!loading && !error && !query && (
                        <div className="p-8 text-center">
                            <svg
                                className="w-12 h-12 text-zinc-500 mx-auto mb-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            <p className="text-zinc-400">
                                Start typing to search for users
                            </p>
                        </div>
                    )}

                    {results.length > 0 && (
                        <div className="py-2">
                            {results.map((user) => (
                                <Link
                                    key={user.userId || user.id}
                                    to={`/user/${user.userId || user.id}`}
                                    onClick={handleUserSelect}
                                    className="flex items-center p-4 hover:bg-zinc-800 transition-colors border-b border-zinc-800 last:border-b-0"
                                >
                                    <img
                                        src={
                                            user.avatarUrl ||
                                            "https://avatar.iran.liara.run/public"
                                        }
                                        alt={user.displayName || user.username}
                                        className="w-10 h-10 rounded-full border-2 border-indigo-500 mr-3"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-white font-semibold">
                                            {user.displayName || user.username}
                                        </h3>
                                        {user.displayName &&
                                            user.username !==
                                                user.displayName && (
                                                <p className="text-zinc-400 text-sm">
                                                    @{user.username}
                                                </p>
                                            )}
                                        <div className="flex items-center space-x-4 text-zinc-400 text-xs mt-1">
                                            {user.currentStreak !==
                                                undefined && (
                                                <span>
                                                    🔥 {user.currentStreak} day
                                                    streak
                                                </span>
                                            )}
                                            {user.totalCodingTime !==
                                                undefined && (
                                                <span>
                                                    ⏱️{" "}
                                                    {Math.round(
                                                        user.totalCodingTime /
                                                            3600
                                                    )}
                                                    h total
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <svg
                                        className="w-5 h-5 text-zinc-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                <div className="p-3 border-t border-zinc-700 bg-zinc-800 text-xs text-zinc-400">
                    <p>
                        Press ESC to close • Click on a user to view their
                        profile
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserSearchModal;
