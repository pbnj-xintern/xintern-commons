const mongoose = require('mongoose');

const User = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdAt: { type: mongoose.Schema.Types.Date, required: true },
    deletedAt: { type: mongoose.Schema.Types.Date, default: null },
    username: { type: String },
    name: { type: String },
    sex: { type: String },
    photo: { type: String },
    school: { type: String },
    program: { type: String },
    age: { type: Number },
    isShowInfo: { type: mongoose.Schema.Types.Boolean, default: true }
});

module.exports = mongoose.model('User', User);