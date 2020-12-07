require('dotenv').config({path: '.env.test'});
const assert = require('assert');
const utils = require('../../utils');
const app = require('../../../app').App;
const request = require('supertest');
const log = require('../../../utils/logger')(module);
const constants = require('./../../../constants/constants');
const post3fixture = require('../../fixtures/posts').POST_3;
const {ensurePageExistsByUniqueKey, ensurePageDoesNotExistsByUniqueKey, findPostByUniqueKey} = require('./base');

describe(constants.USERS_BASE_URL, function () {

    beforeEach(async function () {
        await utils.prepareDatabaseBeforeTest();
    });

    describe('DELETE ' + constants.POSTS_BASE_URL, function () {
        it('get 200 on delete post', function (done) {
            ensurePageExistsByUniqueKey(post3fixture)
                .then(() => findPostByUniqueKey(post3fixture.uniqueKey))
                .then(function (post) {
                    request(app)
                        .delete(constants.POSTS_BASE_URL + "/" + post.id)
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
            request(app)
                .delete(constants.POSTS_BASE_URL+"/56cb91bdc3464f14678934ca")
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