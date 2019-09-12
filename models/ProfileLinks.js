const mongoose = require('mongoose');

const ProfileLinks = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    linkedin: { type: mongoose.Schema.Types.String },
    facebook: { type: mongoose.Schema.Types.String },
    twitter: { type: mongoose.Schema.Types.String }
});

module.exports = mongoose.model('ProfileLinks', ProfileLinks);