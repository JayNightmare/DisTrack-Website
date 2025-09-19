import React from "react";

function Stat({ label, value, sub }) {
    return (
        <div className="flex flex-col items-center px-3 py-2">
            <div className="text-2xl sm:text-3xl font-bold text-white">
                {value}
            </div>
            <div className="text-xs sm:text-sm text-zinc-400">{label}</div>
            {sub ? (
                <div className="text-[10px] text-zinc-500 mt-0.5">{sub}</div>
            ) : null}
        </div>
    );
}

export default function LiveCounterRow({
    totalHours = 0,
    usersOnline = 0,
    sessionsToday = 0,
    topLanguageToday = "—",
    avgSessionMinutes = 0,
}) {
    const fmt = new Intl.NumberFormat();
    const hourStr = `${fmt.format(Math.round(totalHours))}h`;
    const usersStr = fmt.format(usersOnline);
    const sessionsStr = fmt.format(sessionsToday);
    const avgStr = `${Math.round(avgSessionMinutes)}m`;

    return (
        <div className="w-full max-w-5xl grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
            <Stat label="Total hours tracked" value={hourStr} />
            <Stat label="Users online" value={usersStr} />
            <Stat label="Sessions today" value={sessionsStr} />
            <Stat
                label="Top language (today)"
                value={topLanguageToday || "—"}
            />
            <Stat label="Avg session length" value={avgStr} />
        </div>
    );
}
