import React, { useMemo } from "react";

// Minimal inline SVG sparkline
export default function Sparkline({
    values = [],
    width = 120,
    height = 32,
    stroke = "#818cf8",
}) {
    const path = useMemo(() => {
        const n = values.length;
        if (!n) return "";
        const max = Math.max(...values, 1);
        const min = Math.min(...values, 0);
        const range = max - min || 1;
        const step = width / (n - 1 || 1);
        const points = values.map((v, i) => {
            const x = i * step;
            const norm = (v - min) / range;
            const y = height - norm * height;
            return `${x},${y}`;
        });
        return `M ${points.join(" L ")}`;
    }, [values, width, height]);

    if (!values.length) return null;
    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            className="overflow-visible"
        >
            <path
                d={path}
                fill="none"
                stroke={stroke}
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}
