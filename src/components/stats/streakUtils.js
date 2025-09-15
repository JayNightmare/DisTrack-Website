// Utility functions for computing coding streaks from a heatmap series
// A heatmap series item: { date: 'YYYY-MM-DD', seconds: number }
// Streak logic assumes a 'day is active' if seconds > 0.

// Parse YYYY-MM-DD to UTC midnight Date
const parseISODate = (iso) => {
    const [y, m, d] = iso.split("-").map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d, 0, 0, 0, 0));
    return dt;
};

// Compute current and longest streaks given a sorted (ascending) array of days
export function computeStreaks(series) {
    if (!Array.isArray(series) || !series.length) {
        return { current: 0, longest: 0 };
    }
    // Ensure sorted ascending by date
    const days = [...series]
        .filter((d) => d && d.date)
        .sort((a, b) => (a.date < b.date ? -1 : 1));

    let longest = 0;
    let current = 0;
    let running = 0;

    // We'll track whether the last date seen is contiguous with today for current streak.
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    // Map dates with activity for quick lookup
    const active = new Set(
        days.filter((d) => (d.seconds || 0) > 0).map((d) => d.date)
    );

    // Compute longest by scanning sequentially
    let prev = null;
    for (const d of days) {
        if ((d.seconds || 0) > 0) {
            if (!prev) {
                running = 1;
            } else {
                // Check if consecutive day
                const p = parseISODate(prev);
                const c = parseISODate(d.date);
                const diffDays = Math.round((c - p) / 86400000);
                if (diffDays === 1) {
                    running += 1;
                } else if (diffDays >= 1) {
                    running = 1; // reset streak starting this day
                }
            }
            longest = Math.max(longest, running);
            prev = d.date;
        }
    }

    // Compute current streak by walking backward from today until a gap or zero-activity day
    let cursor = new Date(today);
    while (true) {
        const iso = cursor.toISOString().slice(0, 10);
        if (active.has(iso)) {
            current += 1;
            cursor.setUTCDate(cursor.getUTCDate() - 1);
        } else {
            break;
        }
    }

    return { current, longest };
}

export function mergeStreakOverride(base, override) {
    return {
        current: override?.current ?? base.current,
        longest: override?.longest ?? base.longest,
    };
}
