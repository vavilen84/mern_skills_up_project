require('dotenv').config({path: '.env.test'});
const db = require('../utils/mongoose').Db;
const log = require('./../utils/logger')(module);
const enums = require('./../enum/enum');
const User = require('./../models/userModel').User;

async function prepareDatabaseBeforeTest(done) {
    log.info("CLEAR DB");
    db.set('debug', true);
    await db.dropDatabase(async function(err){
        if (err) throw err;
        let user = new User({
            scenario: enums.Models.SCENARIO_CREATE
        });
        user.set('username', 'username1');
        user.set('password', 'password1');
        await user.save(function (err, user, affected) {
            if (err) throw err;
            return user;
        });
        done();
    });
}

exports.prepareDatabaseBeforeTest = async function (done) {
    await prepareDatabaseBeforeTest(done);
}