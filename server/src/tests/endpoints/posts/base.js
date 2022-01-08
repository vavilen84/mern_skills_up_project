const Post = require('./../../../models/postModel').Post;
const {assertIsNull, assertIsObject} = require('./../../utils');

module.exports.ensurePostNotExists = async function (post) {
    await findPostById(post._id)
        .then(post => assertIsNull(post))
        .catch(err => assertIsNull(err));
}

module.exports.ensurePostExists = async function (post) {
    await findPostById(post._id)
        .then(post => assertIsObject(post))
        .catch(err => assertIsNull(err))
}

async function findPostById(id) {
    return await Post.findOne({_id: id}).exec();
}

async function findPostBUrl(url) {
    return await Post.findOne({url: url}).exec();
}

module.exports.findPostById = findPostById;
module.exports.findPostBUrl = findPostBUrl;