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

// Format a Date as YYYY-MM-DD in UTC to avoid TZ drift with API keys
const toISODateUTC = (d) => {
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(
        d.getUTCDate()
    )}`;
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

// Heatmap normalizer: accepts arrays or objects like { days: { 'YYYY-MM-DD': seconds } }
const normalizeHeatmap = (payload) => {
    if (!payload) return [];
    // Already an array of day objects
    if (Array.isArray(payload)) return normalizeDailySeries(payload);
    // Object with 'days' map
    if (
        typeof payload === "object" &&
        payload !== null &&
        typeof payload.days === "object" &&
        payload.days !== null
    ) {
        return Object.entries(payload.days)
            .map(([date, seconds]) => ({
                date: String(date).slice(0, 10),
                seconds: Number(seconds) || 0,
            }))
            .sort((a, b) => (a.date < b.date ? -1 : 1));
    }
    // Plain object mapping dates to seconds
    if (typeof payload === "object" && payload !== null) {
        return Object.entries(payload)
            .map(([date, seconds]) => ({
                date: String(date).slice(0, 10),
                seconds: Number(seconds) || 0,
            }))
            .sort((a, b) => (a.date < b.date ? -1 : 1));
    }
    return [];
};

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
        const timeseries = Array.isArray(payload.timeseries)
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
        const totals =
            typeof payload.totals === "object" && payload.totals !== null
                ? Object.fromEntries(
                      Object.entries(payload.totals).map(([name, seconds]) => [
                          name,
                          Number(seconds) || 0,
                      ])
                  )
                : {};

        // Normalize topLanguages: [ "name" ]
        const topLanguages = Array.isArray(payload.topLanguages)
            ? payload.topLanguages.filter(Boolean).map(String)
            : [];

        // Normalize range
        const range = payload.range || null;

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

// Sparkline for coding hours, moving averages, and anomaly highlights
const Sparkline = ({ seriesObj }) => {
    const width = 400;
    const height = 64;
    const padding = 8;

    // Memoize series, ma7, ma30 for stable dependencies
    const series = useMemo(() => seriesObj?.series || [], [seriesObj]);
    const ma7 = useMemo(
        () => seriesObj?.movingAverages?.ma7 || [],
        [seriesObj]
    );
    const ma30 = useMemo(
        () => seriesObj?.movingAverages?.ma30 || [],
        [seriesObj]
    );

    // For now, only plot totalHours as main line
    const points = useMemo(() => {
        if (!series.length) return "";
        const max = Math.max(...series.map((d) => d.totalHours), 1);
        const step = (width - padding * 2) / (series.length - 1 || 1);
        return series
            .map((d, i) => {
                const x = padding + i * step;
                const y =
                    height -
                    padding -
                    (d.totalHours / max) * (height - padding * 2);
                return `${x},${y}`;
            })
            .join(" ");
    }, [series]);

    // Moving average lines (ma7, ma30)
    const ma7points = useMemo(() => {
        if (!ma7.length) return "";
        const max = Math.max(...series.map((d) => d.totalHours), 1);
        const step = (width - padding * 2) / (ma7.length - 1 || 1);
        return ma7
            .map((d, i) => {
                const x = padding + i * step;
                const y =
                    height - padding - (d.hours / max) * (height - padding * 2);
                return `${x},${y}`;
            })
            .join(" ");
    }, [ma7, series]);

    const ma30points = useMemo(() => {
        if (!ma30.length) return "";
        const max = Math.max(...series.map((d) => d.totalHours), 1);
        const step = (width - padding * 2) / (ma30.length - 1 || 1);
        return ma30
            .map((d, i) => {
                const x = padding + i * step;
                const y =
                    height - padding - (d.hours / max) * (height - padding * 2);
                return `${x},${y}`;
            })
            .join(" ");
    }, [ma30, series]);

    // Summary stats
    const last = series?.[series.length - 1]?.totalHours || 0;
    const total = series?.reduce((a, b) => a + (b.totalHours || 0), 0) || 0;
    const lastSessions = series?.[series.length - 1]?.sessions || 0;

    return (
        <div>
            <svg
                title="Coding hours trend over the last 30 days"
                width="100%"
                viewBox={`0 0 ${width} ${height}`}
                className="overflow-visible"
            >
                {/* Main line: totalHours */}
                <polyline
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="2"
                    points={points}
                />
                {/* MA7: blue, thinner */}
                {ma7points && (
                    <polyline
                        fill="none"
                        stroke="#60a5fa"
                        strokeWidth="1"
                        points={ma7points}
                        opacity={0.7}
                    />
                )}
                {/* MA30: gray, dashed */}
                {ma30points && (
                    <polyline
                        fill="none"
                        stroke="#a1a1aa"
                        strokeWidth="1"
                        points={ma30points}
                        opacity={0.5}
                        strokeDasharray="4 2"
                    />
                )}
            </svg>
            <div className="text-xs text-zinc-400 mt-1 flex gap-4">
                <span>
                    Last day:{" "}
                    <span className="text-indigo-300">{last.toFixed(2)}h</span>{" "}
                    <span className="text-zinc-400">
                        ({lastSessions} sessions)
                    </span>
                </span>
                <span>
                    Period total:{" "}
                    <span className="text-indigo-300">{total.toFixed(2)}h</span>
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

// Square heatmap that fills its container using a dynamic CSS grid
const Heatmap = ({ series, size = 14 }) => {
    // size x size (e.g., 14x14) latest days, newest at the end (bottom-right visually)
    const byDate = new Map(series.map((d) => [d.date, d.seconds]));
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const totalCells = size * size;
    const cells = new Array(totalCells).fill(null).map((_, idx) => {
        const cell = new Date(today);
        // Oldest at index 0, newest at index totalCells-1
        const daysAgo = totalCells - 1 - idx;
        cell.setUTCDate(today.getUTCDate() - daysAgo);
        const iso = toISODateUTC(cell);
        return { iso, seconds: byDate.get(iso) || 0 };
    });

    const max = Math.max(1, ...cells.map((c) => c.seconds));
    const color = (v) => {
        if (v === 0) return "bg-zinc-800/80";
        const t = v / max; // 0..1
        if (t < 0.25) return "bg-indigo-900";
        if (t < 0.5) return "bg-indigo-700";
        if (t < 0.75) return "bg-indigo-500";
        return "bg-indigo-400";
    };

    return (
        <div className="w-full aspect-square" title="Coding heatmap">
            <div
                className="grid gap-1 w-full h-full"
                style={{
                    gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
                }}
            >
                {cells.map((c) => (
                    <div
                        key={c.iso}
                        className={`aspect-square rounded ${color(c.seconds)}`}
                        title={`${c.iso}: ${secondsToShort(c.seconds)}`}
                    />
                ))}
            </div>
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
                // Heatmap
                setHeatmap(normalizeHeatmap(h));

                // Languages
                const langStats = normalizeLanguages(l);
                setLanguages(
                    Object.entries(langStats.totals)
                        .map(([name, hours]) => ({
                            name,
                            seconds: Number(hours) * 3600,
                        }))
                        .sort((a, b) => b.seconds - a.seconds)
                );

                // Debug log for series
                console.log("UserStats series raw:", s);

                // Trend series
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
                {series30 && series30.series ? (
                    <Sparkline seriesObj={series30} />
                ) : (
                    <div className="text-xs text-zinc-400">No activity yet</div>
                )}
            </div>
        </div>
    );
}
