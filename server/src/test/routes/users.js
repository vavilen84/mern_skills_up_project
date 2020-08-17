const assert = require('assert');
const utils = require('../utils');
const app = require('../../app').App;
const request = require('supertest');
const log = require('./../../libs/logger')(module);
const constants = require('./../../constants/constants');
const User = require('./../../models/user').User;
const security = require('./../../libs/security');

describe(constants.USERS_BASE_URL, function () {

    beforeEach(function() {
        utils.prepareDatabaseBeforeTest();
    });

    describe('POST', function () {
        it('get 422 on empty body request', function () {
            request(app)
                .post(constants.USERS_BASE_URL)
                .expect('Content-Type', /json/)
                .expect(constants.RESPONSE_CODE.UNPROCESSABLE_ENTITY)
                .end(function (err, res) {
                    if (err) throw err;
                    const resp = JSON.parse(res.text);
                    //log.info(res.text);
                    assert.strictEqual(resp.code, constants.RESPONSE_CODE.UNPROCESSABLE_ENTITY);
                    assert.strictEqual(resp.message, constants.RESPONSE_MESSAGE.UNPROCESSABLE_ENTITY);
                    assert.strictEqual(res.text.includes('username is required'), true);
                    assert.strictEqual(res.text.includes('password is required'), true);
                    assert.strictEqual(res.text.includes('salt'), false);
                    assert.strictEqual(res.text.includes('hashedPassword'), false);
                });
        });
        it('get 201 on valid request body', function () {
            request(app)
                .post(constants.USERS_BASE_URL)
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send({username: "username", password: "password"})
                .expect('Content-Type', /json/)
                .expect(constants.RESPONSE_CODE.CREATED)
                .end(function (err, res) {
                    if (err) throw err;
                    const resp = JSON.parse(res.text);
                    log.info(res.text);
                    assert.strictEqual(resp.code, constants.RESPONSE_CODE.CREATED);
                    assert.strictEqual(resp.message, constants.RESPONSE_MESSAGE.CREATED);
                    assert.strictEqual(res.text.includes('username is required'), false);
                    assert.strictEqual(res.text.includes('password is required'), false);
                    assert.strictEqual(res.text.includes('salt'), false);
                    assert.strictEqual(res.text.includes('hashedPassword'), false);

                    User.findOne({username: 'username'}, function(err, doc){
                        assert.strictEqual(doc.username, 'username');
                        assert.strictEqual(security.checkPassword('password', doc.salt, doc.hashedPassword), true);
                    });

                });
        });
    });
});