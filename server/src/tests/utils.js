const assert = require('assert');
const db = require('../utils/mongoose').Db;
const log = require('./../utils/logger')(module);
const enums = require('./../enum/enum');
const {SetEnv} = require("./../utils/env");
const mongoose = require("mongoose");
const config = require("./../config/db");
const {Counter} = require("../models/countersModel");
const {POST_MODEL_NAME} = require("../constants/constants");
const User = require('./../models/userModel').User;
const Post = require('./../models/postModel').Post;
const user1fixture = require('./fixtures/users').USER_1;
const post1fixture = require('./fixtures/posts').POST_1;
const post2fixture = require('./fixtures/posts').POST_2;
const post3fixture = require('./fixtures/posts').POST_3;
const post4fixture = require('./fixtures/posts').POST_4;
const post5fixture = require('./fixtures/posts').POST_5;
const post6fixture = require('./fixtures/posts').POST_6;
const post7fixture = require('./fixtures/posts').POST_7;
const post8fixture = require('./fixtures/posts').POST_8;
const post9fixture = require('./fixtures/posts').POST_9;
const post10fixture = require('./fixtures/posts').POST_10;
const post11fixture = require('./fixtures/posts').POST_11;
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

async function createCounters(){
    let postCounter = new Counter({_id:POST_MODEL_NAME, seq: 1});
    try {
        await postCounter.save();
    } catch (err) {
        logAndExit(err);
    }
}

async function createPosts() {
    let posts = [
        post1fixture,
        post2fixture,
        post3fixture,
        post4fixture,
        post5fixture,
        post6fixture,
        post7fixture,
        post8fixture,
        post9fixture,
        post10fixture,
        post11fixture
    ];

    for (let i in posts) {
        let post = new Post(posts[i]);
        try {
            await post.save();
        } catch (err) {
            logAndExit(err);
        }
    }
}

async function prepareDatabaseBeforeTest() {
    log.info("CLEAR DB");
    db.set('debug', true);
    log.info("DB ready state: " + db.readyState);
    try {
        await db.collections.counters.deleteMany({});
        await createCounters();
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

function assertIsNull(obj) {
    if (obj) {
        logAndExit(obj);
    }
    assert.strictEqual(obj, null)
}

function assertIsNotNull(obj) {
    if (!obj) {
        logAndExit(obj);
    }
}

function assertIsObject(obj) {
    assert.strictEqual(typeof obj === 'object', true)
}

function logAndExit(obj) {
    console.log(obj);
    console.trace();
    process.exit(1);
}

async function beforeEach(done) {
    let dbState = db.readyState;
    try {
        SetEnv();
        if (dbState !== 1 && dbState !== 2) {
            log.info("Connecting to DB. Conn string: " + process.env.MONGODB_CONN_STRING);
            await mongoose.connect(process.env.MONGODB_CONN_STRING, config.mongoose.options);
        }
        await prepareDatabaseBeforeTest();
        done();
    } catch(err){
        logAndExit(err)
    }
}

function assertObjIsEmpty(obj) {
    assert.strictEqual(Object.keys(obj).length === 0, true);
}

function assertStringIsNotEmpty(string) {
    if ((typeof string) !== 'string') {
        throw new Error('arg is not a string');
    }
    assert.strictEqual(string.length !== 0, true);
}

function assertObjHasProp(obj, prop) {
    assert.strictEqual(obj.hasOwnProperty(prop), true);
}

exports.assertObjHasProp = assertObjHasProp;
exports.assertStringIsNotEmpty = assertStringIsNotEmpty;
exports.assertObjIsEmpty = assertObjIsEmpty;
exports.beforeEach = beforeEach;
exports.logAndExit = logAndExit;
exports.assertIsNull = assertIsNull;
exports.assertIsNotNull = assertIsNotNull;
exports.assertIsObject = assertIsObject;

exports.prepareDatabaseBeforeTest = function () {
    return prepareDatabaseBeforeTest();
}