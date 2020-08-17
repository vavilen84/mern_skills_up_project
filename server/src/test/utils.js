require('dotenv').config({path: '.env.test'});
const mongoose = require('mongoose');
const config = require('./../config/db');
const log = require('./../libs/logger')(module);
const enums = require('./../enum/enum');
const User = require('./../models/user').User;

function prepareDatabaseBeforeTest(done) {
    log.info("CLEAR DB");
    mongoose.connect(process.env.MONGODB_CONN_STRING, config.mongoose.options);
    const db = mongoose.connection;
    db.on('error', function (err) {
        log.error('connection error:', err.message);
    });
    db.once('open', function callback() {
        log.info("Connected to DB. Conn string: " + process.env.MONGODB_CONN_STRING);
    });

    db.dropDatabase(function(err){
        if (err) throw err;
        let user = new User({
            scenario: enums.Models.SCENARIO_CREATE
        });
        user.set('username', 'username1');
        user.set('password', 'password1');
        user.save(function (err, user, affected) {
            if (err) throw err;
            done();
        });
    });
}

exports.prepareDatabaseBeforeTest = function (done) {
    prepareDatabaseBeforeTest(done);
}