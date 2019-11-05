const mongoose = require('mongoose');

const Review = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    createdAt: { type: mongoose.Schema.Types.Date, default: new Date(), required: true },

    salary: { type: mongoose.Schema.Types.Number, required: false },
    content: { type: mongoose.Schema.Types.String, required: true },
    rating: { type: mongoose.Schema.Types.ObjectId, ref: "Rating", required: true },
    position: { type: mongoose.Schema.Types.String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    flagged: { type: mongoose.Schema.Types.Boolean, default: false },
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    currency: { type: mongoose.Schema.Types.String, required: false },
    downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], //all children
});

module.exports = mongoose.model('Review', Review);
