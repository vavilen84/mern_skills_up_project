require('dotenv').config({ path: '.env.test' });
const assert = require('assert');
const log = require('../../utils/logger')(module);
const UserModelTest = require('../../models/userModel').User;
const enums = require('../../enum/enum');
const utils = require('../utils');


describe('UserModelTest model validation', function () {

    beforeEach(function (done) {
        done();
    });

    describe('scenario authenticate', function () {

        describe('validate password on authenticate', function () {
            describe('required password validation', function () {
                it('error on empty password', function () {
                    let user = new UserModelTest({});
                    user.set('scenario', enums.Scenarios.SCENARIO_AUTHENTICATE);
                    let errors = user.validateSync();
                    //console.log(errors);
                    assert.notStrictEqual(errors.errors['hashedPassword'].message, true);
                });
                it('no error', function () {
                    let user = new UserModelTest({});
                    user.set('scenario', enums.Scenarios.SCENARIO_AUTHENTICATE);
                    user.set('password', 'string');
                    let errors = user.validateSync();
                    assert.notStrictEqual(errors.errors['hashedPassword'], false);
                });
            });
            describe('hash password', function () {
                it('password is hashed', function () {
                    let user = new UserModelTest({});
                    user.set('scenario', enums.Scenarios.SCENARIO_AUTHENTICATE);
                    const plainPassword = 'string';
                    user.set('password', plainPassword);
                    assert.strictEqual(plainPassword !== user.get('hashedPassword'), true);
                });
            });
        });

        describe('validate username on authenticate', function () {
            describe('required username validation', function () {
                it('error on empty username', function () {
                    let user = new UserModelTest({});
                    user.set('scenario', enums.Scenarios.SCENARIO_AUTHENTICATE);
                    let errors = user.validateSync();
                    assert.notStrictEqual(errors.errors['username'].message, true);
                });
                it('no error', function () {
                    let user = new UserModelTest({});
                    user.set('scenario', enums.Scenarios.SCENARIO_AUTHENTICATE);
                    user.set('username', 'username');
                    let errors = user.validateSync();
                    assert.notStrictEqual(errors.errors['username'], false);
                });
            });
        });

    });
});