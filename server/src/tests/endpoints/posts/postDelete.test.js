const utils = require('../../utils');
const assert = require('assert');
const request = require('supertest');
const constants = require('./../../../constants/constants');
const {TOKEN_1_UUID} = require("../../fixtures/tokens");
const post3fixture = require('../../fixtures/posts').POST_3;
const {ensurePageDoesNotExistsByUniqueKey, findPostByUniqueKey} = require('./base');
const {App} = require("../../../utils/server");

describe(constants.USERS_BASE_URL, function () {

    beforeEach(function (done) {
        utils.beforeEach(done);
    });

    describe('DELETE ' + constants.POSTS_BASE_URL, function () {
        it('endpoints/posts/get 401 on not authorized request', function (done) {
            findPostByUniqueKey(post3fixture.uniqueKey)
                .then(function (post) {
                    request(App)
                        .delete(constants.POSTS_BASE_URL + "/" + post.id)
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

        it('get 200 on delete post', function (done) {
            findPostByUniqueKey(post3fixture.uniqueKey)
                .then(function (post) {
                    request(App)
                        .delete(constants.POSTS_BASE_URL + "/" + post.id)
                        .set('Authorization', 'Bearer ' + TOKEN_1_UUID)
                        .expect('Content-Type', /json/)
                        .expect(constants.RESPONSE_CODE.OK)
                        .end(async function (err, res) {
                            utils.assertIsNull(err);
                            const resp = JSON.parse(res.text);
                            assert.strictEqual(resp.code, constants.RESPONSE_CODE.OK);
                            assert.strictEqual(resp.message, constants.RESPONSE_MESSAGE.OK);
                            await ensurePageDoesNotExistsByUniqueKey(post3fixture);
                            done();
                        });
                });
        });
        it('get 404 on delete not existing post', function (done) {
            request(App)
                .delete(constants.POSTS_BASE_URL + "/56cb91bdc3464f14678934ca")
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