const response = require('../../utils/response');
const constants = require('../../constants/constants');
const Post = require('../../models/postModel').Post;
const logger = require('./../../utils/logger')(module);

module.exports = function (app) {
    app.get(constants.POSTS_BASE_URL + "/:url", async function (req, res) {
        let post = null;
        try {
            post = await Post.findOne({url: req.params.url}).exec();
        } catch (err) {
            logger.info(err);
            response.sendServerError(res);
            return;
        }
        if (!post) {
            response.sendNotFound(res);
            return;
        }
        response.sendOK(res, post, constants.RESPONSE_MESSAGE.OK);
    });
};