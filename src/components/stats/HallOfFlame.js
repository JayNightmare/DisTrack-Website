import React from "react";

export default function HallOfFlame({ users = [] }) {
    const fmt = new Intl.NumberFormat();
    return (
        <div className="rounded-lg border border-zinc-700/50 bg-zinc-900/50 p-4">
            <div className="text-sm font-semibold text-zinc-200 mb-3">
                Hall of Flame · Fastest growing (7d)
            </div>
            <ul className="divide-y divide-zinc-800">
                {users.slice(0, 10).map((u, i) => (
                    <li
                        key={(u.userId || u.name || i) + "-hof"}
                        className="py-2 flex items-center gap-3"
                    >
                        {u.avatarUrl ? (
                            <img
                                src={u.avatarUrl}
                                alt={u.name}
                                className="w-8 h-8 rounded-full"
                            />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs text-zinc-400">
                                {String(u.name || "?")
                                    .slice(0, 2)
                                    .toUpperCase()}
                            </div>
                        )}
                        <div className="flex-1">
                            <div className="text-zinc-200 text-sm">
                                {u.name || "Unknown"}
                            </div>
                            <div className="text-zinc-500 text-xs">
                                Total:{" "}
                                {u.totalHours != null
                                    ? `${fmt.format(Math.round(u.totalHours))}h`
                                    : "—"}
                            </div>
                        </div>
                        <div className="text-right">
                            {u.deltaHours != null ? (
                                <span className="text-emerald-400 text-sm font-semibold">
                                    +{fmt.format(Math.round(u.deltaHours))}h
                                </span>
                            ) : (
                                <span className="text-zinc-500 text-sm">—</span>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
