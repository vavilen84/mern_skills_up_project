require('dotenv').config({ path: '.env.test' });
const assert = require('assert');
const utils = require('../../utils');
const app = require('../../../app').App;
const request = require('supertest');
const log = require('../../../utils/logger')(module);
const constants = require('./../../../constants/constants');
const user1fixture = require('../../fixtures/users').USER_1;

describe(constants.USERS_BASE_URL, function () {

    beforeEach(function (done) {
        utils.beforeEach(done);
    });

    describe('POST ' + constants.USERS_BASE_URL + "/:username/authenticate", function () {
        it('get 404 on authenticate', function (done) {
            request(app)
                .post(constants.USERS_BASE_URL+"/not_existing_username/authenticate")
                .send({username: "not_existing_username", password: "password"})
                .expect('Content-Type', /json/)
                .expect(constants.RESPONSE_CODE.NOT_FOUND)
                .end(function (err, res) {
                    assert.equal(err, null, err);
                    const resp = JSON.parse(res.text);
                    assert.strictEqual(resp.code, constants.RESPONSE_CODE.NOT_FOUND, JSON.stringify(res));
                    assert.strictEqual(resp.message, constants.RESPONSE_MESSAGE.NOT_FOUND, JSON.stringify(res));
                    done();
                });
        });
        it('get 422 on authenticate empty body request', function (done) {
            request(app)
                .post(constants.USERS_BASE_URL + "/"+user1fixture.username+"/authenticate")
                .expect('Content-Type', /json/)
                .expect(constants.RESPONSE_CODE.UNPROCESSABLE_ENTITY)
                .end(function (err, res) {
                    assert.equal(err, null, err);
                    const resp = JSON.parse(res.text);
                    assert.strictEqual(resp.code, constants.RESPONSE_CODE.UNPROCESSABLE_ENTITY);
                    assert.strictEqual(resp.message, constants.RESPONSE_MESSAGE.UNPROCESSABLE_ENTITY);
                    assert.strictEqual(res.text.includes('username is required'), true);
                    assert.strictEqual(res.text.includes('password is required'), true);
                    done();
                });
        });
        it('get 200 on authenticate', function (done) {
            request(app)
                .post(constants.USERS_BASE_URL+"/"+user1fixture.username+"/authenticate")
                .send({username: user1fixture.username, password: user1fixture.password})
                .expect('Content-Type', /json/)
                .expect(constants.RESPONSE_CODE.OK)
                .end(function (err, res) {
                    const resp = JSON.parse(res.text);
                    log.info(resp);
                    assert.strictEqual(resp.code, constants.RESPONSE_CODE.OK);
                    assert.strictEqual(resp.message, constants.RESPONSE_MESSAGE.OK);

                    let tokens = resp.data;
                    log.info(tokens);
                    assert.strictEqual(!!tokens.accessToken, true);
                    assert.strictEqual(!!tokens.refreshToken, true);
                    done();
                });
        });
    });

});