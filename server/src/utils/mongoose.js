const mongoose = require('mongoose');
const config = require("./../config/db");
const log = require('./logger')(module);
const db = mongoose.connection;

db.once('open', function callback () {
    log.info("Connected to DB. Conn string: " + process.env.MONGODB_CONN_STRING);
});

module.exports.Mongoose = mongoose;
module.exports.Db = db;