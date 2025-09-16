import React from "react";
import { secondsToShort } from "./timeUtils";

export default function DayBreakdown({
    date,
    languages = {},
    trendSeries = [],
    daySeconds = null, // optional: seconds from heatmap for this day
    debug = true, // when true, render debug info and log to console
}) {
    const entries = Object.entries(languages)
        .map(([name, seconds]) => ({ name, seconds: Number(seconds) || 0 }))
        .sort((a, b) => b.seconds - a.seconds);
    const totalSeconds = entries.reduce((a, b) => a + b.seconds, 0);
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

    // Compose debug info
    const debugInfo = {
        date,
        daySeconds,
        heatmapHours,
        trendDayTotalHours: trendDay?.totalHours ?? null,
        summedLanguageHours: totalSeconds / 3600,
        computedTotalHours: totalHours,
        sessions,
        languages: Object.fromEntries(entries.map((e) => [e.name, e.seconds])),
    };

    if (debug) {
        // eslint-disable-next-line no-console
        console.debug("DayBreakdown debug:", debugInfo);
    }
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
                            <span>{secondsToShort(e.seconds)}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-zinc-500 text-xs">
                    No language data for this day
                </div>
            )}
            {debug ? (
                <div className="mt-3 rounded border border-zinc-700/50 bg-zinc-900/30 p-2 text-[10px] text-zinc-400 font-mono overflow-auto max-h-48">
                    <div className="mb-1 text-zinc-500">Debug</div>
                    <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
                </div>
            ) : null}
        </div>
    );
}
