const assert = require('assert');
const Post = require('./../../../models/postModel').Post;

module.exports.ensurePageDoesNotExistsByUniqueKey = async function (page) {
    if (!page.uniqueKey) {
        throw 'uniqueKey is empty!';
    }
    await Post.findOne({uniqueKey: page.uniqueKey}).exec()
        .then(function(err, post){
            console.log(err);
            console.log(post);
        })
        .catch(err => assert.strictEqual(err, null));
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
        //console.log(err);
    }
    assert.strictEqual(err, null);
    if (!postFromDb){
        //console.log(page);
        //console.log(postFromDb);
    }
    assert.strictEqual(postFromDb !== null, true);
}