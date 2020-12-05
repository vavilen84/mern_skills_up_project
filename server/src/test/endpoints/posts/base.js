const assert = require('assert');
const Post = require('./../../../models/postModel').Post;

module.exports.ensurePageDoesNotExistsByUniqueKey = async function (page) {
    if (!page.uniqueKey) {
        throw 'uniqueKey is empty!';
    }
    let postFromDb = null;
    let err = null;
    try {
        postFromDb = await Post.findOne({uniqueKey: page.uniqueKey}).exec();
    } catch (err) {
        console.log(err);
    }
    assert.strictEqual(err, null);
    assert.strictEqual(postFromDb, null);
}

module.exports.ensurePageExistsByUniqueKey = async function (page) {
    if (!page.uniqueKey) {
        throw 'uniqueKey is empty!';
    }
    let postFromDb = null;
    let err = null;
    try {
        postFromDb = await Post.findOne({uniqueKey: page.uniqueKey}).exec();
    } catch (err) {
        console.log(err);
    }
    assert.strictEqual(err, null);
    assert.strictEqual(postFromDb !== null, true);
}