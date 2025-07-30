export const getTrendIcon = (trend) => {
    switch (trend) {
        case "up":
            return { icon: "↗", color: "text-green-400" };
        case "down":
            return { icon: "↘", color: "text-red-400" };
        case "neutral":
        case "same":
            return { icon: "→", color: "text-gray-500" };
        case "new":
            return { icon: "★", color: "text-blue-400" };
        default:
            return { icon: "→", color: "text-gray-500" };
    }
};
