import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Particles from "../components/particles";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

// Replace with actual faq data later
const faqData = [
    {
        question: "What is Dis.Track?",
        answer: "Dis.Track is a VSCode extension that tracks your coding time and allows you to share it with friends on Discord.",
    },
    {
        question: "How do I install Dis.Track?",
        answer: "You can install Dis.Track from the VSCode Marketplace by searching for 'Dis.Track'.",
        link: (
            <div className="flex gap-4 flex-wrap">
                <a
                    href="https://discord.com/oauth2/authorize?client_id=1305258645906526328"
                    className="inline-block px-2 py-1 mt-3 text-base
                            font-semibold text-white bg-black
                            rounded-lg shadow-md
                            transition duration-300 hover:bg-zinc-800
                            border border-zinc-600 hover:border-indigo-600"
                >
                    Invite Bot
                </a>

                <a
                    href="https://marketplace.visualstudio.com/items?itemName=JayNightmare.dis-track"
                    className="inline-block px-2 py-1 mt-3 text-base
                            font-semibold text-white bg-black
                            rounded-lg shadow-md
                            transition duration-300 hover:bg-zinc-800
                            border border-zinc-600 hover:border-pink-600"
                >
                    Download Extension
                </a>
            </div>
        ),
    },
    {
        question: "Is Dis.Track free?",
        answer: "Yes, Dis.Track is completely free to use.",
    },
    {
        question: "How do I view my coding stats?",
        answer: "You can view your coding stats directly in the Dis.Track extension panel in VSCode. You can also view your times via the Leaderboard or the User Profile page.",
        link: (
            <Link
                to="/leaderboard"
                className="inline-block px-2 py-1 mt-3 text-base
                            font-semibold text-white bg-black
                            rounded-lg shadow-md
                            transition duration-300 hover:bg-zinc-800
                            border border-zinc-600 hover:border-pink-600"
            >
                Leaderboard
            </Link>
        ),
    },
    {
        question: "Can I share my stats on Discord?",
        answer: "Yes, Dis.Track allows you to share your coding stats in 2 ways: Sharing the share link on your profile, or using the /profile user: command in Discord to view your profile card.",
    },
    {
        question: "How do I contact support?",
        answer: "You can contact support by going to the Contact page on the website or by joining our Discord server.",
        link: (
            <div className="flex gap-4 flex-wrap">
                <Link
                    to="/contact"
                    className="inline-block px-2 py-1 mt-3 text-base
                                font-semibold text-white bg-black
                                rounded-lg shadow-md
                                transition duration-300 hover:bg-zinc-800
                                border border-zinc-600 hover:border-pink-600"
                >
                    Contact Support
                </Link>
                <a
                    href="https://discord.gg/Zx45G4pZ3J"
                    className="inline-block px-2 py-1 mt-3 text-base
                                font-semibold text-white bg-black
                                rounded-lg shadow-md
                                transition duration-300 hover:bg-zinc-800
                                border border-zinc-600 hover:border-indigo-600"
                >
                    Join Discord
                </a>
            </div>
        ),
    },
    {
        question: "Can I contribute to Dis.Track?",
        answer: "Yes, you can contribute to Dis.Track by going to one of the GitHub repositories listed below and submitting a pull request. Makde sure to create a new branch for your changes. Note: You'll need to create environment variables to run the project locally. You can find the instructions in the README file of each repository. If you need help, open a issue on the repository.",
        link: (
            <div className="flex gap-4 flex-wrap">
                {/* VSCode Repo */}
                <a
                    href="https://github.com/JayNightmare/DisTrack-VSCode-Extension"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="inline-block px-2 py-1 mt-3 text-base
                            font-semibold text-white bg-black
                            rounded-lg shadow-md
                            transition duration-300 hover:bg-zinc-800
                            border border-zinc-600 hover:border-pink-600"
                >
                    VSCode Extension
                </a>
                {/* Website Repo */}
                <a
                    href="https://github.com/JayNightmare/DisTrack-Website"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="inline-block px-2 py-1 mt-3 text-base
                            font-semibold text-white bg-black
                            rounded-lg shadow-md
                            transition duration-300 hover:bg-zinc-800
                            border border-zinc-600 hover:border-orange-600"
                >
                    Website
                </a>
                {/* Backend Endpoint Repo */}
                <a
                    href="https://github.com/JayNightmare/DisTrack-Endpoint-Server"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="inline-block px-2 py-1 mt-3 text-base
                            font-semibold text-white bg-black
                            rounded-lg shadow-md
                            transition duration-300 hover:bg-zinc-800
                            border border-zinc-600 hover:border-red-600"
                >
                    API Endpoint
                </a>
                {/* Discord Bot Repo */}
                <a
                    href="https://github.com/JayNightmare/DisTrack-Discord-Bot"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="inline-block px-2 py-1 mt-3 text-base
                            font-semibold text-white bg-black
                            rounded-lg shadow-md
                            transition duration-300 hover:bg-zinc-800
                            border border-zinc-600 hover:border-indigo-600"
                >
                    Discord Bot
                </a>
            </div>
        ),
    },
    {
        question: "I don't see my name on the leaderboard, why?",
        answer: "The leaderboard updates every hour, but will update in real-time for users who contribute over 2 hours of coding time. If you still don't see your name, contact support with your username and we will look into it.",
        link: (
            <div className="flex gap-4 flex-wrap">
                <Link
                    to="/contact"
                    className="inline-block px-2 py-1 mt-3 text-base
                                font-semibold text-white bg-black
                                rounded-lg shadow-md
                                transition duration-300 hover:bg-zinc-800
                                border border-zinc-600 hover:border-pink-600"
                >
                    Contact Support
                </Link>
                <a
                    href="https://discord.gg/Zx45G4pZ3J"
                    className="inline-block px-2 py-1 mt-3 text-base
                                font-semibold text-white bg-black
                                rounded-lg shadow-md
                                transition duration-300 hover:bg-zinc-800
                                border border-zinc-600 hover:border-indigo-600"
                >
                    Join Discord
                </a>
            </div>
        ),
    },
    {
        question: "I'm on the leaderboard, but my name is Anonymous, why?",
        answer: "If you are on the leaderboard but your name is Anonymous, this means an error occurred during the login process on the extension. To fix, login on the website and go to settings, then click 'Refresh Stats'. This will update your username on the leaderboard. If you still see Anonymous, contact support with your username and we will look into it.",
        link: (
            <div className="flex gap-4 flex-wrap">
                <Link
                    to="/contact"
                    className="inline-block px-2 py-1 mt-3 text-base
                                font-semibold text-white bg-black
                                rounded-lg shadow-md
                                transition duration-300 hover:bg-zinc-800
                                border border-zinc-600 hover:border-pink-600"
                >
                    Contact Support
                </Link>
                <a
                    href="https://discord.gg/Zx45G4pZ3J"
                    className="inline-block px-2 py-1 mt-3 text-base
                                font-semibold text-white bg-black
                                rounded-lg shadow-md
                                transition duration-300 hover:bg-zinc-800
                                border border-zinc-600 hover:border-indigo-600"
                >
                    Join Discord
                </a>
            </div>
        ),
    },
];

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen text-white p-8 space-y-6 bg-gradient-to-tl via-zinc-600/20 to-black from-black">
            <Navbar />
            <Particles className="absolute inset-0 -z-10" quantity={100} />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center mb-6">FAQ</h1>
                {/* FAQ List */}
                <div className="space-y-4">
                    {faqData.map((item, index) => (
                        <button
                            // glass morphism effect
                            type="button"
                            className="w-full text-left bg-zinc-800 bg-opacity-50 p-4 rounded-lg shadow-lg transition-transform duration-300 border-b border-zinc-700"
                            style={{ cursor: "pointer" }}
                            key={index}
                            onClick={() => toggle(index)}
                        >
                            <div className="w-full text-left">
                                <span className="pr-2">
                                    {activeIndex === index ? "▾" : "▸"}
                                </span>
                                {item.question}
                            </div>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        key="content"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="mt-2 text-zinc-300"
                                    >
                                        <div className="text-sm">
                                            {item.answer}
                                        </div>
                                        <div>{item.link}</div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    ))}
                </div>
            </div>
            <Footer className="mt-8" />
        </div>
    );
}
