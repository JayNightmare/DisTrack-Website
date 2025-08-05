import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { createUser, updateUserDisplayName } from "../services/discordAuth";
import WelcomeBackModal from "./WelcomeBackModal";
import NewUserSetupModal from "./NewUserSetupModal";
import Navbar from "./navbar";
import Footer from "./footer";
import Particles from "./particles";

const DiscordCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { login } = useAuth();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showWelcomeModal, setShowWelcomeModal] = useState(false);
    const [showNewUserModal, setShowNewUserModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const handleAuth = async () => {
            const code = searchParams.get("code");
            const state = searchParams.get("state");
            const error = searchParams.get("error");

            if (error) {
                setError("Discord authentication was cancelled or failed");
                setLoading(false);
                return;
            }

            if (!code || !state) {
                setError(
                    "Invalid authentication response. This route may not be used with the current backend configuration."
                );
                setLoading(false);
                return;
            }

            // Since the backend now handles OAuth directly and redirects to /dashboard,
            // this callback route may not be used anymore
            setError(
                "This authentication route is deprecated. Please use the login button to authenticate."
            );
            setLoading(false);
        };

        handleAuth();
    }, [searchParams, navigate, login]);

    const handleWelcomeModalUpdateDisplayName = async (displayName) => {
        try {
            const updatedUser = await updateUserDisplayName(
                currentUser.id,
                displayName
            );
            login(updatedUser);
            setShowWelcomeModal(false);
            navigate(`/user/${updatedUser.userId || updatedUser.id}`);
        } catch (error) {
            throw error;
        }
    };

    const handleWelcomeModalClose = () => {
        // User skipped display name update
        login(currentUser);
        setShowWelcomeModal(false);
        navigate(`/user/${currentUser.userId || currentUser.id}`);
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
            navigate(`/user/${currentUser.userId || currentUser.id}`);
        } else {
            navigate("/login");
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
                            Authentication Failed
                        </h1>
                        <p className="text-zinc-300 mb-6">{error}</p>
                        <button
                            onClick={() => navigate("/login")}
                            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-semibold"
                        >
                            Back to Login
                        </button>
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
                            Authenticating...
                        </h1>
                        <p className="text-zinc-300">
                            Please wait while we set up your account.
                        </p>
                    </div>
                </div>
            )}

            <WelcomeBackModal
                isOpen={showWelcomeModal}
                onClose={handleWelcomeModalClose}
                user={currentUser}
                onUpdateDisplayName={handleWelcomeModalUpdateDisplayName}
            />

            <NewUserSetupModal
                isOpen={showNewUserModal}
                onClose={handleNewUserModalClose}
                discordUser={null}
                onCreateUser={handleNewUserCreate}
            />

            <Footer />
        </div>
    );
};

export default DiscordCallback;
