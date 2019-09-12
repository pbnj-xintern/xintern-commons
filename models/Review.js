const mongoose = require('mongoose');

const Review = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    salary: { type: Number, required: true },
    createdAt: { type: mongoose.Schema.Types.Date, default: new Date(), required: true },
    deletedAt: { type: mongoose.Schema.Types.Date, default: null },
    content: { type: String, required: true },
    position: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    flagged: { type: mongoose.Schema.Types.Boolean, default: false },
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

});

module.exports = mongoose.model('Review', Review);