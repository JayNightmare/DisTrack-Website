const mongoose = require("mongoose");
const User = require("./User.js"); // Import the User model

// Database connection function
async function connectToDatabase() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
}

// Main handler for the /link endpoint
module.exports = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { userId } = req.body;

    try {
        await connectToDatabase();

        let user = await User.findOne({ userId });
        if (!user) {
            user = new User({ userId });
            await user.save();
        }

        res.status(200).json({ message: "User linked successfully" });
        console.log(`User ${userId} linked successfully.`);
    } catch (error) {
        console.error("Error linking user:", error);
        res.status(500).json({ message: "Error linking user" });
    }
};
