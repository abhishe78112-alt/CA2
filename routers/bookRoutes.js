const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// Add a new book
router.post("/", async (req, res) => {
    try {
        const { title, author, category } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const book = new Book({
            title,
            author,
            category
        });

        const savedBook = await book.save();

        res.status(201).json({
            success: true,
            message: "Book added successfully",
            book: savedBook
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get books with pagination
router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;

        const santPage = page > 1 ? page : 1;
        const santLimit = limit > 0 ? limit : 10;

        const skip = (santPage - 1) * santLimit;

        const [books, totalBooks] = await Promise.all([
            Book.find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(santLimit),

            Book.countDocuments()
        ]);

        const totalPages = Math.ceil(totalBooks / santLimit);

        res.status(200).json({
            success: true,
            metadata: {
                totalBooks,
                totalPages,
                currentPage: santPage,
                limit: santLimit
            },
            books
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Update book availability
router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { availability } = req.body;

        if (typeof availability !== "boolean") {
            return res.status(400).json({
                message: "Availability must be true or false"
            });
        }

        const book = await Book.findByIdAndUpdate(
            id,
            { availability },
            { new: true, runValidators: true }
        );

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Book availability updated",
            book
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;