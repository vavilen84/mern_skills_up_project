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
    await user.save().catch(e => console.log(e));
}

async function createPosts(){
    let post1 = new Post(post1fixture);
    await post1.save().catch(e => console.log(e));

    let post2 = new Post(post2fixture);
    await post2.save().catch(e => console.log(e));

    let post3 = new Post(post3fixture);
    await post3.save().catch(e => console.log(e));
}

async function prepareDatabaseBeforeTest() {
    log.info("CLEAR DB");
    db.set('debug', true);
    db.dropDatabase()
        .then(async function(){
            await db.collection('posts').count().then(count => console.log(count))
        })
        .then(createUsers())
        .then(()=>console.log('users created'))
        .then(createPosts())
        .then(()=>console.log('posts created'));
}

exports.prepareDatabaseBeforeTest = async function () {
    await prepareDatabaseBeforeTest();
}
