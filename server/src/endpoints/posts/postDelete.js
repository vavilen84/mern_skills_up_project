const response = require('../../utils/response');
const constants = require('../../constants/constants');
const Post = require('../../models/postModel').Post;
const logger = require('./../../utils/logger')(module);
const authMiddleware = require('./../../middleware/auth');

module.exports = function (app) {
    app.delete(constants.POSTS_BASE_URL + "/:id", authMiddleware, async function (req, res) {
        let post = null;
        try {
            post = await Post.findById(req.params.id).exec();
        } catch (err) {
            logger.info(err);
            response.sendServerError(res);
            return;
        }
        if (!post) {
            response.sendNotFound(res);
            return;
        }
        post.remove()
            .then(function () {
                response.sendOK(res, null, constants.RESPONSE_MESSAGE.OK)
            })
            .catch(function (err) {
                logger.info(err);
                response.sendServerError(res);
            });
    });
};