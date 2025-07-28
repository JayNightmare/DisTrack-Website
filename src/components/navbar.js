import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogin = () => {
        // Add login logic here
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        // Add logout logic here
        setIsLoggedIn(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    DisTrack
                </Link>

                <div className="navbar-toggle" onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>

                <div className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
                    <Link
                        to="/"
                        className="navbar-link"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        to="/dashboard"
                        className="navbar-link"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/leaderboard"
                        className="navbar-link"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Leaderboard
                    </Link>
                    <Link
                        to="/extension"
                        className="navbar-link"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Download
                    </Link>
                    <Link
                        to="/contact"
                        className="navbar-link"
                        onClick={() => setIsMenuOpen(false)}
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
                            Login with Discord
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
