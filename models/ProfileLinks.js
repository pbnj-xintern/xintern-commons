const mongoose = require('mongoose');

const ProfileLinks = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    linkedin: { type: mongoose.Schema.Types.String },
    facebook: { type: mongoose.Schema.Types.String },
    twitter: { type: mongoose.Schema.Types.String },
    isDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('ProfileLinks', ProfileLinks);