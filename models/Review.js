const mongoose = require('mongoose');

const Review = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    salary: { type: Number, min: 0, max: 5, required: true },
    content: { type: String, required: true },
    position: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" }
});

module.exports = mongoose.model('Review', Review);