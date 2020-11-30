const db = require('../utils/mongoose').Db;
const log = require('./../utils/logger')(module);
const enums = require('./../enum/enum');
const User = require('./../models/userModel').User;

async function prepareDatabaseBeforeTest() {
    log.info("CLEAR DB");
    db.set('debug', true);
    await db.dropDatabase();
    let user = new User({
        scenario: enums.Scenarios.SCENARIO_CREATE
    });
    user.set('username', 'username1');
    user.set('password', 'password1');
    await user.save();
}

exports.prepareDatabaseBeforeTest = async function () {
    await prepareDatabaseBeforeTest();
}
