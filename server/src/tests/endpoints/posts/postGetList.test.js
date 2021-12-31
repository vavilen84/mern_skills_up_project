const utils = require('../../utils');
const assert = require('assert');
const request = require('supertest');
const constants = require('./../../../constants/constants');
const postsFixtures = require('../../fixtures/posts');
const {App} = require("../../../utils/server");

describe(constants.USERS_BASE_URL, function () {

    beforeEach(function (done) {
        utils.beforeEach(done);
    });

    describe('GET ' + constants.POSTS_BASE_URL, function () {
        it('get 200 on get posts list', function (done) {
            request(App)
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