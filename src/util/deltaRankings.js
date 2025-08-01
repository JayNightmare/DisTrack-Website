/*
Object Returned from the Leaderboard API 
{
  "userId": "373097473553727488",
  "username": "jaynightmare",
  "rank": 1,
  "totalTime": 6976616.682999989,
  "rankDelta": 0,
  "previousRank": 1
}
*/

export const calculateDeltaRankings = (currentLeaderboard) => {
    return currentLeaderboard.map((user) => {
        let trend = "neutral";

        // Check the trend based on the existing rankDelta from API
        if (user.rankDelta > 0) {
            trend = "up";
        } else if (user.rankDelta < 0) {
            trend = "down";
        } else if (user.rankDelta === 0 && user.previousRank !== null) {
            trend = "same";
        } else if (user.previousRank === null) {
            trend = "new";
        }

        return {
            ...user,
            trend,
        };
    });
};
