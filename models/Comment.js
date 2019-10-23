const mongoose = require('mongoose');

const Comment = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdAt: { type: mongoose.Schema.Types.Date, default: new Date(), required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, },
    content: { type: mongoose.Schema.Types.String, required: true },
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    parentComment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
    flagged: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model('Comment', Comment);