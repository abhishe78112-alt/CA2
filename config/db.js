const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connect");
    } catch (error) {
        console.log(" connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;