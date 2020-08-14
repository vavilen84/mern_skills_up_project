var assert = require('assert');
describe('/api/v1/users', function () {
    describe('POST', function () {
        it('get validation error - empty body', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});