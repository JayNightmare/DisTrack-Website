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
