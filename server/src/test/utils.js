require('dotenv').config({path: '.env.test'});
const mongoose = require('mongoose');
const config = require('./../config/db');
const log = require('./../libs/logger')(module);

function clearTestDBCollections() {
    mongoose.connect(process.env.MONGODB_CONN_STRING, config.mongoose.options);
    const db = mongoose.connection;
    db.on('error', function (err) {
        log.error('connection error:', err.message);
    });
    db.once('open', function callback () {
        log.info("Connected to DB. Conn string: " + process.env.MONGODB_CONN_STRING);
    });
    db.dropDatabase();
}

exports.prepareDatabaseBeforeTest = function () {
    clearTestDBCollections();
}