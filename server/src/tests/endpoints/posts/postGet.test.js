const utils = require('../../utils');
const assert = require('assert');
const request = require('supertest');
const constants = require('./../../../constants/constants');
const post3fixture = require('../../fixtures/posts').POST_3;
const {findPostByUniqueKey} = require('./base');
const {App} = require("../../../utils/server");
const log = require('./../../../utils/logger')(module);

describe(constants.USERS_BASE_URL, function () {

    beforeEach(function (done) {
        utils.beforeEach(done);
    });

    describe('GET ' + constants.POSTS_BASE_URL, function () {
        it('get 200 on get post', function (done) {
            findPostByUniqueKey(post3fixture.uniqueKey)
                .then(function (postFromDb) {
                    request(App)
                        .get(constants.POSTS_BASE_URL + "/" + postFromDb.url)
                        .expect('Content-Type', /json/)
                        .expect(constants.RESPONSE_CODE.OK)
                        .end(async function (err, res) {
                            utils.assertIsNull(err);
                            const resp = JSON.parse(res.text);
                            let post = resp.data;
                            assert.strictEqual(resp.code, constants.RESPONSE_CODE.OK);
                            assert.strictEqual(resp.message, constants.RESPONSE_MESSAGE.OK);
                            assert.strictEqual(post._id, postFromDb.id);
                            done();
                        });
                });
        });
        it('get 404 on get not existing post', function (done) {
            request(App)
                .get(constants.POSTS_BASE_URL + "/not_existing_url")
                .expect('Content-Type', /json/)
                .expect(constants.RESPONSE_CODE.NOT_FOUND)
                .end(async function (err, res) {
                    const resp = JSON.parse(res.text);
                    assert.strictEqual(resp.code, constants.RESPONSE_CODE.NOT_FOUND);
                    assert.strictEqual(resp.message, constants.RESPONSE_MESSAGE.NOT_FOUND);
                    done();
                });
        });
    });

});