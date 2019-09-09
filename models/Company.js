const mongoose = require('mongoose');

const Company = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    logo: { type: String, required: true }
});

module.exports = mongoose.model('Company', Company);