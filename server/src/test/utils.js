const db = require('../utils/mongoose').Db;
const log = require('./../utils/logger')(module);
const enums = require('./../enum/enum');
const User = require('./../models/userModel').User;
const user1fixture = require('./fixtures/users').USER_1;

async function prepareDatabaseBeforeTest() {
    log.info("CLEAR DB");
    db.set('debug', true);
    await db.dropDatabase();
    let user = new User({
        scenario: enums.Scenarios.SCENARIO_CREATE
    });
    user.set('username', user1fixture.username);
    user.set('password', user1fixture.password);
    await user.save();
}

exports.prepareDatabaseBeforeTest = async function () {
    await prepareDatabaseBeforeTest();
}
