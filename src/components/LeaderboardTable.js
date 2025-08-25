import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getLeaderboardByFilter } from "../api/leaderboardApi";
import { getTrendIcon } from "./trendIcon";
import { calculateDeltaRankings } from "../utils/deltaRankings";

const LeaderboardTable = ({ filter }) => {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timeUntilReset, setTimeUntilReset] = useState(null);

    if (filter === "All Time") {
        filter = "allTime";
    } else if (filter === "This Month") {
        filter = "month";
    } else if (filter === "This Week") {
        filter = "week";
    } else if (filter === "Today") {
        filter = "day";
    }

    useEffect(() => {
        const fetchLeaderboard = async () => {
            setLoading(true);
            setError(null);
            try {
                const currentData = await getLeaderboardByFilter(filter);

                // Calculate delta rankings to show trends (without previous data for now)
                const dataWithTrends = calculateDeltaRankings(
                    currentData,
                    null
                );

                setLeaderboardData(dataWithTrends);
            } catch (err) {
                setError("Failed to load leaderboard data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, [filter]); // Refetch when filter changes

    // Add this useEffect to update the countdown every second
    useEffect(() => {
        const getTimeUntilNextReset = (filter) => {
            const now = Date.now();
            const resetTime = new Date();

            switch (filter) {
                case "allTime":
                    // No reset for all time
                    return null;
                case "month":
                    resetTime.setMonth(resetTime.getMonth() + 1);
                    break;
                case "week":
                    resetTime.setDate(resetTime.getDate() + 7);
                    break;
                case "day":
                    resetTime.setDate(resetTime.getDate() + 1);
                    break;
                default:
                    return null;
            }

            return Math.max(0, Math.floor((resetTime - now) / 1000));
        };

        const updateCountdown = () => {
            const timeLeft = getTimeUntilNextReset(filter);
            setTimeUntilReset(timeLeft);
        };

        // Update immediately
        updateCountdown();

        // Set up interval to update every second
        const interval = setInterval(updateCountdown, 1000);

        // Cleanup interval on component unmount or filter change
        return () => clearInterval(interval);
    }, [filter]);

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
                    Please check your internet connection or try again later.
                </p>
            </div>
        );
    }

    // * Format the time (seconds) to hours and minutes
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const parts = [];
        if (hours > 0) parts.push(`${hours}h`);
        if (minutes > 0) parts.push(`${minutes}m`);
        return parts.length > 0 ? parts.join(" ") : "0m";
    };

    return (
        <div className="overflow-x-auto">
            {/* Display the time till next reset based on the filter selected */}
            {timeUntilReset !== null && filter !== "allTime" && (
                <div className="py-4 px-6 text-zinc-400">
                    Time until next reset:{" "}
                    <span className="font-mono text-indigo-400">
                        {formatTime(timeUntilReset)}
                    </span>
                </div>
            )}
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
                                    to={`/user/${row.userId}`}
                                    className="text-indigo-400 hover:text-indigo-300 hover:underline font-medium"
                                >
                                    {row.displayName || row.username}
                                </Link>
                            </td>
                            <td className="py-3 px-4 text-zinc-300 font-mono">
                                {formatTime(row.totalTime)}
                            </td>
                            <td className="py-3 px-4">
                                {(() => {
                                    const { icon, color } = getTrendIcon(
                                        row.trend
                                    );
                                    return (
                                        <span
                                            className={`flex items-center ${color}`}
                                        >
                                            <span className="text-lg">
                                                {icon}
                                            </span>
                                            <span className="ml-1 text-sm">
                                                {row.trend === "new"
                                                    ? "NEW"
                                                    : row.trend === "same"
                                                    ? "0"
                                                    : row.trend === "up"
                                                    ? `+${row.rankDelta}`
                                                    : row.rankDelta || "0"}
                                            </span>
                                        </span>
                                    );
                                })()}
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
