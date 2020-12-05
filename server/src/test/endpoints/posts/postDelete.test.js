require('dotenv').config({path: '.env.test'});
const assert = require('assert');
const utils = require('../../utils');
const app = require('../../../app').App;
const request = require('supertest');
const log = require('../../../utils/logger')(module);
const constants = require('./../../../constants/constants');
const post3fixture = require('../../fixtures/posts').POST_3;
const homePageFixture = require('../../fixtures/posts').HOME_PAGE;
const {ensurePageExistsByUniqueKey, ensurePageDoesNotExistsByUniqueKey} = require('./base');

describe(constants.USERS_BASE_URL, function () {

    beforeEach(async function () {
        await utils.prepareDatabaseBeforeTest();
    });

    describe('DELETE ' + constants.POSTS_BASE_URL, function () {
        it('get 200 on delete post', async function () {
            ensurePageExistsByUniqueKey(post3fixture)
                .then(function () {
                    request(app)
                        .delete(constants.POSTS_BASE_URL)
                        .send(post3fixture)
                        .expect('Content-Type', /json/)
                        .expect(constants.RESPONSE_CODE.OK)
                        .end(async function (err, res) {
                            const resp = JSON.parse(res.text);
                            assert.strictEqual(resp.code, constants.RESPONSE_CODE.OK);
                            assert.strictEqual(resp.message, constants.RESPONSE_MESSAGE.OK);
                        });
                })
                .then(ensurePageDoesNotExistsByUniqueKey(post3fixture));
        });
        it('get 404 on delete not existing post', async function () {
            ensurePageDoesNotExistsByUniqueKey(homePageFixture)
                .then(function () {
                    request(app)
                        .delete(constants.POSTS_BASE_URL)
                        .send(homePageFixture)
                        .expect('Content-Type', /json/)
                        .expect(constants.RESPONSE_CODE.NOT_FOUND)
                        .end(async function (err, res) {
                            const resp = JSON.parse(res.text);
                            assert.strictEqual(resp.code, constants.RESPONSE_CODE.NOT_FOUND);
                            assert.strictEqual(resp.message, constants.RESPONSE_MESSAGE.NOT_FOUND);
                        });
                });
        });
    });

});