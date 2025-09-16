import React, { useEffect, useState } from "react";
import {
    getUserFilterStats,
    getUserHeatmapStats,
    getUserLanguageStats,
} from "../api/statsApi";
import Sparkline from "./stats/Sparkline";
import Heatmap from "./stats/Heatmap";
import LanguageBars from "./stats/LanguageBars";
import DayBreakdown from "./stats/DayBreakdown";
import { lastNDaysRange } from "./stats/timeUtils";
import { normalizeHeatmap, normalizeLanguages } from "./stats/normalizers";
import { computeStreaks, mergeStreakOverride } from "./stats/streakUtils";

export default function UserStats({ userId, languageData, userStreaks }) {
    const [loading, setLoading] = useState(true);
    const [heatmap, setHeatmap] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [streaks, setStreaks] = useState({});
    const [trend30, setTrend30] = useState(null); // raw trend object { series, movingAverages, anomalies }
    const [languageDaily, setLanguageDaily] = useState({}); // { 'YYYY-MM-DD': { lang: seconds } }
    const [selectedDate, setSelectedDate] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                const year = new Date().getFullYear();
                const { startDate, endDate } = lastNDaysRange(30);

                const [h, l, s] = await Promise.all([
                    getUserHeatmapStats(userId, year),
                    getUserLanguageStats(userId, startDate, endDate),
                    getUserFilterStats(userId, startDate, endDate),
                ]);
                if (cancelled) return;
                // Heatmap (normalized first)
                const normalizedHeatmap = normalizeHeatmap(h);
                setHeatmap(normalizedHeatmap);

                // Languages
                const langStats = normalizeLanguages(l);
                // Top totals list (API hours; normalizer converts to seconds already)
                setLanguages(
                    Object.entries(langStats.totals)
                        .map(([name, seconds]) => ({
                            name,
                            seconds: Number(seconds) || 0,
                        }))
                        .sort((a, b) => b.seconds - a.seconds)
                );
                // Build per-day language map for breakdowns
                const daily = {};
                for (const ts of langStats.timeseries || []) {
                    const d = String(ts.date || "").slice(0, 10);
                    if (!d) continue;
                    daily[d] = ts.languages || {};
                }
                setLanguageDaily(daily);

                // Debug log for series / trend
                // eslint-disable-next-line no-console
                console.log("UserStats trend raw:", s);

                // Trend series handling: prefer raw object shape { series, movingAverages }
                if (s && typeof s === "object" && Array.isArray(s.series)) {
                    setTrend30(s);
                } else if (Array.isArray(s)) {
                    // Legacy array of daily stats -> convert to raw trend object
                    const converted = s.map((d) => ({
                        date: d.date || d.day || d.key,
                        totalHours: (d.seconds || d.totalSeconds || 0) / 3600,
                        sessions: d.sessions || 0,
                    }));
                    setTrend30({
                        series: converted,
                        movingAverages: { ma7: [], ma30: [] },
                        anomalies: {},
                    });
                } else {
                    setTrend30({
                        series: [],
                        movingAverages: { ma7: [], ma30: [] },
                        anomalies: {},
                    });
                }

                // Derive streaks from heatmap (computed) then apply any override provided via props
                const derivedStreaks = computeStreaks(normalizedHeatmap);
                setStreaks(
                    mergeStreakOverride(derivedStreaks, userStreaks) || {
                        current: 0,
                        longest: 0,
                    }
                );
            } catch (e) {
                if (!cancelled) setError("Failed to load user stats");
                // eslint-disable-next-line no-console
                console.error("UserStats error:", e);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        if (userId) load();
        return () => {
            cancelled = true;
        };
    }, [userId, languageData, userStreaks]);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
                <div className="h-28 bg-zinc-800/50 rounded" />
                <div className="h-28 bg-zinc-800/50 rounded" />
                <div className="h-40 bg-zinc-800/50 rounded md:col-span-2" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-300 bg-red-900/20 border border-red-500/50 rounded p-4">
                {error}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 hl-grid gap-6">
            {/* Heatmap */}
            <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-zinc-300">
                        Heatmap
                    </h3>
                    <div className="text-xs text-zinc-400">
                        Longest:{" "}
                        <span className="text-indigo-300 font-medium">
                            {streaks.longest}
                        </span>{" "}
                        days
                    </div>
                </div>
                <div className="text-sm text-zinc-300 mb-2">
                    Current streak:{" "}
                    <span className="text-indigo-300 font-medium">
                        {streaks.current}
                    </span>{" "}
                    days
                </div>
                <Heatmap
                    series={heatmap}
                    onSelect={setSelectedDate}
                    selectedDate={selectedDate}
                />
                <div className="mt-3 text-xs text-zinc-300">
                    {selectedDate ? (
                        <DayBreakdown
                            date={selectedDate}
                            languages={languageDaily[selectedDate]}
                            trendSeries={trend30?.series}
                            daySeconds={
                                heatmap.find((d) => d.date === selectedDate)
                                    ?.seconds ?? null
                            }
                            debug={true}
                        />
                    ) : (
                        <span className="text-zinc-500">
                            Click a day to see details
                        </span>
                    )}
                </div>
            </div>

            {/* Languages */}
            <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-zinc-300">
                        Top Languages (30 days)
                    </h3>
                </div>
                {languages.length ? (
                    <LanguageBars items={languages} />
                ) : (
                    <div className="text-xs text-zinc-400">
                        No language data
                    </div>
                )}
            </div>

            {/* Trend sparkline */}
            <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-lg p-4 md:col-span-2">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-zinc-300">
                        Last 30 days
                    </h3>
                </div>
                {trend30?.series?.length ? (
                    <Sparkline trend={trend30} />
                ) : (
                    <div className="text-xs text-zinc-400">No activity yet</div>
                )}
            </div>
        </div>
    );
}
