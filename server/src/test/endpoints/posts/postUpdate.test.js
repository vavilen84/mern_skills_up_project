require('dotenv').config({path: '.env.test'});
const assert = require('assert');
const utils = require('../../utils');
const app = require('../../../app').App;
const request = require('supertest');
const constants = require('./../../../constants/constants');
const {findPostByUniqueKey} = require('./base');
const post3fixture = require('../../fixtures/posts').POST_3;

describe(constants.USERS_BASE_URL, function () {

    beforeEach(function (done) {
        utils.beforeEach(done);
    });

    describe('POST ' + constants.POSTS_BASE_URL, function () {
        it('endpoints/posts/get 200 on update post',  function (done) {
            findPostByUniqueKey(post3fixture.uniqueKey)
                .then( function (post) {
                    const updatedUrl = 'updated_url';
                    post.url = updatedUrl;
                    request(app)
                        .post(constants.POSTS_BASE_URL+"/"+post.id)
                        .send(post)
                        .expect('Content-Type', /json/)
                        .expect(constants.RESPONSE_CODE.OK)
                        .end(async function (err, res) {
                            utils.assertIsNull(err);
                            const resp = JSON.parse(res.text);
                            let updatedPost = resp.data;
                            assert.strictEqual(resp.code, constants.RESPONSE_CODE.OK);
                            assert.strictEqual(resp.message, constants.RESPONSE_MESSAGE.OK);
                            assert.strictEqual(updatedPost.url, updatedUrl);
                            await findPostByUniqueKey(post3fixture.uniqueKey)
                                .then(post => assert.strictEqual(post.url, updatedUrl));
                            done();
                        });
                });
        });

        it('get 404 on update not existing post', function (done) {
            request(app)
                .post(constants.POSTS_BASE_URL + "/56cb91bdc3464f14678934ca")
                .send(post3fixture)
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