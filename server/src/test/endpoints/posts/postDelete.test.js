require('dotenv').config({ path: '.env.test' });
const assert = require('assert');
const utils = require('../../utils');
const app = require('../../../app').App;
const request = require('supertest');
const log = require('../../../utils/logger')(module);
const constants = require('./../../../constants/constants');
const Post = require('./../../../models/postModel').Post;
const security = require('../../../utils/security');
const homePageFixture = require('../../fixtures/posts').HOME_PAGE;

describe(constants.USERS_BASE_URL, function (done) {

    beforeEach(async function (done) {
        await utils.prepareDatabaseBeforeTest(done);
    });

    describe('DELETE ' + constants.POSTS_BASE_URL, function () {
        it('get 200 on delete post', async function (done) {
            let postFromDb = await Post.findOne({uniqueKey: homePageFixture.uniqueKey}).exec();
            assert.notStrictEqual(postFromDb, null);

            request(app)
                .delete(constants.POSTS_BASE_URL)
                .send(homePageFixture)
                .expect('Content-Type', /json/)
                .expect(constants.RESPONSE_CODE.OK)
                .end(async function (err, res) {
                    const resp = JSON.parse(res.text);

                    let post = resp.data;
                    assert.strictEqual(resp.code, constants.RESPONSE_CODE.OK);
                    assert.strictEqual(resp.message, constants.RESPONSE_MESSAGE.OK);
                    assert.strictEqual(post.url, homePageFixture.url);
                    assert.strictEqual(post.uniqueKey, homePageFixture.uniqueKey);

                    let postFromDb = await Post.findOne({uniqueKey: homePageFixture.uniqueKey}).exec();
                    assert.strictEqual(postFromDb.url, homePageFixture.url);
                    assert.strictEqual(postFromDb.uniqueKey, homePageFixture.uniqueKey);

                    done();
                });
        });
    });

});