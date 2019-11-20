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
    currency: { type: mongoose.Schema.Types.String, required: false },
    flagged: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], //all children
    payPeriod: { type: mongoose.Schema.Types.String, required: false }, // MONTHLY, HOURLY, WEEKLY
});

module.exports = mongoose.model('Review', Review);
