const utils = require('../../utils');
const assert = require('assert');
const request = require('supertest');
const constants = require('./../../../constants/constants');
const {App} = require("../../../utils/server");
const {Post} = require("../../../models/postModel");

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
                    let posts = resp.data.items;
                    let totalCount = await Post.collection.countDocuments();

                    assert.strictEqual(posts.length, constants.POST_ITEMS_LIMIT);
                    assert.strictEqual(resp.data.total_items_count, totalCount);
                    assert.strictEqual(resp.message, constants.RESPONSE_MESSAGE.OK);
                    done();
                });
        });
    });

});