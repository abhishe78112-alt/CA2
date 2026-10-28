require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const bookRoutes = require("./routers/bookRoutes");

const app = express();

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.send("Library Book Management API is good");
});

app.use("/api/books", bookRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});