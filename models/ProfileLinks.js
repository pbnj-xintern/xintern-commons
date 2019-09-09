const mongoose = require('mongoose');

//may not be used
const ProfileLinks = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    linkedin: {},
    //other social medias/links
});

module.exports = mongoose.model('ProfileLinks', ProfileLinks);