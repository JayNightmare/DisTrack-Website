import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";

const filters = ["All Time", "This Month", "This Week", "Today"];

const sampleData = [
    { username: "alice", time: "10h", change: 1 },
    { username: "bob", time: "8h", change: 0 },
    { username: "carol", time: "7h", change: -1 },
];

export default function Leaderboard() {
    const [filter, setFilter] = useState(filters[0]);

    return (
        <div className="min-h-screen bg-zinc-900 text-white p-8 space-y-6">
            {/* Nav Bar */}
            <Navbar />
            <h1 className="text-2xl font-bold">Leaderboard</h1>
            <div className="flex gap-4">
                {filters.map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-3 py-1 rounded ${
                            filter === f ? "bg-indigo-600" : "bg-zinc-800"
                        }`}
                    >
                        {f}
                    </button>
                ))}
            </div>
            <table className="min-w-full divide-y divide-zinc-700">
                <thead>
                    <tr className="text-left">
                        <th className="py-2">User</th>
                        <th className="py-2">Time</th>
                        <th className="py-2" />
                    </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                    {sampleData.map((row) => (
                        <tr key={row.username}>
                            <td className="py-2">
                                <Link
                                    to={`/user/${row.username}`}
                                    className="text-indigo-400 hover:underline"
                                >
                                    {row.username}
                                </Link>
                            </td>
                            <td className="py-2">{row.time}</td>
                            <td className="py-2">
                                {row.change > 0 && (
                                    <span className="text-green-500">↑</span>
                                )}
                                {row.change < 0 && (
                                    <span className="text-red-500">↓</span>
                                )}
                                {row.change === 0 && (
                                    <span className="text-gray-500">-</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
