// Data normalization helpers for various stats payload shapes

// NOTE: Most API endpoints return time in HOURS, but components expect seconds
// for heatmap and language charts. Convert incoming hour values to seconds
// consistently. The heatmap endpoint specifically returns seconds per day.

export const normalizeDailySeries = (payload) => {
    if (!payload) return [];
    if (Array.isArray(payload)) {
        return payload
            .map((d) => {
                if (!d) return null;
                const date = d.date || d.day || d.key || d.timestamp;
                const hoursField = d.hours ?? d.totalHours; // preferred
                const secField =
                    d.seconds ?? d.totalSeconds ?? d.duration ?? d.time; // passthrough
                const seconds = Number(
                    hoursField != null
                        ? Number(hoursField) * 3600
                        : secField != null
                        ? Number(secField)
                        : 0
                );
                return date
                    ? { date: String(date).slice(0, 10), seconds }
                    : null;
            })
            .filter(Boolean)
            .sort((a, b) => (a.date < b.date ? -1 : 1));
    }
    if (typeof payload === "object" && payload !== null) {
        // Generic map of date -> hours (convert) or seconds (if already provided)
        return Object.entries(payload)
            .map(([date, value]) => {
                // Assume hours for generic maps
                const seconds = Number(value) * 3600;
                return { date: String(date).slice(0, 10), seconds };
            })
            .sort((a, b) => (a.date < b.date ? -1 : 1));
    }
    return [];
};

export const normalizeHeatmap = (payload) => {
    if (!payload) return [];
    if (Array.isArray(payload)) return normalizeDailySeries(payload);
    // Prefer payload.days which is a date -> seconds map
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
    // Fallback: treat the object as a date -> seconds map
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

    // Structured payload with timeseries and totals
    if (
        typeof payload === "object" &&
        payload !== null &&
        (payload.range ||
            payload.topLanguages ||
            payload.timeseries ||
            payload.totals)
    ) {
        const timeseries = Array.isArray(payload.timeseries)
            ? payload.timeseries.map((ts) => {
                  const date = String(ts.date || ts.day || ts.key || "").slice(
                      0,
                      10
                  );
                  const languages =
                      ts &&
                      typeof ts.languages === "object" &&
                      ts.languages !== null
                          ? Object.fromEntries(
                                Object.entries(ts.languages).map(
                                    ([name, hours]) => [
                                        name,
                                        Number(hours) * 3600 || 0,
                                    ]
                                )
                            )
                          : {};
                  return { date, languages };
              })
            : [];

        const totals =
            typeof payload.totals === "object" && payload.totals !== null
                ? Object.fromEntries(
                      Object.entries(payload.totals).map(([name, hours]) => [
                          name,
                          Number(hours) * 3600 || 0,
                      ])
                  )
                : {};

        const topLanguages = Array.isArray(payload.topLanguages)
            ? payload.topLanguages.filter(Boolean).map(String)
            : [];
        const range = payload.range || null;
        return { range, topLanguages, timeseries, totals };
    }

    // Array payload of language totals
    if (Array.isArray(payload)) {
        const arr = payload
            .map((l) => {
                if (!l) return null;
                const name = l.topLanguage || l.name || l.lang || l.key;
                const hoursVal =
                    l.hours ?? l.totalHours ?? l.time ?? l.duration ?? null;
                const secVal =
                    l.seconds ??
                    l.totalSeconds ??
                    (hoursVal == null ? 0 : null);
                const seconds = Number(
                    hoursVal != null
                        ? Number(hoursVal) * 3600
                        : secVal != null
                        ? Number(secVal)
                        : 0
                );
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

    // Map of language -> hours
    if (
        typeof payload === "object" &&
        payload !== null &&
        !(payload instanceof Date)
    ) {
        const arr = Object.entries(payload)
            .map(([name, hours]) => ({
                name,
                seconds: Number(hours) * 3600 || 0,
            }))
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

// Normalize 24x7 UTC hourly heatmap to a fixed 7x24 matrix of seconds
// Input flexible: { matrix }, array of { dayOfWeek, hour, seconds }, or map { 'd-h': seconds }
export const normalizeHourlyMatrix = (payload) => {
    const matrix = new Array(7).fill(null).map(() => new Array(24).fill(0));
    if (!payload) return matrix;
    if (Array.isArray(payload)) {
        for (const r of payload) {
            if (!r) continue;
            const d = Number(r.dayOfWeek);
            const h = Number(r.hour);
            const s = Number(r.seconds || r.totalSeconds || 0);
            if (d >= 0 && d < 7 && h >= 0 && h < 24) matrix[d][h] += s;
        }
        return matrix;
    }
    if (typeof payload === "object" && payload !== null) {
        if (Array.isArray(payload.matrix)) {
            // trust shape but coerce numbers
            for (let d = 0; d < 7; d++) {
                for (let h = 0; h < 24; h++) {
                    const v = payload.matrix?.[d]?.[h] ?? 0;
                    matrix[d][h] = Number(v) || 0;
                }
            }
            return matrix;
        }
        if (typeof payload.counts === "object" && payload.counts !== null) {
            for (const [key, v] of Object.entries(payload.counts)) {
                const [dStr, hStr] = String(key).split("-");
                const d = Number(dStr);
                const h = Number(hStr);
                if (d >= 0 && d < 7 && h >= 0 && h < 24)
                    matrix[d][h] += Number(v) || 0;
            }
            return matrix;
        }
    }
    return matrix;
};

// Compute language share with deltas between current and previous periods
// Input flexible: { current: { lang: hours|seconds }, previous: { lang: hours|seconds } }
export const computeLanguageShareWithDelta = (payload) => {
    const toSecondsMap = (m) => {
        if (!m || typeof m !== "object") return {};
        return Object.fromEntries(
            Object.entries(m).map(([k, v]) => {
                const n = Number(v);
                // Heuristic: if value > 1000, assume seconds; else assume hours
                const seconds = n > 1000 ? n : n * 3600;
                return [k, seconds || 0];
            })
        );
    };
    const current = toSecondsMap(payload?.current);
    const previous = toSecondsMap(payload?.previous);
    const allLangs = Array.from(
        new Set([...Object.keys(current), ...Object.keys(previous)])
    );
    const currentTotal =
        allLangs.reduce((a, k) => a + (current[k] || 0), 0) || 1;
    const previousTotal =
        allLangs.reduce((a, k) => a + (previous[k] || 0), 0) || 1;
    const items = allLangs
        .map((name) => {
            const cur = current[name] || 0;
            const prev = previous[name] || 0;
            const share = cur / currentTotal;
            const prevShare = prev / previousTotal;
            const deltaPctPoints = (share - prevShare) * 100;
            return {
                name,
                seconds: cur,
                share,
                deltaPctPoints,
            };
        })
        .sort((a, b) => b.seconds - a.seconds);
    return { items, currentTotal, previousTotal };
};
