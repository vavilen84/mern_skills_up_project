const response = require('../../utils/response');
const constants = require('../../constants/constants');
const Post = require('../../models/postModel').Post;
const logger = require('./../../utils/logger')(module);

module.exports = function (app) {
    app.get(constants.POSTS_BASE_URL, async function (req, res) {
        let page = parseInt(req.query.page) || 1;
        let limit = 10;
        let skip = page === 1 ? 0 : (page - 1) * limit;
        let posts = [];
        let totalCount = 0;

        try {
            posts = await Post.find().sort({seq: -1}).skip(skip).limit(10).exec();
            logger.info(posts);
            totalCount = await Post.collection.countDocuments();
        } catch (err) {
            logger.info(err);
            response.sendServerError(res);
            return;
        }

        let data = {
            items: posts,
            total_count: totalCount
        };
        logger.info(posts);

        response.sendOK(res, data, constants.RESPONSE_MESSAGE.OK);
    });
};