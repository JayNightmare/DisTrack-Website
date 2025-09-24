import axios from "axios";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const API_KEY = process.env.REACT_APP_API_KEY;

export const generateDiscordAuthUrl = () => {
    // Since your backend handles the entire OAuth flow,
    // redirect directly to your backend's Discord OAuth initiation endpoint
    return `${API_ENDPOINT}/auth/discord`;
};

// NOTE: The following functions are kept for potential future use with the DiscordCallback component
// but are not needed for the new token-based flow

// export const handleDiscordCallback = async (code, state) => {
//     // This function is no longer used with the new backend flow
//     // Your backend now handles the OAuth callback and redirects to /dashboard with token and user data
// };

export const checkUserExists = async (discordUserId) => {
    try {
        const response = await axios.get(
            `${API_ENDPOINT}/auth/discord/user/${discordUserId}`,
            {
                headers: { Authorization: `Bearer ${API_KEY}` },
            }
        );
        return { exists: true, user: response.data };
    } catch (error) {
        if (error.response?.status === 404) {
            return { exists: false };
        }
        throw error;
    }
};

export const createUser = async (discordUser, displayName, timezone = null) => {
    try {
        const response = await axios.post(
            `${API_ENDPOINT}/auth/discord/user`,
            {
                discordId: discordUser.id,
                username: discordUser.username,
                displayName: displayName,
                avatarUrl: discordUser.avatar
                    ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`
                    : null,
                email: discordUser.email,
                timezone:
                    timezone ||
                    Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
            {
                headers: { Authorization: `Bearer ${API_KEY}` },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Create user error:", error);
        throw error;
    }
};
