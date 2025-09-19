import React, { useMemo } from "react";

function arcPath(cx, cy, r, startAngle, endAngle) {
    const toXY = (a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    const [sx, sy] = toXY(startAngle);
    const [ex, ey] = toXY(endAngle);
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
    return `M ${sx} ${sy} A ${r} ${r} 0 ${largeArc} 1 ${ex} ${ey}`;
}

const palette = [
    "#818cf8", // indigo-400
    "#34d399", // emerald-400
    "#f472b6", // pink-400
    "#f59e0b", // amber-500
    "#60a5fa", // blue-400
    "#a78bfa", // violet-400
    "#f87171", // red-400
    "#22d3ee", // cyan-400
];

export default function LanguageShareDonut({
    items = [],
    size = 220,
    thickness = 18,
}) {
    const total = items.reduce((a, b) => a + (b.seconds || 0), 0) || 1;
    const arcs = useMemo(() => {
        let angle = -Math.PI / 2; // start at top
        return items.map((it, idx) => {
            const share = (it.seconds || 0) / total;
            const start = angle;
            const end = angle + share * Math.PI * 2;
            angle = end;
            return {
                ...it,
                start,
                end,
                color: palette[idx % palette.length],
                share,
            };
        });
    }, [items, total]);

    const cx = size / 2;
    const cy = size / 2;
    const rOuter = size / 2 - 4;
    const rInner = rOuter - thickness;

    return (
        <div className="flex gap-4 items-center">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <circle cx={cx} cy={cy} r={rOuter} fill="#18181b" />
                {arcs.map((a, i) => (
                    <g key={a.name + i}>
                        <path
                            d={arcPath(
                                cx,
                                cy,
                                (rOuter + rInner) / 2,
                                a.start,
                                a.end
                            )}
                            stroke={a.color}
                            strokeWidth={thickness}
                            fill="none"
                        />
                    </g>
                ))}
                <circle cx={cx} cy={cy} r={rInner} fill="#09090b" />
            </svg>
            <div className="space-y-2">
                {items.slice(0, 8).map((it, i) => {
                    const pct = (it.share || 0) * 100;
                    const delta = it.deltaPctPoints || 0;
                    const up = delta > 0.0001;
                    const down = delta < -0.0001;
                    return (
                        <div
                            key={it.name}
                            className="flex items-center gap-2 text-sm"
                        >
                            <span
                                className="inline-block w-3 h-3 rounded"
                                style={{
                                    background: palette[i % palette.length],
                                }}
                            />
                            <span className="text-zinc-200">{it.name}</span>
                            <span className="text-zinc-400">
                                {pct.toFixed(1)}%
                            </span>
                            {up ? (
                                <span className="text-emerald-400 text-xs">
                                    ▲ {delta.toFixed(1)}pp
                                </span>
                            ) : down ? (
                                <span className="text-rose-400 text-xs">
                                    ▼ {Math.abs(delta).toFixed(1)}pp
                                </span>
                            ) : (
                                <span className="text-zinc-500 text-xs">•</span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
