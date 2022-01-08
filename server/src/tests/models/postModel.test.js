const assert = require('assert');
const ValidationErrorResponseSerializer = require('../../models/postModel').ValidationErrorResponseSerializer;
const PostModelTest = require('../../models/postModel').Post;
const post3fixture = require('./../fixtures/posts').POST_3;
const constants = require('./../../constants/constants');
const utils = require('./../utils');
const {logAndExit} = require("../utils");
const {Post} = require("../../models/postModel");

describe('PostModelTest model validation', function () {

    beforeEach( function (done) {
         utils.beforeEach(done);
    });

    describe('validate required fields', function () {
        it('check auto increment seq prop setup correct', function (done) {
            (async function () {
                let totalCount = await Post.collection.countDocuments();
                let post = new PostModelTest({url: "uniqueUrl", content: "content"});
                try {
                    await post.validate();
                } catch (err) {
                    logAndExit(err);
                }
                assert.equal(post.seq, 0); // default value
                try {
                    await post.save();
                } catch (err) {
                    logAndExit(err);
                }
                assert.equal(post.seq, totalCount+1); // increment
                let newSeq = post.seq;
                try {
                    await post.save();
                } catch (err) {
                    logAndExit(err);
                }
                assert.equal(post.seq, newSeq); // not changed on update
                done();
            })();
        });
    });

    describe('validate required fields', function () {
        it('postModel/errors on empty required fields', function (done) {
            (async function () {
                let post = new PostModelTest();
                await post.validate()
                    .then(() => {
                        logAndExit('no validation error')
                    })
                    .catch(function (err) {
                        err = ValidationErrorResponseSerializer(err);
                        assert.strictEqual(err.errors['url'], constants.VALIDATION_ERRORS.REQUIRED);
                        assert.strictEqual(err.errors['content'], constants.VALIDATION_ERRORS.REQUIRED);
                        done();
                    })
                    .catch((err) => {
                        logAndExit(err)
                    });
            })();
        });
        it('postModel/no error on not empty: url/content', function (done) {
            (async function () {
                let post = new PostModelTest({url: "uniqueUrl", content: "content"});
                await post.validate()
                    .then(() => {
                        done();
                    })
                    .catch(function (err) {
                        logAndExit(err)
                    });
            })();
        });
    });

    describe('unique', function () {
        it('postModel/error on not unique url', function (done) {
            (async function () {
                let post = new PostModelTest({url: post3fixture.url});
                await post.validate()
                    .then(() => {
                        logAndExit('no validation error')
                    })
                    .catch(function (err) {
                        err = ValidationErrorResponseSerializer(err);
                        assert.strictEqual(err.errors['url'], constants.VALIDATION_ERRORS.UNIQUE);
                        done();
                    })
                    .catch(function (err) {
                        logAndExit(err)
                    });
            })();
        });
    });
});