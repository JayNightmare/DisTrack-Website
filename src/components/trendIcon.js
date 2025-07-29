export const getTrendIcon = (trend) => {
    switch (trend) {
        case "up":
            return <span className="text-green-400">↗</span>;
        case "down":
            return <span className="text-red-400">↘</span>;
        case "neutral":
            return <span className="text-gray-500">→</span>;
        default:
            return null;
    }
};
