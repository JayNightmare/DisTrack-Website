import React, { useMemo } from "react";

// matrix: number[7][24] (day rows 0=Sun..6=Sat), columns = 0..23 UTC hours
export default function WorldCodingHeatmap({ matrix }) {
    const flat = useMemo(
        () => (matrix || []).flat().filter((v) => Number.isFinite(v)),
        [matrix]
    );
    const max = flat.length ? Math.max(...flat, 1) : 1;
    const color = (v) => {
        if (!v) return "bg-zinc-800/70";
        const t = v / max;
        if (t < 0.2) return "bg-emerald-900";
        if (t < 0.4) return "bg-emerald-700";
        if (t < 0.6) return "bg-emerald-600";
        if (t < 0.8) return "bg-emerald-500";
        return "bg-emerald-400";
    };
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
        <div className="w-full overflow-x-auto">
            <div className="min-w-[640px]">
                <div className="text-sm font-semibold text-zinc-300 mb-2">
                    Where the world is coding (UTC)
                </div>
                <div
                    className="grid"
                    style={{
                        gridTemplateColumns: `64px repeat(24, minmax(0, 1fr))`,
                    }}
                >
                    <div />
                    {Array.from({ length: 24 }).map((_, h) => (
                        <div
                            key={h}
                            className="text-[10px] text-zinc-500 text-center"
                        >
                            {h}
                        </div>
                    ))}
                    {matrix.map((row, d) => (
                        <React.Fragment key={d}>
                            <div className="text-xs text-zinc-400 pr-2 flex items-center">
                                {days[d]}
                            </div>
                            {row.map((v, h) => (
                                <div
                                    key={`${d}-${h}`}
                                    className={`h-4 m-0.5 rounded ${color(v)}`}
                                    title={`UTC ${days[d]} ${h}:00 — ${(
                                        v / 3600
                                    ).toFixed(1)}h`}
                                />
                            ))}
                        </React.Fragment>
                    ))}
                </div>
                <div className="text-[10px] text-zinc-500 mt-2">
                    UTC hour vs volume (last 30 days)
                </div>
            </div>
        </div>
    );
}
