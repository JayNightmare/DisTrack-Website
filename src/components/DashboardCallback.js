import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { checkUserExists, createUser } from "../services/discordAuth";
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

    // Capture optional redirect target (e.g., coming from /link-account)
    const [redirectPath] = useState(() => {
        const qp = searchParams.get("redirect");
        if (qp) return qp.startsWith("/") ? qp : `/${qp}`; // normalize
        try {
            return localStorage.getItem("post_login_redirect");
        } catch (_) {
            return null;
        }
    });

    // Modal states
    const [showNewUserModal, setShowNewUserModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
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
                    return;
                }

                if (code && state) {
                    setError(
                        "Legacy OAuth flow is no longer supported. Please use the login button to authenticate."
                    );
                    setLoading(false);
                    return;
                }

                // No valid parameters
                setError("Invalid authentication response");
                setLoading(false);
            } catch (err) {
                console.error("Auth error:", err);
                setError("Authentication failed. Please try again.");
                setLoading(false);
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
                    return;
                }

                // Validate userData structure
                if (!userData || !userData.userId) {
                    setError("Invalid user data structure");
                    setLoading(false);
                    return;
                }

                // Store JWT token
                try {
                    localStorage.setItem("distrack_jwt", token);
                } catch (storageError) {
                    console.warn("Could not store JWT token:", storageError);
                }

                // Store the distrack_user
                try {
                    localStorage.setItem(
                        "distrack_user",
                        JSON.stringify(userData)
                    );
                } catch (storageError) {
                    console.warn("Could not store user data:", storageError);
                }

                // Check if user exists in our database
                const userCheck = await checkUserExists(userData.userId);
                console.log("User check result:", userCheck);

                if (userCheck.exists) {
                    const existingUser = userCheck.user;

                    const userExists = userCheck.exists;
                    console.log("User exists:", userExists);
                    console.log("Existing user:", existingUser.user);
                    setCurrentUser(existingUser.user);

                    login(existingUser.user);
                    setTimeout(() => {
                        const dest =
                            redirectPath ||
                            `/user/${
                                existingUser.user.userId || existingUser.id
                            }`;
                        try {
                            if (redirectPath) {
                                localStorage.removeItem("post_login_redirect");
                            }
                        } catch (_) {}
                        navigate(dest, { replace: true });
                    }, 1500);
                } else {
                    // New user - show setup modal
                    setShowNewUserModal(true);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Token auth error:", error);
                setError("Authentication failed. Please try again.");
                setLoading(false);
            }
        };

        handleAuth();
    }, [searchParams, navigate, login, redirectPath]);

    const handleNewUserCreate = async (discordUser, displayName) => {
        try {
            const newUser = await createUser(discordUser, displayName);
            setCurrentUser(newUser);
            login(newUser);
            // Navigation should happen after modal closes
        } catch (error) {
            console.error("Failed to create new user:", error);
            setError("Failed to create user. Please try again.");
            throw error;
        }
    };

    const handleNewUserModalClose = () => {
        setShowNewUserModal(false);
        const dest = currentUser
            ? redirectPath || `/user/${currentUser.userId || currentUser.id}`
            : redirectPath || "/login";
        try {
            if (redirectPath) {
                localStorage.removeItem("post_login_redirect");
            }
        } catch (_) {}
        navigate(dest, { replace: true });
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
                            Authentication Failed
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
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-500 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold mb-4">
                            Authenticating...
                        </h1>
                        <p className="text-zinc-300">
                            Please wait while we set up your account.
                        </p>
                    </div>
                </div>
            )}

            {/* New user setup modal */}
            {showNewUserModal && currentUser && (
                <NewUserSetupModal
                    isOpen={showNewUserModal}
                    discordUser={currentUser}
                    onCreateUser={handleNewUserCreate}
                    onClose={handleNewUserModalClose}
                />
            )}

            <Footer />
        </div>
    );
};

export default DashboardCallback;
