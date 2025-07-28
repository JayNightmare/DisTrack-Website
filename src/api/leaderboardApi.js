import axios from "axios";
// require("dotenv").config();

const endpointUrl = process.env.API_ENDPOINT || "http://localhost:3000";
const apiToken = process.env.API_KEY;

export async function getLeaderboard() {
    try {
        const response = await axios.get(`${endpointUrl}/leaderboard`, {
            headers: { Authorization: `${apiToken}` },
        });
        return response.data;
    } catch (error) {
        console.error("<< Failed to fetch leaderboard:", error);
        return [];
    }
}
