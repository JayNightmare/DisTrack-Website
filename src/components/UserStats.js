import React, { useEffect, useMemo, useState } from "react";
import {
    getUserFilterStats,
    getUserHeatmapStats,
    getUserLanguageStats,
} from "../api/statsApi";

// Helpers
const toISODate = (d) => {
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const lastNDaysRange = (n) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - (n - 1));
    return { startDate: toISODate(start), endDate: toISODate(end) };
};

const secondsToShort = (s) => {
    if (!s || s <= 0) return "0m";
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
};

// Try to normalize API responses defensively
const normalizeDailySeries = (payload) => {
    // expected: [{ date: 'YYYY-MM-DD', seconds: number }]
    if (!payload) return [];
    if (Array.isArray(payload)) {
        return payload
            .map((d) => {
                const date = d.date || d.day || d.key || d.timestamp;
                const seconds =
                    d.seconds ?? d.totalSeconds ?? d.duration ?? d.time ?? 0;
                return date
                    ? { date: String(date).slice(0, 10), seconds }
                    : null;
            })
            .filter(Boolean)
            .sort((a, b) => (a.date < b.date ? -1 : 1));
    }
    if (typeof payload === "object") {
        // maybe a map { 'YYYY-MM-DD': seconds }
        return Object.entries(payload)
            .map(([date, seconds]) => ({
                date: String(date).slice(0, 10),
                seconds,
            }))
            .sort((a, b) => (a.date < b.date ? -1 : 1));
    }
    return [];
};

const normalizeHeatmap = (payload) => normalizeDailySeries(payload);

const normalizeLanguages = (payload) => {
    /* expected:
        {
            range: { start: YYYY-MM-DDT00:00:00.000Z, end: YYYY-MM-DDT00:00:00.000Z },
            topLanguages: [ "name" ],
            timeseries: [{ date: 'YYYY-MM-DD', languages: { name: seconds } }],
            totals: { name: seconds },
        }
    */
    if (!payload)
        return {
            range: null,
            topLanguages: [],
            timeseries: [],
            totals: {},
        };

    // If payload is already in expected format
    if (
        typeof payload === "object" &&
        payload !== null &&
        (payload.range ||
            payload.topLanguages ||
            payload.timeseries ||
            payload.totals)
    ) {
        // Normalize timeseries: [{ date, languages: { name: seconds } }]
        let timeseries = Array.isArray(payload.timeseries)
            ? payload.timeseries.map((ts) => ({
                  date: ts.date || ts.day || ts.key || ts.timestamp,
                  languages:
                      typeof ts.languages === "object" && ts.languages !== null
                          ? Object.fromEntries(
                                Object.entries(ts.languages).map(
                                    ([name, seconds]) => [
                                        name,
                                        Number(seconds) || 0,
                                    ]
                                )
                            )
                          : {},
              }))
            : [];

        // Normalize totals: { name: seconds }
        let totals =
            typeof payload.totals === "object" && payload.totals !== null
                ? Object.fromEntries(
                      Object.entries(payload.totals).map(([name, seconds]) => [
                          name,
                          Number(seconds) || 0,
                      ])
                  )
                : {};

        // Normalize topLanguages: [ "name" ]
        let topLanguages = Array.isArray(payload.topLanguages)
            ? payload.topLanguages.filter(Boolean).map(String)
            : [];

        // Normalize range
        let range = payload.range || null;

        return {
            range,
            topLanguages,
            timeseries,
            totals,
        };
    }

    // Fallback: array of languages
    if (Array.isArray(payload)) {
        const arr = payload
            .map((l) => {
                if (!l) return null;
                const name = l.topLanguage || l.name || l.lang || l.key;
                let seconds =
                    l.seconds ?? l.totalSeconds ?? l.duration ?? l.time ?? 0;
                seconds = Number(seconds) || 0;
                return name ? { name, seconds } : null;
            })
            .filter(Boolean)
            .sort((a, b) => b.seconds - a.seconds);
        // Convert to expected format
        return {
            range: null,
            topLanguages: arr.map((l) => l.name),
            timeseries: [],
            totals: Object.fromEntries(arr.map((l) => [l.name, l.seconds])),
        };
    }

    // Fallback: plain object { name: seconds }
    if (
        typeof payload === "object" &&
        payload !== null &&
        !(payload instanceof Date)
    ) {
        const arr = Object.entries(payload)
            .map(([name, seconds]) => ({ name, seconds: Number(seconds) || 0 }))
            .sort((a, b) => b.seconds - a.seconds);
        return {
            range: null,
            topLanguages: arr.map((l) => l.name),
            timeseries: [],
            totals: Object.fromEntries(arr.map((l) => [l.name, l.seconds])),
        };
    }
    // If nothing matches, return empty expected format
    return {
        range: null,
        topLanguages: [],
        timeseries: [],
        totals: {},
    };
};

// Simple sparkline component with SVG
const Sparkline = ({ data }) => {
    const width = 400;
    const height = 64;
    const padding = 8;
    const points = useMemo(() => {
        if (!data?.length) return "";
        const max = Math.max(...data.map((d) => d.seconds), 1);
        const step = (width - padding * 2) / (data.length - 1 || 1);
        return data
            .map((d, i) => {
                const x = padding + i * step;
                const y =
                    height -
                    padding -
                    (d.seconds / max) * (height - padding * 2);
                return `${x},${y}`;
            })
            .join(" ");
    }, [data]);

    const last = data?.[data.length - 1]?.seconds || 0;
    const total = data?.reduce((a, b) => a + (b.seconds || 0), 0) || 0;

    return (
        <div>
            <svg
                width="100%"
                viewBox={`0 0 ${width} ${height}`}
                className="overflow-visible"
            >
                <polyline
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="2"
                    points={points}
                />
            </svg>
            <div className="text-xs text-zinc-400 mt-1 flex gap-4">
                <span>
                    Last day:{" "}
                    <span className="text-indigo-300">
                        {secondsToShort(last)}
                    </span>
                </span>
                <span>
                    Period total:{" "}
                    <span className="text-indigo-300">
                        {secondsToShort(total)}
                    </span>
                </span>
            </div>
        </div>
    );
};

// Language bars without chart lib
const LanguageBars = ({ items }) => {
    const total = items.reduce((a, b) => a + b.seconds, 0) || 1;
    return (
        <div className="space-y-2">
            {items.slice(0, 5).map((l) => {
                const pct = Math.round((l.seconds / total) * 100);
                return (
                    <div key={l.name} className="space-y-1">
                        <div className="flex justify-between text-xs text-zinc-400">
                            <span className="text-zinc-300">{l.name}</span>
                            <span>{pct}%</span>
                        </div>
                        <div className="h-2 bg-zinc-800 rounded">
                            <div
                                className="h-2 rounded bg-indigo-500"
                                style={{ width: `${pct}%` }}
                                title={`${l.name}: ${secondsToShort(
                                    l.seconds
                                )}`}
                            />
                        </div>
                        {/* Time spent */}
                        <div className="text-xs text-zinc-400">
                            Time Spent: {secondsToShort(l.seconds)}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

// Year heatmap (simplified weekly blocks)
const Heatmap = ({ series }) => {
    // Debug: print incoming series
    console.log("Heatmap series:", series);
    // Debug: collect cell match info
    const cellDebug = [];
    // Renders a square grid of 14 days x 26 weeks (double days and half year)
    const weeks = 26;
    const days = 14;
    const grid = [];
    const byDate = new Map(series.map((d) => [d.date, d.seconds]));
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Build columns, newest on the right
    for (let w = weeks - 1; w >= 0; w--) {
        const col = [];
        for (let d = 0; d < days; d++) {
            const cell = new Date(today);
            cell.setDate(today.getDate() - (w * 7 + (days - 1 - d)));
            // Ensure date is formatted as YYYY-MM-DD
            const iso =
                cell.getFullYear() +
                "-" +
                String(cell.getMonth() + 1).padStart(2, "0") +
                "-" +
                String(cell.getDate()).padStart(2, "0");
            const hasMatch = byDate.has(iso);
            const seconds = byDate.get(iso) || 0;
            cellDebug.push({ iso, hasMatch, seconds });
            col.push({ iso, seconds });
        }
        grid.push(col);
    }

    // Debug: print cell match info
    console.log("Heatmap cellDebug:", cellDebug);

    const max = Math.max(1, ...series.map((s) => s.seconds));
    const color = (v) => {
        if (v === 0) return "bg-zinc-800/80";
        const t = v / max; // 0..1
        if (t < 0.25) return "bg-indigo-900";
        if (t < 0.5) return "bg-indigo-700";
        if (t < 0.75) return "bg-indigo-500";
        return "bg-indigo-400";
    };

    return (
        <div className="flex gap-1 overflow-x-auto py-1" title="Coding heatmap">
            {grid.map((col, i) => (
                <div key={i} className="flex flex-col gap-1">
                    {col.map((c) => (
                        <div
                            key={c.iso}
                            className={`w-3 h-3 rounded ${color(c.seconds)}`}
                            title={`${c.iso}: ${secondsToShort(c.seconds)}`}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default function UserStats({ userId, languageData, userStreaks }) {
    const [loading, setLoading] = useState(true);
    const [heatmap, setHeatmap] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [streaks, setStreaks] = useState({});
    const [series30, setSeries30] = useState([]);
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

                const langStats = normalizeLanguages(l);
                if (h && Array.isArray(h)) {
                    const daysEntry = h.find((item) => item.date === "days");
                    if (daysEntry) {
                        setHeatmap(
                            Object.entries(daysEntry.seconds).map(
                                ([date, seconds]) => ({
                                    date,
                                    seconds,
                                })
                            )
                        );
                    } else {
                        setHeatmap([]);
                    }
                } else {
                    setHeatmap([]);
                }
                setLanguages(
                    Object.entries(langStats.totals)
                        .map(([name, hours]) => ({
                            name,
                            seconds: Number(hours) * 3600,
                        }))
                        .sort((a, b) => b.seconds - a.seconds)
                );
                setSeries30(normalizeDailySeries(s));

                setStreaks(userStreaks || { current: 0, longest: 0 });
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
                <Heatmap series={heatmap} />
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
                {series30.length ? (
                    <Sparkline data={series30} />
                ) : (
                    <div className="text-xs text-zinc-400">No activity yet</div>
                )}
            </div>
        </div>
    );
}
