import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Particles from "../components/particles";
import EditProfileModal from "../components/EditProfileModal";
import { useAuth } from "../contexts/AuthContext";
import { getUserProfile } from "../api/userApi";

export default function User() {
    const { id } = useParams();
    const { isOwnProfile, updateUser } = useAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!id) {
                setError("No user ID provided");
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const userData = await getUserProfile(id);
                console.log("Fetched user data:", userData);
                if (userData) {
                    setUser(userData);
                } else {
                    setError("User not found");
                }
            } catch (err) {
                setError("Failed to load user profile");
                console.error("Error fetching user profile:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [id]);

    const handleEditProfile = () => {
        setShowEditModal(true);
    };

    const handleSaveProfile = (updatedUserData) => {
        setUser(updatedUserData);
        updateUser(updatedUserData);
    };

    const formatTime = (totalSeconds) => {
        if (!totalSeconds) return "No Time Recorded";

        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        let seconds = totalSeconds % 60;
        seconds = Math.ceil(seconds);

        const parts = [];
        if (days > 0) parts.push(`${days}d`);
        if (hours > 0) parts.push(`${hours}h`);
        if (minutes > 0) parts.push(`${minutes}m`);
        if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);

        return parts.join(" ");
    };

    if (loading) {
        return (
            <div className="min-h-screen text-white p-8 space-y-6 bg-gradient-to-tl via-zinc-600/20 to-black from-black">
                <Navbar />
                <Particles className="absolute inset-0 -z-10" quantity={100} />
                <div className="flex justify-center items-center py-16">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    <span className="ml-3 text-zinc-300">
                        Loading user profile...
                    </span>
                </div>
                <Footer className="mt-8" />
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="min-h-screen text-white p-8 space-y-6 bg-gradient-to-tl via-zinc-600/20 to-black from-black">
                <Navbar />
                <Particles className="absolute inset-0 -z-10" quantity={100} />
                <div className="flex justify-center items-center py-16">
                    <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 text-red-300 max-w-md">
                        <h2 className="text-xl font-semibold mb-2">
                            User Not Found
                        </h2>
                        <p>
                            {error ||
                                "The requested user profile could not be found."}
                        </p>
                        <p className="text-sm text-zinc-400 mt-2">
                            Please check the user ID or try again later.
                        </p>
                    </div>
                </div>
                <Footer className="mt-8" />
            </div>
        );
    }

    // Check if profile is private and user doesn't own it
    const isPrivateProfile = !user.isPublic && !isOwnProfile(id);

    const handleShareProfile = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        alert(
            "Profile link copied! Paste it in Discord or social media to share your profile."
        );
    };

    return (
        <div className="min-h-screen text-white p-8 space-y-6 bg-gradient-to-tl via-zinc-600/20 to-black from-black">
            <Navbar />
            <Particles className="absolute inset-0 -z-10" quantity={100} />

            <div className="max-w-4xl mx-auto space-y-6">
                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-lg p-6">
                    <div className="space-y-4 text-zinc-300">
                        {/* User Profile Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={
                                        user.avatarUrl ||
                                        "https://avatar.iran.liara.run/public"
                                    }
                                    alt={`${user.username}'s avatar`}
                                    className="w-16 h-16 rounded-full border-2 border-indigo-500"
                                />
                                <h1 className="text-3xl font-bold text-indigo-400">
                                    {user.displayName ||
                                        user.username ||
                                        "Unknown User"}
                                </h1>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleShareProfile}
                                    className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors flex items-center space-x-2"
                                    title="Copy profile link to clipboard"
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
                                            d="M8 17l4 4 4-4m0-5V3m-8 4v4a4 4 0 004 4h4"
                                        />
                                    </svg>
                                    <span>Share Profile</span>
                                </button>
                                {isOwnProfile(id) && (
                                    <button
                                        onClick={handleEditProfile}
                                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center space-x-2"
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
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                            />
                                        </svg>
                                        <span>Edit Profile</span>
                                    </button>
                                )}
                            </div>
                        </div>

                        {isPrivateProfile ? (
                            <div className="text-center py-8">
                                <div className="bg-zinc-800/50 border border-zinc-600/50 rounded-lg p-6">
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
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>
                                    <h3 className="text-lg font-semibold text-zinc-300 mb-2">
                                        Private Profile
                                    </h3>
                                    <p className="text-zinc-400">
                                        This user has set their profile to
                                        private.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Bio */}
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-zinc-300 mb-2">
                                        Bio
                                    </h3>
                                    <p className="text-zinc-400">
                                        {user.bio || "No bio set"}
                                    </p>
                                </div>

                                {user.socials &&
                                    Object.keys(user.socials).length > 0 && (
                                        <div className="space-y-2">
                                            <h2 className="text-lg font-semibold text-zinc-300 mb-2">
                                                Social Links
                                            </h2>
                                            <ul className="space-y-2">
                                                {Object.entries(
                                                    user.socials
                                                ).map(([label, url]) => (
                                                    <li key={label}>
                                                        <a
                                                            href={url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors inline-flex items-center"
                                                        >
                                                            <span className="capitalize">
                                                                {label}
                                                            </span>
                                                            <svg
                                                                className="w-4 h-4 ml-1"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                                />
                                                            </svg>
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                            </>
                        )}
                    </div>
                </div>

                {!isPrivateProfile && (
                    <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-lg font-semibold text-zinc-300 mb-2">
                                    Coding Statistics
                                </h2>
                                <div className="space-y-2">
                                    <p className="text-zinc-400">
                                        <span className="font-medium">
                                            Total Coding Time:
                                        </span>
                                        <span className="text-indigo-300 ml-2 font-mono">
                                            {formatTime(user.totalCodingTime)}
                                        </span>
                                    </p>
                                    {user.habits && (
                                        <p className="text-zinc-400">
                                            <span className="font-medium">
                                                Habits:
                                            </span>
                                            <span className="text-zinc-300 ml-2">
                                                {user.habits}
                                            </span>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer className="mt-8" />

            {/* Edit Profile Modal */}
            <EditProfileModal
                user={user}
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                onSave={handleSaveProfile}
            />
        </div>
    );
}
