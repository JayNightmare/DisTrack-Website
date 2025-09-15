import React, { useMemo } from "react";

export default function Sparkline({ trend }) {
    const width = 400;
    const height = 64;
    const padding = 8;
    const series = useMemo(() => trend?.series || [], [trend]);
    const ma7 = useMemo(() => trend?.movingAverages?.ma7 || [], [trend]);
    const ma30 = useMemo(() => trend?.movingAverages?.ma30 || [], [trend]);
    const maxY = useMemo(() => {
        if (!series.length) return 1;
        return Math.max(
            1,
            Math.max(...series.map((d) => d.totalHours || 0)),
            Math.max(0, ...ma7.map((d) => d.hours || 0)),
            Math.max(0, ...ma30.map((d) => d.hours || 0))
        );
    }, [series, ma7, ma30]);
    const mainPoints = useMemo(() => {
        if (!series.length) return "";
        const step = (width - padding * 2) / (series.length - 1 || 1);
        return series
            .map((d, i) => {
                const x = padding + i * step;
                const y =
                    height -
                    padding -
                    ((d.totalHours || 0) / maxY) * (height - padding * 2);
                return `${x},${y}`;
            })
            .join(" ");
    }, [series, maxY]);
    const ma7Points = useMemo(() => {
        if (!ma7.length) return "";
        const step = (width - padding * 2) / (ma7.length - 1 || 1);
        return ma7
            .map((d, i) => {
                const x = padding + i * step;
                const y =
                    height -
                    padding -
                    ((d.hours || 0) / maxY) * (height - padding * 2);
                return `${x},${y}`;
            })
            .join(" ");
    }, [ma7, maxY]);
    const ma30Points = useMemo(() => {
        if (!ma30.length) return "";
        const step = (width - padding * 2) / (ma30.length - 1 || 1);
        return ma30
            .map((d, i) => {
                const x = padding + i * step;
                const y =
                    height -
                    padding -
                    ((d.hours || 0) / maxY) * (height - padding * 2);
                return `${x},${y}`;
            })
            .join(" ");
    }, [ma30, maxY]);
    const lastDay = series[series.length - 1];
    const lastHours = lastDay?.totalHours || 0;
    const lastSessions = lastDay?.sessions || 0;
    const totalHours = series.reduce((acc, d) => acc + (d.totalHours || 0), 0);
    if (!series.length) return null;
    return (
        <div>
            <svg
                width="100%"
                viewBox={`0 0 ${width} ${height}`}
                className="overflow-visible"
                title="Coding hours trend"
            >
                <polyline
                    points={mainPoints}
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="2"
                />
                {ma7Points && (
                    <polyline
                        points={ma7Points}
                        fill="none"
                        stroke="#60a5fa"
                        strokeWidth="1"
                        opacity={0.75}
                    />
                )}
                {ma30Points && (
                    <polyline
                        points={ma30Points}
                        fill="none"
                        stroke="#a1a1aa"
                        strokeWidth="1"
                        opacity={0.55}
                        strokeDasharray="4 2"
                    />
                )}
            </svg>
            <div className="text-xs text-zinc-400 mt-1 flex gap-4">
                <span>
                    Last day:{" "}
                    <span className="text-indigo-300">
                        {lastHours.toFixed(2)}h
                    </span>{" "}
                    <span className="text-zinc-400">
                        ({lastSessions} sessions)
                    </span>
                </span>
                <span>
                    Period total:{" "}
                    <span className="text-indigo-300">
                        {totalHours.toFixed(2)}h
                    </span>
                </span>
            </div>
        </div>
    );
}
