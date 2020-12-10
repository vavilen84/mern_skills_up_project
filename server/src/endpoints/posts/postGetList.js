const response = require('../../utils/response');
const constants = require('../../constants/constants');
const Post = require('../../models/postModel').Post;
const logger = require('./../../utils/logger')(module);

module.exports = function (app) {
    app.get(constants.POSTS_BASE_URL, async function (req, res) {
        let posts = [];
        try {
            posts = await Post.find({}).exec();
        } catch (err) {
            logger.info(err);
            response.sendServerError(res);
            return;
        }
        response.sendOK(res, posts, constants.RESPONSE_MESSAGE.OK);
    });
};