require('dotenv').config({ path: '.env.test' });
const assert = require('assert');
const ValidationErrorResponseSerializer = require('../../models/postModel').ValidationErrorResponseSerializer;
const PostModelTest = require('../../models/postModel').Post;
const post1fixture = require('./../fixtures/posts').HOME_PAGE;

describe('PostModelTest model validation', function () {

    beforeEach(function (done) {
        done();
    });

    describe('validate required fields', function () {
        it('postModel/error on empty: url, content', function () {
            let post = new PostModelTest({});
            let errors = ValidationErrorResponseSerializer(post.validateSync());
            assert.notStrictEqual(errors.errors['url'], true);
            assert.notStrictEqual(errors.errors['content'], true);
        });
        it('postModel/no error on not empty: url, content', function () {
            let post = new PostModelTest({url: "/", content:"content"});
            let errors = ValidationErrorResponseSerializer(post.validateSync());
            assert.notStrictEqual(errors.errors, false);
        });
    });

    describe('uniqueKey', function () {
        it('postModel/no error on empty uniqueKey', function () {
            let post = new PostModelTest({});
            let errors = ValidationErrorResponseSerializer(post.validateSync());
            assert.notStrictEqual(errors.errors['uniqueKey'], false);
        });
        it('postModel/error on not unique uniqueKey', function () {
            let post = new PostModelTest({uniqueKey: post1fixture.uniqueKey});
            let errors = ValidationErrorResponseSerializer(post.validateSync());
            assert.notStrictEqual(errors.errors['uniqueKey'], true);
        });
    });

});