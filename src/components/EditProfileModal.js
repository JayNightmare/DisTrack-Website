import React, { useState, useRef } from "react";
import { updateUserProfile } from "../api/userApi";

const EditProfileModal = ({ user, isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        displayName: user?.displayName || "",
        bio: user?.bio || "",
        socials: user?.socials || {},
        avatarUrl: user?.avatarUrl || "",
        isPublic: user?.isPublic !== undefined ? user.isPublic : false, // Default to false if not set
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [newSocialPlatform, setNewSocialPlatform] = useState("");
    const [newSocialUrl, setNewSocialUrl] = useState("");
    const fileInputRef = useRef(null);

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSocialChange = (platform, url) => {
        setFormData((prev) => ({
            ...prev,
            socials: {
                ...prev.socials,
                [platform]: url,
            },
        }));
    };

    const handleAddSocial = () => {
        if (
            newSocialPlatform &&
            newSocialUrl &&
            Object.keys(formData.socials).length < 5
        ) {
            handleSocialChange(newSocialPlatform, newSocialUrl);
            setNewSocialPlatform("");
            setNewSocialUrl("");
        }
    };

    const handleRemoveSocial = (platform) => {
        setFormData((prev) => {
            const newSocials = { ...prev.socials };
            delete newSocials[platform];
            return {
                ...prev,
                socials: newSocials,
            };
        });
    };

    const handleAvatarUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            // For now, we'll convert to base64. In production, you'd upload to a service
            const reader = new FileReader();
            reader.onload = (e) => {
                handleInputChange("avatarUrl", e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUseDiscordAvatar = () => {
        // This would integrate with Discord API in a real implementation
        const discordAvatarUrl = `https://avatar.iran.liara.run/public/${Math.floor(
            Math.random() * 100
        )}`;
        handleInputChange("avatarUrl", discordAvatarUrl);
    };

    const handleTogglePublic = () => {
        handleInputChange("isPublic", !formData.isPublic);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const userId = user.userId || user.id;
            const response = await updateUserProfile(userId, formData);

            if (response) {
                onSave({ ...user, ...formData });
                onClose();
            } else {
                setError("Failed to update profile");
            }
        } catch (err) {
            setError("An error occurred while updating your profile");
            console.error("Error updating profile:", err);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    const socialCount = Object.keys(formData.socials).length;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-zinc-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">
                            Edit Profile
                        </h2>
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

                    {error && (
                        <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 text-red-300 mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Avatar Section */}
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4">
                                Profile Picture
                            </h3>
                            <div className="flex items-center space-x-4 mb-4">
                                <img
                                    src={
                                        formData.avatarUrl ||
                                        "https://avatar.iran.liara.run/public"
                                    }
                                    alt="Profile"
                                    className="w-20 h-20 rounded-full border-2 border-indigo-500"
                                />
                                <div className="space-y-2">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            fileInputRef.current?.click()
                                        }
                                        className="block px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                                    >
                                        Upload New Photo
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleUseDiscordAvatar}
                                        className="block px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                                    >
                                        Use Random Avatar
                                    </button>
                                </div>
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarUpload}
                                className="hidden"
                            />
                        </div>

                        {/* Public Profile Toggle */}
                        <div className="flex items-center mb-4">
                            <input
                                type="checkbox"
                                checked={formData.isPublic}
                                onChange={handleTogglePublic}
                                className="h-4 w-4 text-indigo-600 border-zinc-600 rounded focus:ring-indigo-500"
                            />
                            <label className="ml-2 text-white">
                                Make my profile public
                            </label>
                        </div>

                        {/* Display Name Section */}
                        <div>
                            <label className="block text-white font-semibold mb-2">
                                Display Name
                            </label>
                            <input
                                type="text"
                                value={formData.displayName}
                                onChange={(e) =>
                                    handleInputChange(
                                        "displayName",
                                        e.target.value
                                    )
                                }
                                className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500"
                                placeholder="Enter your display name"
                            />
                        </div>

                        {/* Bio Section */}
                        <div>
                            <label className="block text-white font-semibold mb-2">
                                Bio
                            </label>
                            <textarea
                                value={formData.bio}
                                onChange={(e) =>
                                    handleInputChange("bio", e.target.value)
                                }
                                className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500"
                                rows={4}
                                placeholder="Tell us about yourself..."
                                maxLength={500}
                            />
                            <p className="text-zinc-400 text-sm mt-1">
                                {formData.bio.length}/500 characters
                            </p>
                        </div>

                        {/* Social Links Section */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-white">
                                    Social Links
                                </h3>
                                <span className="text-zinc-400 text-sm">
                                    {socialCount}/5
                                </span>
                            </div>

                            {/* Existing socials */}
                            <div className="space-y-3 mb-4">
                                {Object.entries(formData.socials).map(
                                    ([platform, url]) => (
                                        <div
                                            key={platform}
                                            className="flex items-center space-x-2"
                                        >
                                            <input
                                                type="text"
                                                value={platform}
                                                disabled
                                                className="w-1/3 p-2 bg-zinc-700 border border-zinc-600 rounded-lg text-zinc-300"
                                            />
                                            <input
                                                type="url"
                                                value={url}
                                                onChange={(e) =>
                                                    handleSocialChange(
                                                        platform,
                                                        e.target.value
                                                    )
                                                }
                                                className="flex-1 p-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500"
                                                placeholder="https://..."
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRemoveSocial(platform)
                                                }
                                                className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    )
                                )}
                            </div>

                            {/* Add new social */}
                            {socialCount < 5 && (
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        value={newSocialPlatform}
                                        onChange={(e) =>
                                            setNewSocialPlatform(e.target.value)
                                        }
                                        className="w-1/3 p-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500"
                                        placeholder="Platform name"
                                    />
                                    <input
                                        type="url"
                                        value={newSocialUrl}
                                        onChange={(e) =>
                                            setNewSocialUrl(e.target.value)
                                        }
                                        className="flex-1 p-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500"
                                        placeholder="https://..."
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddSocial}
                                        className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                                    >
                                        Add
                                    </button>
                                </div>
                            )}

                            {socialCount >= 5 && (
                                <p className="text-zinc-400 text-sm">
                                    Maximum of 5 social links allowed. Remove
                                    one to add another.
                                </p>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-4 pt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2 bg-zinc-600 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50"
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfileModal;
