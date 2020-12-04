require('dotenv').config({ path: '.env.test' });
const assert = require('assert');
const ValidationErrorResponseSerializer = require('../../models/postModel').ValidationErrorResponseSerializer;
const PostModelTest = require('../../models/postModel').Post;
const post3fixture = require('./../fixtures/posts').POST_3;
const constants = require('./../../constants/constants');
const utils = require('./../utils');

describe('PostModelTest model validation', function () {

    beforeEach(function (done) {
        utils.prepareDatabaseBeforeTest(done);
    });

    describe('validate required fields', function () {
        it('postModel/error on empty: content/url', async function () {
            let post = new PostModelTest({});
            let err = null;
            try {
                await post.validate();
            } catch (err) {
                err = ValidationErrorResponseSerializer(err);
                assert.strictEqual(err.errors['url'], constants.VALIDATION_ERRORS.REQUIRED);
                assert.strictEqual(err.errors['content'], constants.VALIDATION_ERRORS.REQUIRED);
            }
            assert.notStrictEqual(err, true);
        });
        it('postModel/no error on not empty: url/content', async function () {
            let post = new PostModelTest({url:"uniqueUrl", content:"content"});
            let err = null;
            try {
                await post.validate();
            } catch (err) {
                err = ValidationErrorResponseSerializer(err);
                assert.notStrictEqual(err, false);
            }
            assert.notStrictEqual(err, false);
        });
    });

    describe('unique', function () {
        it('postModel/error on not unique uniqueKey/url',  async function () {
            let post = new PostModelTest({uniqueKey: post3fixture.uniqueKey, url:post3fixture.url});
            let err = null;
            try {
                await post.validate();
            } catch (err) {
                err = ValidationErrorResponseSerializer(err);
                assert.strictEqual(err.errors['uniqueKey'], constants.VALIDATION_ERRORS.UNIQUE);
                assert.strictEqual(err.errors['url'], constants.VALIDATION_ERRORS.UNIQUE);
            }
            assert.notStrictEqual(err, true);
        });
    });

});