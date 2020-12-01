require('dotenv').config({ path: '.env.test' });
const assert = require('assert');
const ValidationErrorResponseSerializer = require('../../models/userModel').ValidationErrorResponseSerializer;
const UserModelTest = require('../../models/userModel').User;
const user1fixture = require('./../fixtures/users').USER_1;

describe('UserModelTest model validation', function () {

    beforeEach(function (done) {
        done();
    });

    describe('validate required fields', function () {
        it('userModel/error on empty password', function () {
            let user = new UserModelTest({});
            let errors = user.validateSync();
            assert.notStrictEqual(errors.errors['hashedPassword'].message, true);
        });
        it('userModel/no error on not empty password', function () {
            let user = new UserModelTest({});
            user.set('password', 'string');
            let errors = user.validateSync();
            assert.notStrictEqual(errors.errors['hashedPassword'], false);
        });
        it('userModel/password is hashed', function () {
            let user = new UserModelTest({});
            const plainPassword = 'string';
            user.set('password', plainPassword);
            assert.strictEqual(plainPassword !== user.get('hashedPassword'), true);
        });

        it('userModel/error on empty username', function () {
            let user = new UserModelTest({});
            let errors = user.validateSync();
            assert.notStrictEqual(errors.errors['username'].message, true);
        });
        it('userModel/no error on not empty username', function () {
            let user = new UserModelTest({});
            user.set('username', 'username');
            let errors = user.validateSync();
            assert.notStrictEqual(errors.errors['username'], false);
        });
    });

    describe('ValidationErrorResponseSerializer', function () {
        it('userModel/errors are serialized', function () {
            let user = new UserModelTest({});
            let errors = ValidationErrorResponseSerializer(user.validateSync());
            assert.notStrictEqual(errors.errors['username'], true);
            assert.notStrictEqual(errors.errors['password'], true);
        });

    });

    describe('unique username', function () {
        it('userModel/unique username', function () {
            let user = new UserModelTest({username: user1fixture.username});
            let errors = ValidationErrorResponseSerializer(user.validateSync());
            assert.notStrictEqual(errors.errors['username'], true);
        });
    });
});