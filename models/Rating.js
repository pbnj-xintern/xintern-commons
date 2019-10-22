const mongoose = require('mongoose');

const Rating = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    culture: { type: mongoose.Schema.Types.Number, min: 0, max: 5},
    mentorship: { type: mongoose.Schema.Types.Number, min: 0, max: 5 },
    impact: { type: mongoose.Schema.Types.Number, min: 0, max: 5},
    interview: { type: mongoose.Schema.Types.Number, min: 0, max: 5}
});

module.exports = mongoose.model('Rating', Rating);