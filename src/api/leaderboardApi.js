import axios from "axios";

const endpointUrl = process.env.REACT_APP_API_ENDPOINT;
const apiToken = process.env.REACT_APP_API_KEY;

export async function getLeaderboard() {
    if (!endpointUrl || !apiToken) {
        console.error(
            "API endpoint or token is not set in environment variables."
        );
        console.log(`API Endpoint: ${endpointUrl}`);
        console.log(`API Token: ${apiToken}`);
        return [];
    }
    try {
        const response = await axios.get(
            `${endpointUrl}/leaderboard` /* {
            headers: { Authorization: `${apiToken}` },
        } */
        );
        return response.data;
    } catch (error) {
        console.error("<< Failed to fetch leaderboard:", error);
        return [];
    }
}

export async function getLeaderboardByFilter(filter) {
    if (!endpointUrl || !apiToken) {
        console.error(
            "API endpoint or token is not set in environment variables."
        );
        return [];
    }
    try {
        const response = await axios.get(
            `${endpointUrl}/leaderboard/${filter}` /* {
            headers: { Authorization: `${apiToken}` },
        } */
        );
        return response.data;
    } catch (error) {
        console.error(
            `<< Failed to fetch leaderboard for filter ${filter}:`,
            error
        );
        return [];
    }
}
