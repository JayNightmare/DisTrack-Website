import React from "react";
import { secondsToShort } from "./timeUtils";

// Simple horizontal bar visualization for language usage
export default function LanguageBars({ items, maxItems = 10 }) {
    if (!Array.isArray(items) || !items.length) return null;
    const total = items.reduce((a, b) => a + (b.seconds || 0), 0) || 1;
    return (
        <div className="space-y-2">
            {items.slice(0, maxItems).map((l) => {
                const seconds = l.seconds || 0;
                const pct = Math.round((seconds / total) * 100);
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
                                title={`${l.name}: ${secondsToShort(seconds)}`}
                            />
                        </div>
                        <div className="text-xs text-zinc-400">
                            Time Spent: {secondsToShort(seconds)}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
