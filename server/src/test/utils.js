const assert = require('assert');
const db = require('../utils/mongoose').Db;
const log = require('./../utils/logger')(module);
const enums = require('./../enum/enum');
const User = require('./../models/userModel').User;
const Post = require('./../models/postModel').Post;
const user1fixture = require('./fixtures/users').USER_1;
const post1fixture = require('./fixtures/posts').POST_1;
const post2fixture = require('./fixtures/posts').POST_2;
const post3fixture = require('./fixtures/posts').POST_3;

async function createUsers(){
    let user = new User({
        scenario: enums.Scenarios.SCENARIO_CREATE
    });
    user.set('username', user1fixture.username);
    user.set('password', user1fixture.password);
    try {
        await user.save();
    } catch(err){
        logAndExit(err);
    }
}

async function createPosts(){
    let post1 = new Post(post1fixture);
    let post2 = new Post(post2fixture);
    let post3 = new Post(post3fixture);

    try {
        await post1.save();
        await post2.save();
        await post3.save();
    } catch(err){
        logAndExit(err);
    }
}

async function prepareDatabaseBeforeTest() {
    log.info("CLEAR DB");
    db.set('debug', true);
    try {
        await db.collections.users.deleteMany();
        await createUsers();
        await db.collections.posts.deleteMany();
        await createPosts();
    } catch (err) {
        logAndExit(err);
    }
}

exports.prepareDatabaseBeforeTest =  function () {
     return prepareDatabaseBeforeTest();
}

function assertIsNull(obj){
    if (obj) {
        logAndExit(obj);
    }
    assert.strictEqual(obj, null)
}

exports.assertIsNull = assertIsNull;

function assertTrue(obj){
    assert.strictEqual(obj == true, true)
}

exports.assertTrue = assertTrue;

function assertIsObject(obj){
    assert.strictEqual(typeof obj === 'object', true)
}

exports.assertIsObject = assertIsObject;

function assertFalse(obj){
    if (obj) {
        logAndExit(obj);
    }
    assert.strictEqual(obj == false, true)
}

exports.assertFalse = assertFalse;

function logAndExit(obj){
    console.log(obj);
    console.trace();
    process.exit(1);
}

exports.logAndExit = logAndExit;

function beforeEach(done){
    prepareDatabaseBeforeTest()
        .then(() => {
            done()
        })
        .catch(err => {
            logAndExit(err)
        });
}

exports.beforeEach = beforeEach;


