const mongoose = require('mongoose');
const config = require('Config/db');
const log = require('logger')(module);

mongoose.connect(process.env.MONGODB_CONN_STRING, config.mongoose.options);
const db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Connected to DB. Conn string: " + process.env.MONGODB_CONN_STRING);
});
module.exports.Mongoose = mongoose;
module.exports.Db = db;


