const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true,
        trim: true
    },
    authorName: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true});

module.exports = mongoose.model('allBooks', bookSchema) 