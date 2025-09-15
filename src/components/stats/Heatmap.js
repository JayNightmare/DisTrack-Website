import React, { useMemo } from "react";
import { toISODateUTC, secondsToShort } from "./timeUtils";

// Square heatmap that fills its container using a dynamic CSS grid
export default function Heatmap({ series, size = 14, onSelect, selectedDate }) {
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
    const formatHM = (s) => secondsToShort(s);

    return (
        <div className="w-full aspect-square">
            <div
                className="grid gap-1 w-full h-full overflow-visible"
                style={{
                    gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
                }}
            >
                {cells.map((c) => {
                    const label = formatHM(c.seconds);
                    return (
                        <div key={c.iso} className="relative group">
                            <div
                                role={onSelect ? "button" : undefined}
                                tabIndex={onSelect ? 0 : -1}
                                onClick={
                                    onSelect ? () => onSelect(c.iso) : undefined
                                }
                                onKeyDown={
                                    onSelect
                                        ? (e) => {
                                              if (
                                                  e.key === "Enter" ||
                                                  e.key === " "
                                              ) {
                                                  e.preventDefault();
                                                  onSelect(c.iso);
                                              }
                                          }
                                        : undefined
                                }
                                className={`aspect-square rounded outline-none ${color(
                                    c.seconds
                                )} ${
                                    selectedDate === c.iso
                                        ? "ring-2 ring-indigo-400 ring-offset-1 ring-offset-zinc-900"
                                        : ""
                                }`}
                                aria-label={`${c.iso}: ${label}`}
                            />
                            <div className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded px-1.5 py-0.5 text-[10px] bg-zinc-900/90 text-zinc-100 border border-zinc-700/50 opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                                {c.iso}: {label}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
