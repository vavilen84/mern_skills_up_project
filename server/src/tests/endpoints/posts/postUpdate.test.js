const utils = require('../../utils');
const assert = require('assert');
const request = require('supertest');
const constants = require('./../../../constants/constants');
const {TOKEN_1_UUID} = require("../../fixtures/tokens");
const {findPostByUrl} = require('./base');
const {App} = require("../../../utils/server");
const {logAndExit} = require("../../utils");
const path = require("path");
const fs = require("fs");
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
                    const updatedTitle = 'updated_title';
                    const updatedContent = 'updated_content';
                    request(App)
                        .post(constants.POSTS_BASE_URL+"/"+postId)
                        .field('url', updatedUrl)
                        .field('title', updatedTitle)
                        .field('content', updatedContent)
                        .attach('image', path.join(
                            process.env.SERVER_APP_FOLDER,
                            'src/tests/fixtures/files/fixture_image_1.jpg'
                        ))
                        .set('Authorization', 'Bearer ' + TOKEN_1_UUID)
                        .expect('Content-Type', /json/)
                        .expect(constants.RESPONSE_CODE.OK)
                        .end(async function (err, res) {
                            utils.assertIsNull(err);
                            const resp = JSON.parse(res.text);
                            let postFromResponse = resp.data;
                            assert.strictEqual(resp.code, constants.RESPONSE_CODE.OK);
                            assert.strictEqual(resp.message, constants.RESPONSE_MESSAGE.OK);
                            assert.strictEqual(postFromResponse.url, updatedUrl);
                            assert.strictEqual(postFromResponse.title, updatedTitle);
                            assert.strictEqual(postFromResponse.content, updatedContent);
                            assert.strictEqual(postFromResponse.image.length > 0, true);
                            assert.strictEqual(fs.existsSync(path.join(process.env.UPLOADS_PATH, postFromResponse.image)), true);

                            let postFromDb = null;
                            try {
                                postFromDb = await findPostByUrl(updatedUrl);
                            } catch(err){
                                logAndExit(err);
                            }
                            utils.assertIsNotNull(postFromDb);
                            assert.strictEqual(postFromDb.url, updatedUrl)
                            assert.strictEqual(postFromDb.title, updatedTitle)
                            assert.strictEqual(postFromDb.content, updatedContent)
                            assert.strictEqual(postFromDb.image.length > 0, true);
                            assert.strictEqual(fs.existsSync(path.join(process.env.UPLOADS_PATH, postFromDb.image)), true);

                            done();
                        });
                });
        });

        it('get 404 on update not existing post', function (done) {
            request(App)
                .post(constants.POSTS_BASE_URL + "/56cb91bdc3464f14678934ca")
                .field('url', 'new_url')
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