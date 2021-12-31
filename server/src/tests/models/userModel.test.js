const assert = require('assert');
const ValidationErrorResponseSerializer = require('../../models/userModel').ValidationErrorResponseSerializer;
const UserModelTest = require('../../models/userModel').User;
const user1fixture = require('./../fixtures/users').USER_1;
const utils = require('./../utils');
const {logAndExit} = require("../utils");
const {assertObjHasProp} = require("../utils");
const {assertStringIsNotEmpty} = require("../utils");

describe('UserModelTest model validation', function () {

    beforeEach(function (done) {
        utils.beforeEach(done);
    });

    describe('validate required fields', function () {
        it('userModel/error on empty password/username', function (done) {
            (async function () {
                let user = new UserModelTest({});
                await user.validate()
                    .then(() => {
                        logAndExit('no validation error')
                    })
                    .catch((err) => {
                        const errors = ValidationErrorResponseSerializer(err);
                        assertObjHasProp(errors.errors, 'password');
                        assertObjHasProp(errors.errors, 'username');
                        done();
                    })
                    .catch((err) => {
                        logAndExit(err)
                    })
                ;
            })();
        });
        it('userModel/no errors', function (done) {
            (async function () {
                let user = new UserModelTest({username: "uniqueUsername"});
                user.set('password', 'string');
                await user.validate()
                    .then(() => {
                        done()
                    })
                    .catch((err) => {
                        logAndExit(err)
                    });
            })();
        });
        it('userModel/password is hashed', function (done) {
            let user = new UserModelTest({});
            const plainPassword = 'string';
            user.set('password', plainPassword);
            const hashedPassword = user.get('hashedPassword');
            assertStringIsNotEmpty(hashedPassword);
            assert.strictEqual(plainPassword !== hashedPassword, true);
            done();
        });
    });
    describe('unique username', function () {
        it('userModel/unique username', function (done) {
            (async function () {
                let user = new UserModelTest({username: user1fixture.username});
                await user.validate()
                    .then(() => {
                        logAndExit('should be validation error!')
                    })
                    .catch((err) => {
                        let errors = ValidationErrorResponseSerializer(err);
                        assertObjHasProp(errors.errors, 'username');
                        done();
                    })
                    .catch((err) => {
                        logAndExit(err)
                    });
            })();
        });
    });
});