const utils = require('../../utils');
utils.SetTestEnv();

const assert = require('assert');
const app = require('../../../app').App;
const request = require('supertest');
const log = require('../../../utils/logger')(module);
const constants = require('./../../../constants/constants');
const post3fixture = require('../../fixtures/posts').POST_3;
const {findPostByUniqueKey} = require('./base');

describe(constants.USERS_BASE_URL, function () {

    beforeEach(function (done) {
        utils.beforeEach(done);
    });

    describe('GET ' + constants.POSTS_BASE_URL, function () {
        it('get 200 on get post', function (done) {
            findPostByUniqueKey(post3fixture.uniqueKey)
                .then(function (postFromDb) {
                    request(app)
                        .get(constants.POSTS_BASE_URL + "/" + postFromDb.id)
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
            request(app)
                .get(constants.POSTS_BASE_URL + "/56cb91bdc3464f14678934ca")
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