const mongoose = require('mongoose');
const Promise = require('bluebird')

mongoose.Promise = Promise;

function dbExec(dbUrl, fn) {
    var mongoosePromise = new Promise((resolve, reject) => {
        mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(fn)
            .catch(reject)
            .finally(resolve)
    })

    mongoosePromise.then(() => mongoose.disconnect().then(() => console.log('Mongoose connections disconnected.')))
}

module.exports = dbExec;