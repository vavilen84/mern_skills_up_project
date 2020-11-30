const assert = require('assert');
const security = require('../../utils/security');

describe('libs', function () {
    describe('security', function () {
        it('generate auth tokens', function (done) {
            let tokens = security.generateAuthTokens();
            assert.strictEqual(tokens.accessToken.length > 0, true);
            assert.strictEqual(tokens.refreshToken.length > 0, true);
            assert.strictEqual(tokens.refreshToken != tokens.accessToken, true);
            done();
        });
    });
});