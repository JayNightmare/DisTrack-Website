// Shared time/date helper utilities for stats components

export const toISODate = (d) => {
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

export const toISODateUTC = (d) => {
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(
        d.getUTCDate()
    )}`;
};

export const lastNDaysRange = (n) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - (n - 1));
    return { startDate: toISODate(start), endDate: toISODate(end) };
};

export const secondsToShort = (s) => {
    if (!s || s <= 0) return "0m";
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
};
