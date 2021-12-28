const assert = require('assert');
const db = require('../utils/mongoose').Db;
const log = require('./../utils/logger')(module);
const enums = require('./../enum/enum');
const {SetEnv} = require("./utils/env");
const {DBConnect} = require("./utils/mongoose");
const {InitServerApp} = require("./utils/server");
const User = require('./../models/userModel').User;
const Post = require('./../models/postModel').Post;
const user1fixture = require('./fixtures/users').USER_1;
const post1fixture = require('./fixtures/posts').POST_1;
const post2fixture = require('./fixtures/posts').POST_2;
const post3fixture = require('./fixtures/posts').POST_3;
const Token = require('./../models/tokenModel').Token;
const token1fixture = require('./fixtures/tokens').TOKEN_1;

async function createUsers() {
    let user = new User({
        scenario: enums.Scenarios.SCENARIO_CREATE
    });
    user.set('username', user1fixture.username);
    user.set('password', user1fixture.password);
    try {
        await user.save();
    } catch (err) {
        logAndExit(err);
    }
}

async function createTokens() {
    let token1 = new Token(token1fixture);

    try {
        await token1.save();
    } catch (err) {
        logAndExit(err);
    }
}

async function createPosts() {
    let post1 = new Post(post1fixture);
    let post2 = new Post(post2fixture);
    let post3 = new Post(post3fixture);

    try {
        await post1.save();
        await post2.save();
        await post3.save();
    } catch (err) {
        logAndExit(err);
    }
}

async function prepareDatabaseBeforeTest() {
    log.info("CLEAR DB");
    db.set('debug', true);
    log.info("DB ready state: " + db.readyState);
    try {
        await db.collections.users.deleteMany({});
        await createUsers();
        await db.collections.posts.deleteMany({});
        await createPosts();
        await db.collections.tokens.deleteMany({});
        await createTokens();
    } catch (err) {
        logAndExit(err);
    }
}

exports.prepareDatabaseBeforeTest = function () {
    return prepareDatabaseBeforeTest();
}

function assertIsNull(obj) {
    if (obj) {
        logAndExit(obj);
    }
    assert.strictEqual(obj, null)
}

exports.assertIsNull = assertIsNull;

function assertIsObject(obj) {
    assert.strictEqual(typeof obj === 'object', true)
}

exports.assertIsObject = assertIsObject;

function logAndExit(obj) {
    console.log(obj);
    console.trace();
    process.exit(1);
}

exports.logAndExit = logAndExit;

async function beforeEach(done) {
    try {
        SetEnv();
        DBConnect(InitServerApp);
        await prepareDatabaseBeforeTest();
        done();
    } catch(err){
        logAndExit(err)
    }
}

exports.beforeEach = beforeEach;

function assertObjIsEmpty(obj) {
    assert.strictEqual(Object.keys(obj).length === 0, true);
}

exports.assertObjIsEmpty = assertObjIsEmpty;

function assertStringIsNotEmpty(string) {
    if ((typeof string) !== 'string') {
        throw new Error('arg is not a string');
    }
    assert.strictEqual(string.length !== 0, true);
}

exports.assertStringIsNotEmpty = assertStringIsNotEmpty;

function assertObjHasProp(obj, prop) {
    assert.strictEqual(obj.hasOwnProperty(prop), true);
}

exports.assertObjHasProp = assertObjHasProp;