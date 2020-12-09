require('dotenv').config({path: '.env.test'});
const assert = require('assert');
const ValidationErrorResponseSerializer = require('../../models/postModel').ValidationErrorResponseSerializer;
const PostModelTest = require('../../models/postModel').Post;
const post3fixture = require('./../fixtures/posts').POST_3;
const constants = require('./../../constants/constants');
const utils = require('./../utils');
const {logAndExit} = require("../utils");

describe('PostModelTest model validation', function () {

    beforeEach(function (done) {
        utils.beforeEach(done);
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
        it('postModel/error on not unique uniqueKey/url', function (done) {
            (async function () {
                let post = new PostModelTest({uniqueKey: post3fixture.uniqueKey, url: post3fixture.url});
                await post.validate()
                    .then(() => {
                        logAndExit('no validation error')
                    })
                    .catch(function (err) {
                        err = ValidationErrorResponseSerializer(err);
                        assert.strictEqual(err.errors['uniqueKey'], constants.VALIDATION_ERRORS.UNIQUE);
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