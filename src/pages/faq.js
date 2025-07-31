import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Particles from "../components/particles";

export default function FAQ() {
    return (
        <div className="min-h-screen text-white p-8 space-y-6 bg-gradient-to-tl via-zinc-600/20 to-black from-black">
            <Navbar />
            <Particles />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center mb-6">FAQ</h1>
                <div className="bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800 p-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Frequently Asked Questions
                    </h2>
                    <ul className="list-disc pl-5 space-y-3 text-zinc-300">
                        <li>How do I join the leaderboard?</li>
                        <li>What data is used for the leaderboard?</li>
                        <li>How often is the leaderboard updated?</li>
                        <li>Can I see my own stats?</li>
                        <li>What if I don't see my name on the leaderboard?</li>
                    </ul>
                </div>
            </div>
            <Footer className="mt-8" />
        </div>
    );
}
