import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for stored user data on mount
        const storedUser = localStorage.getItem("distrack_user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Error parsing stored user data:", error);
                localStorage.removeItem("distrack_user");
            }
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        // Ensure consistent user data structure
        const normalizedUserData = {
            id: userData.id,
            userId: userData.userId || userData.id,
            discordId: userData.discordId,
            username: userData.username,
            displayName: userData.displayName || userData.username,
            bio: userData.bio,
            avatarUrl: userData.avatarUrl,
            socials: userData.socials || {},
            email: userData.email,
            createdAt: userData.createdAt,
            updatedAt: userData.updatedAt,
        };

        setUser(normalizedUserData);
        localStorage.setItem(
            "distrack_user",
            JSON.stringify(normalizedUserData)
        );
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("distrack_user");
    };

    const updateUser = (updatedData) => {
        const updatedUser = { ...user, ...updatedData };
        setUser(updatedUser);
        localStorage.setItem("distrack_user", JSON.stringify(updatedUser));
    };

    const isLoggedIn = () => {
        return user !== null;
    };

    const isOwnProfile = (userId) => {
        return user && (user.userId === userId || user.id === userId);
    };

    const value = {
        user,
        loading,
        login,
        logout,
        updateUser,
        isLoggedIn: isLoggedIn(),
        isOwnProfile,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default AuthContext;
