import React, { useMemo } from "react";

// Build an SVG arc path between two angles
function arcPath(cx, cy, r, startAngle, endAngle) {
    const toXY = (a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    const [sx, sy] = toXY(startAngle);
    const [ex, ey] = toXY(endAngle);
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
    return `M ${sx} ${sy} A ${r} ${r} 0 ${largeArc} 1 ${ex} ${ey}`;
}

const palette = [
    {
        name: "javaScript",
        color: "#f7df1e", // yellow
    },
    {
        name: "python",
        color: "#3572A5", // blue
    },
    {
        name: "java",
        color: "#b07219", // brown
    },
    {
        name: "typeScript",
        color: "#3178c6", // blue
    },
    {
        name: "cpp",
        color: "#f34b7d", // pink
    },
    {
        name: "csharp",
        color: "#178600", // green
    },
    {
        name: "ruby",
        color: "#701516", // dark red
    },
    {
        name: "go",
        color: "#00ADD8", // cyan
    },
    {
        name: "php",
        color: "#4F5D95", // purple
    },
    {
        name: "c",
        color: "#555555", // gray
    },
    {
        name: "shell",
        color: "#89e051", // light green
    },
    {
        name: "swift",
        color: "#ffac45", // orange
    },
    {
        name: "kotlin",
        color: "#A97BFF", // purple
    },
    {
        name: "rust",
        color: "#dea584", // light brown
    },
    {
        name: "dart",
        color: "#00B4AB", // teal
    },
    {
        name: "scala",
        color: "#c22d40", // red
    },
    {
        name: "lua",
        color: "#000080", // navy
    },
    {
        name: "html",
        color: "#e34c26", // orange
    },
    {
        name: "css",
        color: "#563d7c", // purple
    },
    {
        name: "json",
        color: "#292929", // dark gray
    },
    {
        name: "markdown",
        color: "#083fa1", // blue
    },
    {
        name: "properties",
        color: "#6d8086", // gray
    },
    {
        name: "other",
        color: "#6e6e6e", // medium gray
    },
];

// Normalize language names to canonical keys for color lookup
function normalizeLang(name) {
    let key = String(name || "")
        .toLowerCase()
        .trim();
    // Common aliases
    if (key === "c++" || key === "cpp") key = "cpp";
    if (key === "c#" || key === "csharp") key = "csharp";
    if (key === "js" || key === "java script" || key === "javascript")
        key = "javascript";
    if (key === "ts" || key === "type script" || key === "typescript")
        key = "typescript";
    if (key === "golang") key = "go";
    if (key === "bash" || key === "zsh" || key === "sh") key = "shell";
    if (key === "html5") key = "html";
    if (key === "css3") key = "css";
    if (key === "md") key = "markdown";
    return key;
}

// Build a map of normalized language name -> color
const NAMED_COLORS = Object.fromEntries(
    palette.map((p) => [normalizeLang(p.name), p.color])
);
const FALLBACK_COLORS = palette.map((p) => p.color);
const colorByLang = (name, idx) =>
    NAMED_COLORS[normalizeLang(name)] ||
    FALLBACK_COLORS[idx % FALLBACK_COLORS.length];

export default function LanguageShareDonut({
    items = [],
    size = 220,
    thickness = 18,
}) {
    const total = items.reduce((a, b) => a + (b.seconds || 0), 0) || 0;

    const arcs = useMemo(() => {
        let angle = -Math.PI / 2; // start at top
        return items.map((it, idx) => {
            const share = total > 0 ? (it.seconds || 0) / total : 0;
            const start = angle;
            const end = angle + share * Math.PI * 2;
            angle = end;
            return {
                ...it,
                start,
                end,
                color: colorByLang(it.name, idx),
                share,
            };
        });
    }, [items, total]);

    const cx = size / 2;
    const cy = size / 2;
    const rOuter = size / 2 - 4;
    const rInner = rOuter - thickness;

    if (!items.length || total <= 0) {
        return (
            <div className="flex items-center justify-center h-64 text-sm text-zinc-500">
                No language data for the selected period
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
            <div className="text-sm font-semibold text-zinc-200">
                Language share (top {items.length})
            </div>
            <div className="flex w-full md:w-auto flex-col md:flex-row items-center gap-4 md:gap-6">
                <svg
                    width="100%"
                    height="auto"
                    viewBox={`0 0 ${size} ${size}`}
                    className="max-w-[260px] md:max-w-[220px]"
                    preserveAspectRatio="xMidYMid meet"
                >
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
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    {items.slice(0, 8).map((it, i) => {
                        const pct =
                            (it.share || (it.seconds || 0) / total) * 100;
                        const delta = it.deltaPctPoints || 0;
                        const up = delta > 0.0001;
                        const down = delta < -0.0001;
                        return (
                            <div
                                key={it.name}
                                className="flex items-center gap-2"
                            >
                                <span
                                    className="inline-block w-3 h-3 rounded"
                                    style={{
                                        background: colorByLang(it.name, i),
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
                                    <span className="text-zinc-500 text-xs">
                                        •
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
