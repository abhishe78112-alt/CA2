const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;