require('dotenv').config({ path: '.env.test' });
const assert = require('assert');
const utils = require('../utils');
const app = require('../../app').App;
const request = require('supertest');
const log = require('./../../libs/logger')(module);
const constants = require('./../../constants/constants');

describe(constants.USERS_BASE_URL, function () {

    beforeEach(function() {
        utils.prepareDatabaseBeforeTest();
    });

    describe('POST', function () {
        it('get 422 on empty body request', function () {
            request(app)
                .post(constants.USERS_BASE_URL)
                .expect('Content-Type', /json/)
                .expect(422)
                .end(function(err, res) {
                    if (err) throw err;
                    const resp = JSON.parse(res.text);
                    log.info(res.text);
                    assert.strictEqual(resp.code, constants.RESPONSE_CODE.UNPROCESSABLE_ENTITY);
                    assert.strictEqual(resp.message, constants.RESPONSE_MESSAGE.UNPROCESSABLE_ENTITY);
                    assert.strictEqual(res.text.includes('username is required'), true);
                    assert.strictEqual(res.text.includes('password is required'), true);
                    assert.strictEqual(res.text.includes('salt'), false);
                    assert.strictEqual(res.text.includes('hashedPassword'), false);
                });
        });
    });
});