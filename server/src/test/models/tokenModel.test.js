require('dotenv').config({path: '.env.test'});
const assert = require('assert');
const ValidationErrorResponseSerializer = require('../../models/tokenModel').ValidationErrorResponseSerializer;
const TokenModelTest = require('../../models/tokenModel').Token;
const constants = require('./../../constants/constants');
const utils = require('./../utils');
const {logAndExit} = require("../utils");
const uuid = require('uuid');
const enums = require("../../enum/enum");
const {createTokens} = require("../../models/tokenModel");

describe('TokenModelTest model validation', function () {

    beforeEach(function (done) {
        utils.beforeEach(done);
    });

    describe('createTokens', function () {
        it('create tokens successfully', function (done) {
            createTokens()
                .then((tokens) => {
                    assert.strictEqual(tokens.accessToken instanceof TokenModelTest, true);
                    assert.strictEqual(tokens.refreshToken instanceof TokenModelTest, true);
                    done();
                })
                .catch(err => logAndExit(err));
        });
    });

    describe('validate', function () {
        it('tokenModel/error on empty required fields', function (done) {
            (async function () {
                const token = new TokenModelTest({});
                await token.validate()
                    .then(() => {
                        logAndExit('should be validation errors!')
                    })
                    .catch((err) => {
                        err = ValidationErrorResponseSerializer(err);
                        assert.strictEqual(err.errors['token'], constants.VALIDATION_ERRORS.REQUIRED);
                        assert.strictEqual(err.errors['type'], constants.VALIDATION_ERRORS.REQUIRED);
                        assert.strictEqual(err.errors['type'], constants.VALIDATION_ERRORS.REQUIRED);
                        done();
                    }).catch((err) => {
                        logAndExit(err)
                    });
            })();
        });
        it('tokenModel/no error', function (done) {
            (async function () {
                const token = new TokenModelTest({
                    token: uuid.v4(),
                    type: enums.TokenTypes.REFRESH,
                    expiresAt: Date.now()
                });
                await token.validate()
                    .then(() => {
                        done();
                    })
                    .catch((err) => {
                        logAndExit(err)
                    });
            })();
        });
        it('tokenModel/error on not valid uuid v4 token', function (done) {
            (async function () {
                const token = new TokenModelTest({token: "not_valid_token_format"});
                await token.validate()
                    .then(() => {
                        logAndExit('should be validation errors!')
                    })
                    .catch((err) => {
                        err = ValidationErrorResponseSerializer(err);
                        assert.strictEqual(err.errors['token'], constants.VALIDATION_ERRORS.UUID);
                        done();
                    }).catch((err) => {
                        logAndExit(err)
                    });
            })();
        });
    });
});