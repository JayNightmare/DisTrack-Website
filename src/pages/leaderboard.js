import React, { useState } from "react";
import Navbar from "../components/navbar";
import Particles from "../components/particles";
import LeaderboardTable from "../components/LeaderboardTable";

const filters = ["All Time", "This Month", "This Week", "Today"];

export default function Leaderboard() {
    const [filter, setFilter] = useState(filters[0]);

    return (
        <div className="min-h-screen text-white p-8 space-y-6 bg-gradient-to-tl via-zinc-600/20 to-black from-black">
            {/* Nav Bar */}
            <Navbar />
            <Particles className="absolute inset-0 -z-10" quantity={100} />

            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Leaderboard
                </h1>

                <div className="flex gap-4 mb-8 justify-center flex-wrap">
                    {filters.map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                filter === f
                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/50"
                                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white"
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                <div className="bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800 p-6">
                    <LeaderboardTable filter={filter} />
                </div>
            </div>
        </div>
    );
}
