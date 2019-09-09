const mongoose = require('mongoose');

const Comment = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    parentComment: { type: mongoose.Schema.Types.ObjectId, ref: "Rating" },
    parentReview: { type: mongoose.Schema.Types.ObjectId, ref: "Review" },
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model('Comment', Comment);