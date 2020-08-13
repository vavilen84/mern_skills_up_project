let mongoose = require('mongoose');
let config = require('./../config/db');
let log = require('./logger')(module);

mongoose.connect(process.env.MONGODB_CONN_STRING, config.mongoose.options);
let db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Connected to DB!");
});

module.exports = mongoose;
