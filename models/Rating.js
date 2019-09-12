const mongoose = require('mongoose');

const Rating = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    culture: { type: mongoose.Schema.Types.Number, min: 0, max: 5, required: true },
    mentorship: { type: mongoose.Schema.Types.Number, min: 0, max: 5, required: true },
    impact: { type: mongoose.Schema.Types.Number, min: 0, max: 5, required: true },
    interview: { type: mongoose.Schema.Types.Number, min: 0, max: 5, required: true }
});

module.exports = mongoose.model('Rating', Rating);