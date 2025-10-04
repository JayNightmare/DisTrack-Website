import React from "react";
import Navbar from "../components/navbar";

import Footer from "../components/footer";
import { motion, AnimatePresence } from "framer-motion";

export default function Showcase() {
    const [openIndex, setOpenIndex] = React.useState(null);

    const premiumFeatures = [
        "Charts",
        "Achievements",
        "Advanced user profile",
        "Extended Discord bot permissions",
        "Unlimited goals",
        "Unlimited teams",
    ];

    const sections = [
        {
            title: "About Us",
            content: (
                <p className="text-zinc-300">
                    DisTrack helps developers stay accountable by tracking
                    coding activity and sharing progress with friends.
                </p>
            ),
        },
        {
            title: "Premium Features",
            content: (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-zinc-300">
                    {premiumFeatures.map((f) => (
                        <li
                            key={f}
                            className="bg-zinc-700/50 p-3 rounded-lg hover:bg-zinc-700 transition-colors"
                        >
                            {f}
                        </li>
                    ))}
                </ul>
            ),
        },
        {
            title: "What You Can Do",
            content: (
                <p className="text-zinc-300">
                    Visualize your progress with interactive charts, track
                    achievements, and manage as many teams and goals as you need
                    with our premium tools.
                </p>
            ),
        },
        {
            title: "Special Offer",
            content: (
                <p className="text-zinc-300">
                    The first 100 people to sign up for premium will receive all
                    future premium updates for free, provided they remain
                    subscribed for at least 3 months.
                </p>
            ),
        },
        {
            title: "Community Growth",
            content: (
                <p className="text-zinc-300">
                    As our community grows, we plan to hold coding competitions
                    and team based leaderboards.
                </p>
            ),
        },
    ];

    return (
        <div className="min-h-screen text-white p-8 space-y-6 bg-gradient-to-tl via-zinc-600/20 to-black from-black">
            <Navbar />

            <section className="text-center mt-12 space-y-4">
                <h1 className="text-4xl font-extrabold">Discover DisTrack</h1>
                <p className="text-zinc-300 max-w-2xl mx-auto">
                    Explore premium tools designed to keep you motivated and
                    connected.
                </p>
                <a
                    href="/login"
                    className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg transition-colors"
                >
                    Get Started
                </a>
            </section>

            <div className="max-w-3xl mx-auto mt-8 space-y-4">
                {sections.map((s, i) => (
                    <div
                        key={s.title}
                        className="bg-zinc-800/50 rounded-lg overflow-hidden"
                    >
                        <button
                            type="button"
                            onClick={() =>
                                setOpenIndex(openIndex === i ? null : i)
                            }
                            className="w-full flex justify-between items-center p-4 hover:bg-zinc-700/50 transition-colors"
                        >
                            <h2 className="text-xl font-bold">{s.title}</h2>
                            <span className="text-2xl">
                                {openIndex === i ? "−" : "+"}
                            </span>
                        </button>
                        <AnimatePresence initial={false}>
                            {openIndex === i && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="px-4 pb-4"
                                >
                                    {s.content}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>

            <Footer className="mt-8" />
        </div>
    );
}
