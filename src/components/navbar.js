import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { HamburgerButton } from "../styles/m-nb-style";
import MobileNavbar from "./mobileNavbar";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const { isLoggedIn, user, logout, loading } = useAuth();

    // Handle body scroll locking for mobile menu
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.classList.add("mobile-menu-open");
        } else {
            document.body.classList.remove("mobile-menu-open");
        }

        // Cleanup on component unmount
        return () => {
            document.body.classList.remove("mobile-menu-open");
        };
    }, [isMobileMenuOpen]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isProfileDropdownOpen &&
                !event.target.closest(".profile-dropdown-container")
            ) {
                setIsProfileDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isProfileDropdownOpen]);

    // Don't render until auth context is loaded
    if (loading) {
        return null;
    }

    const handleLogout = () => {
        logout();
        setIsMobileMenuOpen(false); // Close mobile menu after logout
        setIsProfileDropdownOpen(false); // Close dropdown after logout
    };

    const handleLogin = () => {
        setIsMobileMenuOpen(false); // Close mobile menu after login
    };

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const closeProfileDropdown = () => {
        setIsProfileDropdownOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="navbar z-50">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    DisTrack
                </Link>

                <HamburgerButton
                    onClick={toggleMobileMenu}
                    $isOpen={isMobileMenuOpen}
                >
                    <span />
                    <span />
                    <span />
                </HamburgerButton>

                {/* Mobile Navbar */}
                <MobileNavbar
                    isMobileMenuOpen={isMobileMenuOpen}
                    closeMobileMenu={closeMobileMenu}
                />

                <div
                    className={`navbar-menu ${isMobileMenuOpen ? "open" : ""}`}
                >
                    <Link
                        to="/"
                        className="navbar-link"
                        onClick={closeMobileMenu}
                    >
                        Home
                    </Link>
                    <Link
                        to="/faq"
                        className="navbar-link"
                        onClick={closeMobileMenu}
                    >
                        FAQ
                    </Link>
                    <Link
                        to="/leaderboard"
                        className="navbar-link"
                        onClick={closeMobileMenu}
                    >
                        Leaderboard
                    </Link>
                    <Link
                        to="/downloads"
                        className="navbar-link"
                        onClick={closeMobileMenu}
                    >
                        Download
                    </Link>
                    <Link
                        to="/contact"
                        className="navbar-link"
                        onClick={closeMobileMenu}
                    >
                        Contact
                    </Link>
                </div>

                <div className="navbar-auth">
                    {isLoggedIn ? (
                        <div className="profile-dropdown-container relative">
                            <button
                                type="button"
                                onClick={toggleProfileDropdown}
                                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                            >
                                <img
                                    title="User Avatar"
                                    alt-text="User Avatar"
                                    src={
                                        user?.avatarUrl ||
                                        "https://avatar.iran.liara.run/public"
                                    }
                                    alt={`${user?.username}'s avatar`}
                                    className="w-8 h-8 rounded-full border-2 border-indigo-500"
                                />
                                <span className="hidden md:inline text-white">
                                    {user?.displayName ||
                                        user?.username ||
                                        "User"}
                                </span>
                                <svg
                                    title="Profile Menu"
                                    alt-text="Profile Menu"
                                    className={`w-4 h-4 text-white transition-transform duration-200 ${
                                        isProfileDropdownOpen
                                            ? "rotate-180"
                                            : ""
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            {isProfileDropdownOpen && (
                                <div className="absolute right-0 mt-11 w-48 bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg z-50">
                                    <div className="py-1">
                                        <Link
                                            to={`/user/${user?.userId}`}
                                            onClick={closeProfileDropdown}
                                            className="flex items-center px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                                        >
                                            <svg
                                                title="Profile"
                                                alt-text="Profile"
                                                className="w-4 h-4 mr-3"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                />
                                            </svg>
                                            View Profile
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="flex items-center w-full px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                                        >
                                            <svg
                                                title="Logout"
                                                alt-text="Logout"
                                                className="w-4 h-4 mr-3"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                />
                                            </svg>
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            onClick={handleLogin}
                            className="login-btn"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
