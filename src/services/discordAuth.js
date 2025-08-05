import axios from "axios";

const DISCORD_CLIENT_ID = process.env.REACT_APP_DISCORD_CLIENT_ID;
const DISCORD_REDIRECT_URI = process.env.REACT_APP_DISCORD_REDIRECT_URI;
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const API_KEY = process.env.REACT_APP_API_KEY;
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;

const generateRandomState = () => {
    return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
    );
};

export const generateDiscordAuthUrl = () => {
    const scope = "identify";
    const state = generateRandomState();

    // Store state in sessionStorage for verification
    sessionStorage.setItem("discord_auth_state", state);

    const params = new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        redirect_uri: DISCORD_REDIRECT_URI,
        response_type: "code",
        scope: scope,
        state: state,
    });

    return `https://discord.com/api/oauth2/authorize?${params.toString()}`;
};

export const handleDiscordCallback = async (code, state) => {
    try {
        // Verify state parameter
        const storedState = sessionStorage.getItem("discord_auth_state");
        if (state !== storedState) {
            throw new Error("Invalid state parameter");
        }

        // Clear stored state
        sessionStorage.removeItem("discord_auth_state");

        // Exchange code for access token via our backend
        const response = await axios.post(
            `${API_ENDPOINT}/auth/discord/callback`,
            {
                code,
                redirect_uri: DISCORD_REDIRECT_URI,
            },
            {
                headers: { Authorization: `Bearer ${JWT_SECRET}` },
            }
        );

        const { access_token, user } = response.data;

        if (!access_token || !user) {
            throw new Error("Invalid response from Discord auth");
        }

        return { success: true, user, access_token };
    } catch (error) {
        console.error("Discord auth error:", error);
        return {
            success: false,
            error: error.response?.data?.message || error.message,
        };
    }
};

export const checkUserExists = async (discordUserId) => {
    try {
        const response = await axios.get(
            `${API_ENDPOINT}/user/discord/${discordUserId}`,
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

export const createUser = async (discordUser, displayName) => {
    try {
        const response = await axios.post(
            `${API_ENDPOINT}/user/create`,
            {
                discordId: discordUser.id,
                username: discordUser.username,
                displayName: displayName,
                avatarUrl: discordUser.avatar
                    ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`
                    : null,
                email: discordUser.email,
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

export const updateUserDisplayName = async (userId, displayName) => {
    try {
        const response = await axios.put(
            `${API_ENDPOINT}/user/${userId}`,
            {
                displayName: displayName,
            },
            {
                headers: { Authorization: `Bearer ${API_KEY}` },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Update display name error:", error);
        throw error;
    }
};
