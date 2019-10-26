const mongoose = require('mongoose');
const Promise = require('bluebird')
mongoose.Promise = Promise;

function exec(dbUrl, fn) {
    return mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => fn())
            .then((res, err) => {
                mongoose.disconnect().then(() => console.log('Mongoose connections disconnected.'))
                return res;
            })
}   

module.exports = {exec};