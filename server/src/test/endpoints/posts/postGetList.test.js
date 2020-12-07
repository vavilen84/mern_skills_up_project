require('dotenv').config({path: '.env.test'});
const assert = require('assert');
const utils = require('../../utils');
const app = require('../../../app').App;
const request = require('supertest');
const log = require('../../../utils/logger')(module);
const constants = require('./../../../constants/constants');
const postsFixtures = require('../../fixtures/posts');

describe(constants.USERS_BASE_URL, function () {

    beforeEach(async function () {
        await utils.prepareDatabaseBeforeTest();
    });

    describe('GET ' + constants.POSTS_BASE_URL, function () {
        it('get 200 on get posts list', function (done) {
            request(app)
                .get(constants.POSTS_BASE_URL)
                .expect('Content-Type', /json/)
                .expect(constants.RESPONSE_CODE.OK)
                .end(async function (err, res) {
                    utils.assertIsNull(err);
                    const resp = JSON.parse(res.text);
                    let posts = resp.data;
                    assert.strictEqual(posts.length, [postsFixtures.POST_1, postsFixtures.POST_2, postsFixtures.POST_3].length);
                    assert.strictEqual(resp.message, constants.RESPONSE_MESSAGE.OK);
                    done();
                });
        });
    });

});