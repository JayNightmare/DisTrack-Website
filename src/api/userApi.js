import axios from "axios";

const endpointUrl = process.env.REACT_APP_API_ENDPOINT;
const apiToken = process.env.REACT_APP_API_KEY;

export async function getUserProfile(userId) {
    if (!endpointUrl || !apiToken) {
        console.error(
            "API endpoint or token is not set in environment variables."
        );
        return null;
    }
    try {
        const response = await axios.get(
            `${endpointUrl}/user-profile/${userId}`,
            {
                headers: { Authorization: `Bearer ${apiToken}` },
            }
        );
        return response.data;
    } catch (error) {
        console.error(
            `<< Failed to fetch user profile for ID ${userId}:`,
            error
        );
        return null;
    }
}

export async function updateUserProfile(userId, userData) {
    if (!endpointUrl || !apiToken) {
        console.error(
            "API endpoint or token is not set in environment variables."
        );
        return null;
    }
    try {
        const response = await axios.put(
            `${endpointUrl}/user-profile/${userId}`,
            userData,
            {
                headers: { Authorization: `Bearer ${apiToken}` },
            }
        );
        return response.data;
    } catch (error) {
        console.error(
            `<< Failed to update user profile for ID ${userId}:`,
            error
        );
        return null;
    }
}

// Generate a new link code (alphanumeric) via backend; backend should return { linkCode, expiresAt, cooldownSeconds }
export async function generateLinkCode(userId) {
    if (!endpointUrl || !apiToken) {
        console.error(
            "API endpoint or token is not set in environment variables."
        );
        return null;
    }
    try {
        const response = await axios.post(
            `${endpointUrl}/user/link-code/${userId}`,
            {},
            { headers: { Authorization: `Bearer ${apiToken}` } }
        );
        return response.data; // Expecting { linkCode, expiresAt, cooldownSeconds }
    } catch (error) {
        console.error("<< Failed to generate link code:", error);
        return null;
    }
}

// Clear existing link code
export async function clearLinkCode(userId) {
    if (!endpointUrl || !apiToken) {
        console.error(
            "API endpoint or token is not set in environment variables."
        );
        return null;
    }
    try {
        const response = await axios.delete(
            `${endpointUrl}/user/link-code/${userId}`,
            {
                headers: { Authorization: `Bearer ${apiToken}` },
            }
        );
        return response.data; // Expecting success flag
    } catch (error) {
        console.error("<< Failed to clear link code:", error);
        return null;
    }
}

// Search for users by display name or username
export async function searchUsers(query, limit = 10) {
    if (!endpointUrl || !apiToken) {
        console.error(
            "API endpoint or token is not set in environment variables."
        );
        return null;
    }
    try {
        const response = await axios.get(`${endpointUrl}/users/search`, {
            params: { q: query, limit },
            headers: { Authorization: `Bearer ${apiToken}` },
        });
        // Backend returns { users: [...] }, so we extract the users array
        return response.data.users || [];
    } catch (error) {
        console.error(`<< Failed to search users:`, error);
        return [];
    }
}
