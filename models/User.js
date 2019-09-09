const mongoose = require('mongoose');

const User = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String },
    sex: { type: String },
    photo: { type: String },
    school: { type: String },
    program: { type: String },
    age: { type: Number }
});

module.exports = mongoose.model('User', User);