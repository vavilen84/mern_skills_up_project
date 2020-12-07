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
    await user.save();
}

async function createPosts(){
    let post1 = new Post(post1fixture);
    await post1.save().catch(err => assertIsNull(err));

    let post2 = new Post(post2fixture);
    await post2.save().catch(err => assertIsNull(err));

    let post3 = new Post(post3fixture);
    await post3.save().catch(err => assertIsNull(err));
}

async function prepareDatabaseBeforeTest() {
    log.info("CLEAR DB");
    db.set('debug', true);
    try {
        await db.collections.users.remove();
        await db.collections.posts.remove();
        await createUsers();
        await createPosts();
    } catch (err) {
        assertIsNull(err);
    }
}

exports.prepareDatabaseBeforeTest = async function () {
    await prepareDatabaseBeforeTest();
}

function assertIsNull(obj){
    if (obj) {
        logAndExit(obj);
    }
    assert.strictEqual(obj, null)
}

exports.assertIsNull = assertIsNull;

function assertTrue(obj){
    assert.equal(obj, true)
}

exports.assertTrue = assertTrue;

function assertIsObject(obj){
    assert.equal(typeof obj === 'object', true)
}

exports.assertIsObject = assertIsObject;

function assertFalse(obj){
    if (obj) {
        logAndExit(obj);
    }
    assert.equal(obj, false)
}

function logAndExit(obj){
    console.log(obj);
    console.trace();
    process.exit(1);
}

exports.assertFalse = assertFalse;