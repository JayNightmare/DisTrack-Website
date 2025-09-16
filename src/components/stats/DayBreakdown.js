import React from "react";

export default function DayBreakdown({
    date,
    languages = {},
    trendSeries = [],
    daySeconds = null, // optional: seconds from heatmap for this day
}) {
    const entries = Object.entries(languages)
        .map(([name, seconds]) => ({ name, seconds: Number(seconds) || 0 }))
        .sort((a, b) => b.seconds - a.seconds);
    const totalSeconds = entries.reduce((a, b) => a + b.seconds, 0);
    console.log("totalSeconds", totalSeconds);
    const trendDay = (trendSeries || []).find(
        (d) => d.date?.slice(0, 10) === date
    );
    // Prefer exact seconds from heatmap if available, then trend's totalHours, then sum of language seconds
    const heatmapHours = daySeconds != null ? Number(daySeconds) / 3600 : null;
    const totalHours =
        (heatmapHours != null && !Number.isNaN(heatmapHours)
            ? heatmapHours
            : undefined) ??
        trendDay?.totalHours ??
        totalSeconds / 3600;
    const sessions = trendDay?.sessions ?? 0;
    return (
        <div className="rounded border border-zinc-700/50 bg-zinc-900/40 p-3">
            <div className="mb-2 flex items-center justify-between">
                <div className="text-zinc-400">{date}</div>
                <div className="text-zinc-300">
                    Total:{" "}
                    <span className="text-indigo-300">
                        {totalHours.toFixed(2)}h
                    </span>
                    {sessions ? (
                        <span className="text-zinc-500">
                            {" "}
                            • {sessions} sessions
                        </span>
                    ) : null}
                </div>
            </div>
            {entries.length ? (
                <ul className="space-y-1">
                    {entries.map((e) => (
                        <li
                            key={e.name}
                            className="flex justify-between text-zinc-300 text-xs"
                        >
                            <span>{e.name}</span>
                            <span>{(e.seconds / 3600).toFixed(2)}h</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-zinc-500 text-xs">
                    No language data for this day
                </div>
            )}
        </div>
    );
}
