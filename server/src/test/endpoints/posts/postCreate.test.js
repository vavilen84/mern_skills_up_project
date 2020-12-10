require('dotenv').config({path: '.env.test'});
const assert = require('assert');
const utils = require('../../utils');
const app = require('../../../app').App;
const request = require('supertest');
const constants = require('./../../../constants/constants');
const Post = require('./../../../models/postModel').Post;
const homePageFixture = require('../../fixtures/posts').HOME_PAGE;
const {ensurePageExistsByUniqueKey, ensurePageDoesNotExistsByUniqueKey} = require('./base');

describe(constants.USERS_BASE_URL, function () {

    beforeEach(function (done) {
        utils.beforeEach(done);
    });

    describe('POST ' + constants.POSTS_BASE_URL, function () {
        it('endpoints/posts/get 401 on not authorized request',  function (done) {
            request(app)
                .post(constants.POSTS_BASE_URL)
                .send(homePageFixture)
                .expect('Content-Type', /json/)
                .expect(constants.RESPONSE_CODE.UNAUTHORIZED)
                .end(async function (err, res) {
                    utils.assertIsNull(err);
                    const resp = JSON.parse(res.text);
                    assert.strictEqual(resp.code, constants.RESPONSE_CODE.UNAUTHORIZED);
                    assert.strictEqual(resp.message, constants.RESPONSE_MESSAGE.UNAUTHORIZED);
                    done();
                });
        });

        it('endpoints/posts/get 200 on create post',  function (done) {
             ensurePageDoesNotExistsByUniqueKey(homePageFixture)
                .then( function () {
                     request(app)
                        .post(constants.POSTS_BASE_URL)
                        .send(homePageFixture)
                        .expect('Content-Type', /json/)
                        .expect(constants.RESPONSE_CODE.OK)
                        .end(async function (err, res) {
                            utils.assertIsNull(err);
                            const resp = JSON.parse(res.text);
                            let post = resp.data;
                            assert.strictEqual(resp.code, constants.RESPONSE_CODE.OK);
                            assert.strictEqual(resp.message, constants.RESPONSE_MESSAGE.OK);
                            assert.strictEqual(post.url, homePageFixture.url);
                            assert.strictEqual(post.uniqueKey, homePageFixture.uniqueKey);
                            let postFromDb = await Post.findOne({uniqueKey: homePageFixture.uniqueKey}).exec();
                            assert.strictEqual(postFromDb.url, homePageFixture.url);
                            assert.strictEqual(postFromDb.uniqueKey, homePageFixture.uniqueKey);
                            await ensurePageExistsByUniqueKey(homePageFixture).then(done());
                        });
                });
        });

        it('endpoints/posts/get 422 on validation failed', function (done) {
            request(app)
                .post(constants.POSTS_BASE_URL)
                .send({})
                .expect('Content-Type', /json/)
                .expect(constants.RESPONSE_CODE.UNPROCESSABLE_ENTITY)
                .end(async function (err, res) {
                    utils.assertIsNull(err);
                    const resp = JSON.parse(res.text);
                    assert.strictEqual(resp.code, constants.RESPONSE_CODE.UNPROCESSABLE_ENTITY);
                    assert.strictEqual(resp.message, constants.RESPONSE_MESSAGE.UNPROCESSABLE_ENTITY);
                    done();
                });
        });
    });

});