import React from "react";

/**
 * UserAvatar component with dynamic border colors based on user type
 * @param {Object} props - Component props
 * @param {string} props.src - Avatar image URL
 * @param {string} props.alt - Alt text for the image
 * @param {string} props.userType - User type: 'sponsor', 'private', or 'normal'
 * @param {string} props.size - Size class (e.g., 'w-8 h-8', 'w-16 h-16')
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.user - User object (optional, will derive userType if not provided)
 */
const UserAvatar = ({
    src,
    alt,
    userType,
    size = "w-10 h-10",
    className = "",
    user = null,
    ...props
}) => {
    // Determine user type from user object if not explicitly provided
    const getUserType = () => {
        if (userType) return userType;
        if (!user) return "normal";

        // Check user properties to determine type
        if (user.isSponsor || user.sponsor || user.userType === "sponsor") {
            return "sponsor";
        }
        if (user.premium || user.isPremium || user.userType === "premium") {
            return "premium";
        }
        if (!user.isPublic || user.userType === "private") {
            return "private";
        }
        return "normal";
    };

    const currentUserType = getUserType();

    // Border color classes based on user type
    const getBorderColor = (type) => {
        switch (type) {
            case "sponsor":
                return "border-pink-400 shadow-lg shadow-pink-400/20";
            case "premium":
                return "border-yellow-400 shadow-lg shadow-yellow-400/20";
            case "private":
                return "border-gray-500";
            case "normal":
            default:
                return "border-indigo-500";
        }
    };

    const borderColor = getBorderColor(currentUserType);

    return (
        <img
            src={src || "https://avatar.iran.liara.run/public"}
            alt={alt || "User Avatar"}
            className={`rounded-full border-2 ${borderColor} ${size} ${className}`}
            {...props}
        />
    );
};

export default UserAvatar;
