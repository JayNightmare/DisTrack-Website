/* 

    List of Endpoints for Stats API
    - getGlobalStats
    - getUserFilterStats
    - getUserLanguageStats
    - getUserHeatmapStats

*/

import axios from "axios";

const endpointUrl = process.env.REACT_APP_API_ENDPOINT;
const apiToken = process.env.REACT_APP_API_KEY;

export const getGlobalStats = async () => {
    if (!endpointUrl || !apiToken) {
        console.error(
            "API endpoint or token is not set in environment variables."
        );
        return null;
    }
    try {
        const response = await axios.get(`${endpointUrl}/stats/global`, {
            headers: { Authorization: `Bearer ${apiToken}` },
        });
        return response.data;
    } catch (error) {
        console.error("<< Failed to fetch stats:", error);
        return null;
    }
};

export const getUserFilterStats = async (userId, startDate, endDate) => {
    if (!endpointUrl || !apiToken) {
        console.error(
            "API endpoint or token is not set in environment variables."
        );
        return null;
    }
    try {
        const response = await axios.get(
            `${endpointUrl}/stats/${userId}/filter`,
            {
                headers: { Authorization: `Bearer ${apiToken}` },
                params: { startDate, endDate },
            }
        );
        return response.data;
    } catch (error) {
        console.error(`<< Failed to fetch stats for ID ${userId}:`, error);
        return null;
    }
};

export const getUserLanguageStats = async (userId, startDate, endDate) => {
    if (!endpointUrl || !apiToken) {
        console.error(
            "API endpoint or token is not set in environment variables."
        );
        return null;
    }
    try {
        const response = await axios.get(
            `${endpointUrl}/stats/${userId}/languages`,
            {
                headers: { Authorization: `Bearer ${apiToken}` },
                params: { startDate, endDate },
            }
        );
        return response.data;
    } catch (error) {
        console.error(
            `<< Failed to fetch language stats for ID ${userId}:`,
            error
        );
        return null;
    }
};

// Current Year
const currentYear = new Date().getFullYear();

export const getUserHeatmapStats = async (userId, year = currentYear) => {
    if (!endpointUrl || !apiToken) {
        console.error(
            "API endpoint or token is not set in environment variables."
        );
        return null;
    }
    try {
        const response = await axios.get(
            `${endpointUrl}/stats/${userId}/heatmap`,
            {
                headers: { Authorization: `Bearer ${apiToken}` },
                params: { year },
            }
        );
        return response.data;
    } catch (error) {
        console.error(
            `<< Failed to fetch heatmap stats for ID ${userId}:`,
            error
        );
        return null;
    }
};

// ---- Global/Homepage specific helpers ----

// Returns live counters for homepage hero row
// Expected response (flexible):
// {
//   totalHoursTracked: number | string, // hours
//   usersOnline: number,
//   sessionsToday: number,
//   topLanguageToday: string,
//   avgSessionMinutes: number
// }
export const getGlobalLiveCounters = async () => {
    if (!endpointUrl || !apiToken) {
        console.error(
            "API endpoint or token is not set in environment variables."
        );
        return null;
    }
    try {
        const { data } = await axios.get(`${endpointUrl}/stats/global/live`, {
            headers: { Authorization: `Bearer ${apiToken}` },
        });
        return data;
    } catch (e) {
        console.warn(
            "/stats/global/live not available, falling back to /stats/global",
            e
        );
        try {
            const data = await getGlobalStats();
            return data;
        } catch (err) {
            console.error("<< Failed to fetch global live counters:", err);
            return null;
        }
    }
};

// Returns 7-day rolling trends for homepage mini-cards
// Expected response: { hoursTracked: number[], activeUsers: number[], avgStreak: number[] }
export const getGlobalTrends = async (days = 7) => {
    if (!endpointUrl) return null;
    try {
        const headers = apiToken
            ? { Authorization: `Bearer ${apiToken}` }
            : undefined;
        const { data } = await axios.get(`${endpointUrl}/stats/global/trends`, {
            headers,
            params: { days },
        });
        return data;
    } catch (e) {
        console.error("<< Failed to fetch global trends:", e);
        return null;
    }
};

// Returns 24x7 UTC hour heatmap matrix
// Expected response shape options:
// - { matrix: number[7][24] }
// - Array<{ dayOfWeek: 0-6, hour: 0-23, seconds: number }>
// - { counts: { "d-h": seconds } }
export const getGlobalHourlyHeatmap = async (windowDays = 30) => {
    if (!endpointUrl) return null;
    try {
        const headers = apiToken
            ? { Authorization: `Bearer ${apiToken}` }
            : undefined;
        const { data } = await axios.get(
            `${endpointUrl}/stats/global/heatmap/hourly`,
            {
                headers,
                params: { window: windowDays },
            }
        );
        return data;
    } catch (e) {
        console.error("<< Failed to fetch global hourly heatmap:", e);
        return null;
    }
};

// Returns language totals for last 30 days and previous period for deltas
// Expected: { current: { lang: seconds|hours }, previous: { lang: seconds|hours } }
export const getGlobalLanguageShare = async (days = 30, compare = true) => {
    if (!endpointUrl) return null;
    try {
        const headers = apiToken
            ? { Authorization: `Bearer ${apiToken}` }
            : undefined;
        const { data } = await axios.get(
            `${endpointUrl}/stats/global/languages`,
            {
                headers,
                params: { days, compare },
            }
        );
        return data;
    } catch (e) {
        console.error("<< Failed to fetch global language share:", e);
        return null;
    }
};

// Returns Hall of Flame: fastest growing users by delta hours for the period
// Expected: Array<{ userId, name, avatarUrl?, deltaHours, totalHours }>
export const getFastestGrowingUsers = async (period = "week", limit = 10) => {
    if (!endpointUrl) return [];
    try {
        const headers = apiToken
            ? { Authorization: `Bearer ${apiToken}` }
            : undefined;
        const { data } = await axios.get(`${endpointUrl}/leaderboard/growth`, {
            headers,
            params: { period, limit },
        });
        return Array.isArray(data) ? data : [];
    } catch (e) {
        console.warn(
            "/leaderboard/growth not available; attempting weekly leaderboard fallback",
            e
        );
        try {
            // Fallback to weekly leaderboard (absolute time)
            const headers = apiToken
                ? { Authorization: `Bearer ${apiToken}` }
                : undefined;
            const res = await axios.get(`${endpointUrl}/leaderboard/week`, {
                headers,
            });
            const arr = Array.isArray(res.data) ? res.data : [];
            // Map to growth-like structure without delta
            return arr.slice(0, limit).map((u) => ({
                userId: u.userId || u.id || u.user || u.name,
                name: u.name || u.username || "Unknown",
                avatarUrl: u.avatarUrl || u.avatar || null,
                deltaHours: null,
                totalHours:
                    u.hours ||
                    u.totalHours ||
                    (u.seconds ? u.seconds / 3600 : null),
            }));
        } catch (err) {
            console.error(
                "<< Failed to fetch fastest growing users fallback:",
                err
            );
            return [];
        }
    }
};
