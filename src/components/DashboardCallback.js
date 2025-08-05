import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "./navbar";
import Footer from "./footer";
import Particles from "./particles";

const DashboardCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleTokenAuth = async () => {
            const token = searchParams.get("token");
            const userParam = searchParams.get("user");

            if (!token || !userParam) {
                setError("Invalid authentication response");
                setLoading(false);
                return;
            }

            try {
                // Parse user data from URL parameter
                const userData = JSON.parse(decodeURIComponent(userParam));

                // Store JWT token (you might want to store this securely)
                localStorage.setItem("distrack_jwt", token);

                // Log the user in with the provided data
                login(userData);

                // Navigate to user profile
                navigate(`/user/${userData.userId || userData.id}`);
            } catch (error) {
                console.error("Token auth error:", error);
                setError("Authentication failed. Please try again.");
                setLoading(false);
            }
        };

        handleTokenAuth();
    }, [searchParams, navigate, login]);

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
            <Footer />
        </div>
    );
};

export default DashboardCallback;
