const mongoose = require('mongoose');

const dbExecute = (db, fn) => db.then(fn).finally(() => db.close());

function dbExec(dbUrl, fn) {
    return dbExecute(mongoose.connect(dbUrl, { useNewUrlParser: true }), fn);
}

module.exports = dbExec;