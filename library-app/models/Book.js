// mongoose shcema
const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    title: String,
    authors: [String],
    thumbnail: String,
    totalCopies: Number,
    availableCopies: Number,
    borrowRecords: [
        {
            Name : String,
            email: String,
            returnDate : Date,
            lentDate: { type: Date, default:Date.now}

        }
    ]
})

module.exports = mongoose.model('Book', bookSchema);
