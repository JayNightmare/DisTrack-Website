import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";

const Footer = () => {
    return (
        <footer className="footer fade-in-custom">
            <div className="footer-container">
                <div className="footer-links text-center mb-4">
                    <Link
                        to="/faq"
                        className="text-white-500 hover:text-indigo transition duration-300"
                    >
                        FAQ
                    </Link>
                    <span className="mx-2">|</span>
                    <Link
                        to="/contact"
                        className="text-white-500 hover:text-indigo transition duration-300"
                    >
                        Contact
                    </Link>
                </div>
                <p className="text-center text-gray-500">
                    &copy; {new Date().getFullYear()} DisTrack. All rights
                    reserved.
                </p>
                <div className="social-links text-center">
                    <a
                        className="text-white-500 hover:text-indigo transition duration-300"
                        href="https://github.com/JayNightmare"
                    >
                        GitHub
                    </a>
                    <span className="mx-2">|</span>
                    <a
                        className="text-white-500 hover:text-indigo transition duration-300"
                        href="https://discord.gg/Zx45G4pZ3J"
                    >
                        Discord
                    </a>
                    <span className="mx-2">|</span>
                    <a
                        className="text-white-500 hover:text-blue transition duration-300"
                        href="https://LinkedIn.com/in/jordan-s-bell"
                    >
                        LinkedIn
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
