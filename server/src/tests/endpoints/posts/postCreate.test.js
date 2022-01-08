const utils = require('../../utils');
const assert = require('assert');
const request = require('supertest');
const constants = require('./../../../constants/constants');
const {TOKEN_1_UUID} = require("../../fixtures/tokens");
const post12fixture = require('../../fixtures/posts').POST_12;
const post1fixture = require('../../fixtures/posts').POST_1;
const path = require('path');
const fs = require('fs');
const {App} = require("../../../utils/server");
const {ensurePostNotExists, findPostById, findPostBUrl} = require("./base");

describe(constants.USERS_BASE_URL, function () {

    beforeEach(function (done) {
        utils.beforeEach(done);
    });

    describe('POST ' + constants.POSTS_BASE_URL, function () {
        it('endpoints/posts/get 401 on not authorized request', function (done) {
            request(App)
                .post(constants.POSTS_BASE_URL)
                .send(post1fixture)
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

        it('endpoints/posts/get 200 on create post', function (done) {
            ensurePostNotExists(post12fixture)
                .then(function () {
                    request(App)
                        .post(constants.POSTS_BASE_URL)
                        .field('url', post12fixture.url)
                        .field('content', post12fixture.content)
                        .set('Authorization', 'Bearer ' + TOKEN_1_UUID)
                        .expect('Content-Type', /json/)
                        .expect(constants.RESPONSE_CODE.OK)
                        .end(async function (err, res) {
                            utils.assertIsNull(err);
                            const resp = JSON.parse(res.text);
                            let post = resp.data;
                            assert.strictEqual(resp.code, constants.RESPONSE_CODE.OK);
                            assert.strictEqual(resp.message, constants.RESPONSE_MESSAGE.OK);
                            assert.strictEqual(post.url, post12fixture.url);
                            let postFromDb = null;
                            try {
                                postFromDb = await findPostBUrl(post12fixture.url);
                            } catch (err) {
                                utils.assertIsNull(err);
                            }
                            utils.assertIsNotNull(postFromDb);
                            assert.strictEqual(postFromDb.url, post12fixture.url);
                            done();
                        });
                });
        });

        it('endpoints/posts/get 422 on validation failed', function (done) {
            request(App)
                .post(constants.POSTS_BASE_URL)
                .set('Authorization', 'Bearer ' + TOKEN_1_UUID)
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

        it('endpoints/posts/ get 200 on create post with image & file is uploaded', function (done) {
            request(App)
                .post(constants.POSTS_BASE_URL)
                .field('url', 'uniqueURL')
                .field('content', 'uniqueContent')
                .attach('image', path.join(
                    process.env.SERVER_APP_FOLDER,
                    'src/tests/fixtures/files/fixture_image_1.jpg'
                ))
                .set('Authorization', 'Bearer ' + TOKEN_1_UUID)
                .expect(constants.RESPONSE_CODE.OK)
                .end(async function (err, res) {
                    utils.assertIsNull(err);
                    const resp = JSON.parse(res.text);
                    let post = resp.data;
                    assert.strictEqual(post.url === 'uniqueURL', true);
                    assert.strictEqual(post.content === 'uniqueContent', true);
                    assert.strictEqual(post.image.length > 0, true);
                    assert.strictEqual(fs.existsSync(path.join(process.env.UPLOADS_PATH, post.image)), true);
                    done();
                });
        });
    });

});