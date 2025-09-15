// Data normalization helpers for various stats payload shapes

export const normalizeDailySeries = (payload) => {
    if (!payload) return [];
    if (Array.isArray(payload)) {
        return payload
            .map((d) => {
                const date = d.date || d.day || d.key || d.timestamp;
                const seconds =
                    d.seconds ?? d.totalSeconds ?? d.duration ?? d.time ?? 0;
                return date
                    ? { date: String(date).slice(0, 10), seconds }
                    : null;
            })
            .filter(Boolean)
            .sort((a, b) => (a.date < b.date ? -1 : 1));
    }
    if (typeof payload === "object") {
        return Object.entries(payload)
            .map(([date, seconds]) => ({
                date: String(date).slice(0, 10),
                seconds,
            }))
            .sort((a, b) => (a.date < b.date ? -1 : 1));
    }
    return [];
};

export const normalizeHeatmap = (payload) => {
    if (!payload) return [];
    if (Array.isArray(payload)) return normalizeDailySeries(payload);
    if (
        typeof payload === "object" &&
        payload !== null &&
        typeof payload.days === "object" &&
        payload.days !== null
    ) {
        return Object.entries(payload.days)
            .map(([date, seconds]) => ({
                date: String(date).slice(0, 10),
                seconds: Number(seconds) || 0,
            }))
            .sort((a, b) => (a.date < b.date ? -1 : 1));
    }
    if (typeof payload === "object" && payload !== null) {
        return Object.entries(payload)
            .map(([date, seconds]) => ({
                date: String(date).slice(0, 10),
                seconds: Number(seconds) || 0,
            }))
            .sort((a, b) => (a.date < b.date ? -1 : 1));
    }
    return [];
};

export const normalizeLanguages = (payload) => {
    if (!payload)
        return { range: null, topLanguages: [], timeseries: [], totals: {} };
    if (
        typeof payload === "object" &&
        payload !== null &&
        (payload.range ||
            payload.topLanguages ||
            payload.timeseries ||
            payload.totals)
    ) {
        const timeseries = Array.isArray(payload.timeseries)
            ? payload.timeseries.map((ts) => ({
                  date: ts.date || ts.day || ts.key || ts.timestamp,
                  languages:
                      typeof ts.languages === "object" && ts.languages !== null
                          ? Object.fromEntries(
                                Object.entries(ts.languages).map(
                                    ([name, seconds]) => [
                                        name,
                                        Number(seconds) || 0,
                                    ]
                                )
                            )
                          : {},
              }))
            : [];
        const totals =
            typeof payload.totals === "object" && payload.totals !== null
                ? Object.fromEntries(
                      Object.entries(payload.totals).map(([name, seconds]) => [
                          name,
                          Number(seconds) || 0,
                      ])
                  )
                : {};
        const topLanguages = Array.isArray(payload.topLanguages)
            ? payload.topLanguages.filter(Boolean).map(String)
            : [];
        const range = payload.range || null;
        return { range, topLanguages, timeseries, totals };
    }
    if (Array.isArray(payload)) {
        const arr = payload
            .map((l) => {
                if (!l) return null;
                const name = l.topLanguage || l.name || l.lang || l.key;
                let seconds =
                    l.seconds ?? l.totalSeconds ?? l.duration ?? l.time ?? 0;
                seconds = Number(seconds) || 0;
                return name ? { name, seconds } : null;
            })
            .filter(Boolean)
            .sort((a, b) => b.seconds - a.seconds);
        return {
            range: null,
            topLanguages: arr.map((l) => l.name),
            timeseries: [],
            totals: Object.fromEntries(arr.map((l) => [l.name, l.seconds])),
        };
    }
    if (
        typeof payload === "object" &&
        payload !== null &&
        !(payload instanceof Date)
    ) {
        const arr = Object.entries(payload)
            .map(([name, seconds]) => ({ name, seconds: Number(seconds) || 0 }))
            .sort((a, b) => b.seconds - a.seconds);
        return {
            range: null,
            topLanguages: arr.map((l) => l.name),
            timeseries: [],
            totals: Object.fromEntries(arr.map((l) => [l.name, l.seconds])),
        };
    }
    return { range: null, topLanguages: [], timeseries: [], totals: {} };
};
