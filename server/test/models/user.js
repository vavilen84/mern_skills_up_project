require('dotenv').config();
let assert = require('assert');
let log = require('./../../src/libs/logger')(module);
let User = require('./../../src/models/user').User;
let enums = require('./../../src/enum/enum');

describe('User model validation', function () {

    describe('scenario create', function () {

        describe('password', function () {
            describe('required password validation', function () {
                it('error on empty password', function () {
                    let user = new User({});
                    user.set('scenario', enums.Models.SCENARIO_CREATE);
                    let errors = user.validateSync();
                    assert.notStrictEqual(errors.errors['hashedPassword'].message, true);
                });
                it('no error', function () {
                    let user = new User({});
                    user.set('scenario', enums.Models.SCENARIO_CREATE);
                    user.set('password', 'string');
                    let errors = user.validateSync();
                    assert.notStrictEqual(errors.errors['hashedPassword'], false);
                });
            });
            describe('hash password', function () {
                it('password is hashed', function () {
                    let user = new User({});
                    user.set('scenario', enums.Models.SCENARIO_CREATE);
                    const plainPassword = 'string';
                    user.set('password', plainPassword);
                    assert.strictEqual(plainPassword !== user.get('hashedPassword'), true);
                });
            });
        });

        describe('username', function () {
            describe('required username validation', function () {
                it('error on empty username', function () {
                    let user = new User({});
                    user.set('scenario', enums.Models.SCENARIO_CREATE);
                    let errors = user.validateSync();
                    assert.notStrictEqual(errors.errors['username'].message, true);
                });
                it('no error', function () {
                    let user = new User({});
                    user.set('scenario', enums.Models.SCENARIO_CREATE);
                    user.set('username', 'username');
                    let errors = user.validateSync();
                    assert.notStrictEqual(errors.errors['username'], false);
                });
            });
        });

    });

    describe('scenario update', function () {

        describe('password', function () {
            describe('required password validation', function () {
                it('error on empty password', function () {
                    let user = new User({});
                    user.set('scenario', enums.Models.SCENARIO_CREATE);
                    let errors = user.validateSync();
                    assert.notStrictEqual(errors.errors['hashedPassword'].message, true);
                });
                it('no error', function () {
                    let user = new User({});
                    user.set('scenario', enums.Models.SCENARIO_CREATE);
                    user.set('password', 'string');
                    let errors = user.validateSync();
                    assert.notStrictEqual(errors.errors['hashedPassword'], false);
                });
            });
            describe('hash password', function () {
                it('password is hashed', function () {
                    let user = new User({});
                    user.set('scenario', enums.Models.SCENARIO_CREATE);
                    const plainPassword = 'string';
                    user.set('password', plainPassword);
                    assert.strictEqual(plainPassword !== user.get('hashedPassword'), true);
                });
            });
        });

    });
});