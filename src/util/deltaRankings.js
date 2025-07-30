export const calculateDeltaRankings = (
    currentLeaderboard,
    previousLeaderboard = null
) => {
    if (!previousLeaderboard) {
        // If no previous data, return current data with neutral trends
        return currentLeaderboard.map((user, index) => ({
            ...user,
            currentRank: index + 1,
            previousRank: null,
            delta: 0,
            trend: "neutral",
        }));
    }

    // Create a map of previous rankings for quick lookup
    const previousRankMap = new Map();
    previousLeaderboard.forEach((user, index) => {
        previousRankMap.set(user.username || user.id, index + 1);
    });

    return currentLeaderboard.map((user, index) => {
        const currentRank = index + 1;
        const previousRank = previousRankMap.get(user.username || user.id);

        let delta = 0;
        let trend = "neutral";

        if (previousRank) {
            delta = previousRank - currentRank; // Positive means moved up, negative means moved down
            if (delta > 0) {
                trend = "up";
            } else if (delta < 0) {
                trend = "down";
            } else {
                trend = "same";
            }
        } else {
            // New user, no previous ranking
            trend = "new";
            delta = 0;
        }

        return {
            ...user,
            currentRank,
            previousRank,
            delta,
            trend,
        };
    });
};
