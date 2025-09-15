import React, { useMemo } from "react";
import { toISODateUTC, secondsToShort } from "./timeUtils";

// Square heatmap that fills its container using a dynamic CSS grid
export default function Heatmap({ series, size = 14 }) {
    const byDate = useMemo(
        () => new Map(series.map((d) => [d.date, d.seconds])),
        [series]
    );
    const today = useMemo(() => {
        const t = new Date();
        t.setUTCHours(0, 0, 0, 0);
        return t;
    }, []);
    const totalCells = size * size;
    const cells = useMemo(() => {
        return new Array(totalCells).fill(null).map((_, idx) => {
            const cell = new Date(today);
            const daysAgo = totalCells - 1 - idx;
            cell.setUTCDate(today.getUTCDate() - daysAgo);
            const iso = toISODateUTC(cell);
            return { iso, seconds: byDate.get(iso) || 0 };
        });
    }, [byDate, totalCells, today]);

    const max = Math.max(1, ...cells.map((c) => c.seconds));
    const color = (v) => {
        if (v === 0) return "bg-zinc-800/80";
        const t = v / max;
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
}
