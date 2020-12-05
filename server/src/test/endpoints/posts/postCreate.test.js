require('dotenv').config({path: '.env.test'});
const assert = require('assert');
const utils = require('../../utils');
const app = require('../../../app').App;
const request = require('supertest');
const log = require('../../../utils/logger')(module);
const constants = require('./../../../constants/constants');
const Post = require('./../../../models/postModel').Post;
const homePageFixture = require('../../fixtures/posts').HOME_PAGE;
const {ensurePageExistsByUniqueKey, ensurePageDoesNotExistsByUniqueKey} = require('./base');

describe(constants.USERS_BASE_URL, function () {

    beforeEach(async function () {
        await utils.prepareDatabaseBeforeTest();
    });

    describe('POST ' + constants.POSTS_BASE_URL, function () {
        it('endpoints/posts/get 200 on create post', async function () {
            ensurePageDoesNotExistsByUniqueKey(homePageFixture)
                .then(function () {
                    request(app)
                        .post(constants.POSTS_BASE_URL)
                        .send(homePageFixture)
                        .expect('Content-Type', /json/)
                        .expect(constants.RESPONSE_CODE.OK)
                        .end(async function (err, res) {
                            const resp = JSON.parse(res.text);
                            let post = resp.data;
                            assert.strictEqual(resp.code, constants.RESPONSE_CODE.OK);
                            assert.strictEqual(resp.message, constants.RESPONSE_MESSAGE.OK);
                            assert.strictEqual(post.url, homePageFixture.url);
                            assert.strictEqual(post.uniqueKey, homePageFixture.uniqueKey);
                            let postFromDb = await Post.findOne({uniqueKey: homePageFixture.uniqueKey}).exec();
                            assert.strictEqual(postFromDb.url, homePageFixture.url);
                            assert.strictEqual(postFromDb.uniqueKey, homePageFixture.uniqueKey);
                        });
                })
                .then(ensurePageExistsByUniqueKey(homePageFixture));
        });

        it('endpoints/posts/get 422 on validation failed', async function () {
            ensurePageDoesNotExistsByUniqueKey(homePageFixture)
                .then(function () {
                    request(app)
                        .post(constants.POSTS_BASE_URL)
                        .send(homePageFixture)
                        .expect('Content-Type', /json/)
                        .expect(constants.RESPONSE_CODE.OK)
                        .end(async function (err, res) {
                            const resp = JSON.parse(res.text);
                            let post = resp.data;
                            assert.strictEqual(resp.code, constants.RESPONSE_CODE.OK);
                            assert.strictEqual(resp.message, constants.RESPONSE_MESSAGE.OK);
                            assert.strictEqual(post.url, homePageFixture.url);
                            assert.strictEqual(post.uniqueKey, homePageFixture.uniqueKey);
                            let postFromDb = await Post.findOne({uniqueKey: homePageFixture.uniqueKey}).exec();
                            assert.strictEqual(postFromDb.url, homePageFixture.url);
                            assert.strictEqual(postFromDb.uniqueKey, homePageFixture.uniqueKey);
                        });
                })
                .then(ensurePageDoesNotExistsByUniqueKey(homePageFixture));
        });
    });

});