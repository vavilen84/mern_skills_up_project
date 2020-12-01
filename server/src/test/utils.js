const db = require('../utils/mongoose').Db;
const log = require('./../utils/logger')(module);
const enums = require('./../enum/enum');
const User = require('./../models/userModel').User;
const Post = require('./../models/postModel').Post;
const user1fixture = require('./fixtures/users').USER_1;
const post1fixture = require('./fixtures/posts').POST_1;
const post2fixture = require('./fixtures/posts').POST_2;

async function prepareDatabaseBeforeTest(done) {
    log.info("CLEAR DB");
    db.set('debug', true);
    await db.dropDatabase();

    let user = new User({
        scenario: enums.Scenarios.SCENARIO_CREATE
    });
    user.set('username', user1fixture.username);
    user.set('password', user1fixture.password);

    let post1 = new Post(post1fixture);
    await post1.save();

    let post2 = new Post(post2fixture);
    await post2.save();

    await user.save();
    done();
}

exports.prepareDatabaseBeforeTest = async function (done) {
    await prepareDatabaseBeforeTest(done);
}
