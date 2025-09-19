import React from "react";
import Sparkline from "./Sparkline";

function Card({ title, value, values }) {
    return (
        <div className="rounded-lg border border-zinc-700/50 bg-zinc-900/50 p-3 flex items-center justify-between">
            <div>
                <div className="text-xs text-zinc-400">{title}</div>
                <div className="text-lg font-semibold text-zinc-100">
                    {value}
                </div>
            </div>
            <div className="opacity-80">
                <Sparkline values={values} />
            </div>
        </div>
    );
}

export default function TrendMiniCards({
    hoursTracked = [],
    activeUsers = [],
    avgStreak = [],
}) {
    const fmt = new Intl.NumberFormat();
    const last = (arr) => (arr && arr.length ? arr[arr.length - 1] : 0);
    const hoursStr = `${fmt.format(Math.round(last(hoursTracked)))}h`;
    const usersStr = fmt.format(Math.round(last(activeUsers)));
    const streakStr = `${Math.round(last(avgStreak))} days`;
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-5xl">
            <Card title="Hours (7d)" value={hoursStr} values={hoursTracked} />
            <Card
                title="Active users (7d)"
                value={usersStr}
                values={activeUsers}
            />
            <Card
                title="Avg streak (7d)"
                value={streakStr}
                values={avgStreak}
            />
        </div>
    );
}
