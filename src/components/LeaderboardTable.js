import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getLeaderboard } from "../api/leaderboardApi";

const LeaderboardTable = ({ filter }) => {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getLeaderboard();
                setLeaderboardData(data);
            } catch (err) {
                setError("Failed to load leaderboard data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, [filter]); // Refetch when filter changes

    const displayData = leaderboardData.length > 0 ? leaderboardData : null;

    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <span className="ml-3 text-zinc-300">
                    Loading leaderboard...
                </span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 text-red-300">
                <p>{error}</p>
                <p className="text-sm text-zinc-400 mt-2">
                    Showing sample data instead.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-700">
                <thead>
                    <tr className="text-left">
                        <th className="py-3 px-4 text-zinc-300 font-semibold">
                            Rank
                        </th>
                        <th className="py-3 px-4 text-zinc-300 font-semibold">
                            User
                        </th>
                        <th className="py-3 px-4 text-zinc-300 font-semibold">
                            Time
                        </th>
                        <th className="py-3 px-4 text-zinc-300 font-semibold">
                            Trend
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                    {displayData.map((row, index) => (
                        <tr
                            key={row.username || index}
                            className="hover:bg-zinc-800/50 transition-colors"
                        >
                            <td className="py-3 px-4 text-zinc-400">
                                #{index + 1}
                            </td>
                            <td className="py-3 px-4">
                                <Link
                                    to={`/user/${row.username}`}
                                    className="text-indigo-400 hover:text-indigo-300 hover:underline font-medium"
                                >
                                    {row.username}
                                </Link>
                            </td>
                            <td className="py-3 px-4 text-zinc-300 font-mono">
                                {row.time}
                            </td>
                            <td className="py-3 px-4">
                                {row.change > 0 && (
                                    <span className="text-green-400 flex items-center">
                                        <span className="text-lg">↗</span>
                                        <span className="ml-1 text-sm">
                                            +{row.change}
                                        </span>
                                    </span>
                                )}
                                {row.change < 0 && (
                                    <span className="text-red-400 flex items-center">
                                        <span className="text-lg">↘</span>
                                        <span className="ml-1 text-sm">
                                            {row.change}
                                        </span>
                                    </span>
                                )}
                                {row.change === 0 && (
                                    <span className="text-gray-500 flex items-center">
                                        <span className="text-lg">→</span>
                                        <span className="ml-1 text-sm">0</span>
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {displayData.length === 0 && !loading && (
                <div className="text-center py-8 text-zinc-400">
                    <p>No leaderboard data available</p>
                </div>
            )}
        </div>
    );
};

export default LeaderboardTable;
