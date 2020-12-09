require('dotenv').config({ path: '.env.test' });
const assert = require('assert');
const ValidationErrorResponseSerializer = require('../../models/postModel').ValidationErrorResponseSerializer;
const TokenModelTest = require('../../models/tokenModel').Token;
const post3fixture = require('./../fixtures/posts').POST_3;
const constants = require('./../../constants/constants');
const utils = require('./../utils');
const {assertIsNull} = require("../utils");

describe('TokenModelTest model validation', function () {

    beforeEach(async function () {
        await utils.prepareDatabaseBeforeTest();
    });

    describe('validate required fields', function () {
        it('tokenModel/error',  async function () {
            let token = new TokenModelTest({});
            let err = null;
            try {
                await token.validate();
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