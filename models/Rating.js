const mongoose = require('mongoose');

const Rating = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    review: { type: mongoose.Schema.Types.ObjectId, ref: "Review" },
    culture: { type: Number, min: 0, max: 5, required: true },
    mentorship: { type: Number, min: 0, max: 5, required: true },
    impact: { type: Number, min: 0, max: 5, required: true }
});

module.exports = mongoose.model('Rating', Rating);