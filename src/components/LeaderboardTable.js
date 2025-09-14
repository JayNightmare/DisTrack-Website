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

    // Normalize the incoming filter prop to internal keys without mutating the prop
    const period = (function mapFilter(f) {
        switch (f) {
            case "All Time":
                return "allTime";
            case "This Month":
                return "month";
            case "This Week":
                return "week";
            case "Today":
                return "day";
            default:
                return f; // assume already normalized
        }
    })(filter);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            setLoading(true);
            setError(null);
            try {
                const currentData = await getLeaderboardByFilter(period);

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
    }, [period]); // Refetch when filter changes

    // Add this useEffect to update the countdown every second
    useEffect(() => {
        // Calculate seconds until the NEXT boundary of the selected period.
        // Assumptions:
        //  - Day resets at local midnight
        //  - Week resets Monday 00:00 local time (change WEEK_RESET_DAY if needed: 1=Mon, 0=Sun)
        //  - Month resets on the 1st of next month 00:00 local time
        const WEEK_RESET_DAY = 1; // 1 = Monday. Set to 0 for Sunday resets if desired.

        const getTimeUntilNextReset = (p) => {
            if (p === "allTime") return null;
            const now = new Date();
            let target;

            switch (p) {
                case "day": {
                    target = new Date(now);
                    target.setDate(now.getDate() + 1);
                    target.setHours(0, 0, 0, 0);
                    break;
                }
                case "week": {
                    const dayOfWeek = now.getDay(); // 0=Sun ... 6=Sat
                    let daysUntilReset = (WEEK_RESET_DAY - dayOfWeek + 7) % 7;
                    if (daysUntilReset === 0) daysUntilReset = 7; // if already at reset day, go to next week
                    target = new Date(now);
                    target.setDate(now.getDate() + daysUntilReset);
                    target.setHours(0, 0, 0, 0);
                    break;
                }
                case "month": {
                    target = new Date(
                        now.getFullYear(),
                        now.getMonth() + 1,
                        1,
                        0,
                        0,
                        0,
                        0
                    );
                    break;
                }
                default:
                    return null;
            }

            const diffMs = target - now;
            return diffMs <= 0 ? 0 : Math.floor(diffMs / 1000);
        };

        const updateCountdown = () => {
            setTimeUntilReset(getTimeUntilNextReset(period));
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, [period]);

    const displayData = leaderboardData.length > 0 ? leaderboardData : null;

    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
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
        if (seconds == null) return "";
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const parts = [];
        if (hours > 0) parts.push(`${hours}h`);
        if (minutes > 0 || parts.length === 0) parts.push(`${minutes}m`);
        return parts.join(" ");
    };

    return (
        <div className="overflow-x-auto">
            {/* Display the time till next reset based on the filter selected */}
            {timeUntilReset !== null && period !== "allTime" && (
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
