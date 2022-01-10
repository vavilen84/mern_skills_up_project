const utils = require('../../utils');
const assert = require('assert');
const request = require('supertest');
const constants = require('./../../../constants/constants');
const {TOKEN_1_UUID} = require("../../fixtures/tokens");
const {findPostByUniqueKey, findPostByUrl} = require('./base');
const {App} = require("../../../utils/server");
const {logAndExit} = require("../../utils");
const {POST_1: post1fixture} = require("../../fixtures/posts");
const post3fixture = require('../../fixtures/posts').POST_3;

describe(constants.USERS_BASE_URL, function () {

    beforeEach(function (done) {
        utils.beforeEach(done);
    });

    describe('POST ' + constants.POSTS_BASE_URL, function () {
        it('endpoints/posts/get 401 on not authorized request', function (done) {
            findPostByUrl(post3fixture.url)
                .then(function (post) {
                    request(App)
                        .post(constants.POSTS_BASE_URL+"/"+post.id)
                        .field('url', post.url)
                        .field('content', post.content)
                        .field('title', post.title)
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
        });

        it('endpoints/posts/get 200 on update post',  function (done) {
            findPostByUrl(post3fixture.url)
                .then( function (post) {
                    let postId = post._id.toString();
                    const updatedUrl = 'updated_url';
                    request(App)
                        .post(constants.POSTS_BASE_URL+"/"+postId)
                        .field('url', updatedUrl)
                        .set('Authorization', 'Bearer ' + TOKEN_1_UUID)
                        .expect('Content-Type', /json/)
                        .expect(constants.RESPONSE_CODE.OK)
                        .end(async function (err, res) {
                            utils.assertIsNull(err);
                            const resp = JSON.parse(res.text);
                            let updatedPost = resp.data;
                            assert.strictEqual(resp.code, constants.RESPONSE_CODE.OK);
                            assert.strictEqual(resp.message, constants.RESPONSE_MESSAGE.OK);
                            assert.strictEqual(updatedPost.url, updatedUrl);
                            let post = null;
                            try {
                                post = await findPostByUrl(updatedUrl);
                            } catch(err){
                                logAndExit(err);
                            }
                            utils.assertIsNotNull(post);
                            assert.strictEqual(post.url, updatedUrl)

                            done();
                        });
                });
        });

        it('get 404 on update not existing post', function (done) {
            request(App)
                .post(constants.POSTS_BASE_URL + "/56cb91bdc3464f14678934ca")
                .send(post3fixture)
                .set('Authorization', 'Bearer ' + TOKEN_1_UUID)
                .expect('Content-Type', /json/)
                .expect(constants.RESPONSE_CODE.NOT_FOUND)
                .end(async function (err, res) {
                    utils.assertIsNull(err);
                    const resp = JSON.parse(res.text);
                    assert.strictEqual(resp.code, constants.RESPONSE_CODE.NOT_FOUND);
                    assert.strictEqual(resp.message, constants.RESPONSE_MESSAGE.NOT_FOUND);
                    done();
                });
        });
    });
});