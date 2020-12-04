const assert = require('assert');
const securityTest = require('../../utils/security');

describe('libs', function () {
    describe('securityTest', function () {
        it('generate auth tokens', function (done) {
            let tokens = securityTest.generateAuthTokens();
            assert.strictEqual(tokens.accessToken.length > 0, true);
            assert.strictEqual(tokens.refreshToken.length > 0, true);
            assert.strictEqual(tokens.refreshToken !== tokens.accessToken, true);
            done();
        });
    });
});