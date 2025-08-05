import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
    checkUserExists,
    createUser,
    updateUserDisplayName,
} from "../services/discordAuth";
import WelcomeBackModal from "./WelcomeBackModal";
import NewUserSetupModal from "./NewUserSetupModal";
import Navbar from "./navbar";
import Footer from "./footer";
import Particles from "./particles";

const DashboardCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasProcessed, setHasProcessed] = useState(false);

    // Modal states
    const [showWelcomeModal, setShowWelcomeModal] = useState(false);
    const [showNewUserModal, setShowNewUserModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // Prevent multiple executions
        if (hasProcessed) return;

        const handleAuth = async () => {
            try {
                const token = searchParams.get("token");
                const userParam = searchParams.get("user");

                // Handle new backend flow (JWT token + user data)
                if (token && userParam) {
                    await handleTokenAuth(token, userParam);
                    return;
                }

                // Handle legacy Discord OAuth flow
                const code = searchParams.get("code");
                const state = searchParams.get("state");
                const error = searchParams.get("error");

                if (error) {
                    setError("Discord authentication was cancelled or failed");
                    setLoading(false);
                    setHasProcessed(true);
                    return;
                }

                if (code && state) {
                    setError(
                        "Legacy OAuth flow is no longer supported. Please use the login button to authenticate."
                    );
                    setLoading(false);
                    setHasProcessed(true);
                    return;
                }

                // No valid parameters
                setError("Invalid authentication response");
                setLoading(false);
                setHasProcessed(true);
            } catch (err) {
                console.error("Auth error:", err);
                setError("Authentication failed. Please try again.");
                setLoading(false);
                setHasProcessed(true);
            }
        };

        const handleTokenAuth = async (token, userParam) => {
            try {
                // Parse user data more securely
                let userData;
                try {
                    const decodedUser = decodeURIComponent(userParam);
                    userData = JSON.parse(decodedUser);
                } catch (parseError) {
                    console.error("Failed to parse user data:", parseError);
                    setError("Invalid user data format");
                    setLoading(false);
                    setHasProcessed(true);
                    return;
                }

                // Validate userData structure
                if (!userData || !userData.id) {
                    setError("Invalid user data structure");
                    setLoading(false);
                    setHasProcessed(true);
                    return;
                }

                // Store JWT token
                try {
                    localStorage.setItem("distrack_jwt", token);
                } catch (storageError) {
                    console.warn("Could not store JWT token:", storageError);
                }

                // Check if user exists in our database
                const userCheck = await checkUserExists(userData.id);

                if (userCheck.exists) {
                    const existingUser = userCheck.user;
                    setCurrentUser(existingUser);

                    // Check if user needs to set display name
                    const needsDisplayName =
                        !existingUser.displayName ||
                        existingUser.displayName === "Anonymous" ||
                        existingUser.displayName.includes("Anonymous");

                    if (needsDisplayName) {
                        setShowWelcomeModal(true);
                        setLoading(false);
                        setHasProcessed(true);
                    } else {
                        // User is all set, log them in
                        login(existingUser);
                        setHasProcessed(true);
                        setTimeout(() => {
                            navigate(
                                `/user/${
                                    existingUser.userId || existingUser.id
                                }`,
                                { replace: true }
                            );
                        }, 100);
                    }
                } else {
                    // New user - show setup modal
                    setShowNewUserModal(true);
                    setLoading(false);
                    setHasProcessed(true);
                }
            } catch (error) {
                console.error("Token auth error:", error);
                setError("Authentication failed. Please try again.");
                setLoading(false);
                setHasProcessed(true);
            }
        };

        handleAuth();
    }, [searchParams, navigate, login, hasProcessed]);

    const handleWelcomeModalUpdateDisplayName = async (displayName) => {
        try {
            const updatedUser = await updateUserDisplayName(
                currentUser.id,
                displayName
            );
            login(updatedUser);
            setShowWelcomeModal(false);
            navigate(`/user/${updatedUser.userId || updatedUser.id}`, {
                replace: true,
            });
        } catch (error) {
            throw error;
        }
    };

    const handleWelcomeModalClose = () => {
        // User skipped display name update
        login(currentUser);
        setShowWelcomeModal(false);
        navigate(`/user/${currentUser.userId || currentUser.id}`, {
            replace: true,
        });
    };

    const handleNewUserCreate = async (discordUser, displayName) => {
        try {
            const newUser = await createUser(discordUser, displayName);
            setCurrentUser(newUser);
            login(newUser);
            // Navigation should happen after modal closes
        } catch (error) {
            throw error;
        }
    };

    const handleNewUserModalClose = () => {
        setShowNewUserModal(false);
        if (currentUser) {
            navigate(`/user/${currentUser.userId || currentUser.id}`, {
                replace: true,
            });
        } else {
            navigate("/login", { replace: true });
        }
    };

    if (error) {
        return (
            <div className="min-h-screen text-white p-8 space-y-6 bg-gradient-to-tl via-zinc-600/20 to-black from-black">
                <Navbar />
                <Particles className="absolute inset-0 -z-10" quantity={100} />
                <div className="flex justify-center items-center py-16">
                    <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-lg p-8 w-full max-w-md text-center">
                        <div className="text-6xl mb-4">❌</div>
                        <h1 className="text-2xl font-bold text-red-400 mb-4">
                            Authentication Failed - Dashboard Callback
                        </h1>
                        <p className="text-zinc-300 mb-6">{error}</p>
                        <Link
                            to="/login"
                            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-semibold"
                        >
                            Back to Login
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen text-white p-8 space-y-6 bg-gradient-to-tl via-zinc-600/20 to-black from-black">
            <Navbar />
            <Particles className="absolute inset-0 -z-10" quantity={100} />
            {loading && (
                <div className="flex justify-center items-center py-16">
                    <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-lg p-8 w-full max-w-md text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-500 mx-auto mb-4"></div>
                        <h1 className="text-2xl font-bold mb-4">
                            Authenticating Dashboard Callback...
                        </h1>
                        <p className="text-zinc-300">
                            Please wait while we set up your account.
                        </p>
                    </div>
                </div>
            )}

            {/* Modals */}
            {showWelcomeModal && currentUser && (
                <WelcomeBackModal
                    user={currentUser}
                    onUpdateDisplayName={handleWelcomeModalUpdateDisplayName}
                    onClose={handleWelcomeModalClose}
                />
            )}

            {showNewUserModal && (
                <NewUserSetupModal
                    user={currentUser}
                    onCreate={handleNewUserCreate}
                    onClose={handleNewUserModalClose}
                />
            )}

            <Footer />
        </div>
    );
};

export default DashboardCallback;
