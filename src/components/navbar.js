import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { HamburgerButton } from "../styles/m-nb-style";
import MobileNavbar from "./mobileNavbar";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const isLoggedIn = false; // Replace with actual login state logic

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

    const handleLogout = () => {
        // signOut(auth);
        setIsMobileMenuOpen(false); // Close mobile menu after logout
    };

    const handleLogin = () => {
        // signIn(auth);
        setIsMobileMenuOpen(false); // Close mobile menu after login
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
                    <span></span>
                    <span></span>
                    <span></span>
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
                        <div className="user-menu">
                            <span className="username">User</span>
                            <button
                                onClick={handleLogout}
                                className="logout-btn"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button onClick={handleLogin} className="login-btn">
                            Login
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
