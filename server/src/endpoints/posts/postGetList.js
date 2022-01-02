const response = require('../../utils/response');
const constants = require('../../constants/constants');
const {POST_ITEMS_LIMIT} = require("../../constants/constants");
const Post = require('../../models/postModel').Post;
const logger = require('./../../utils/logger')(module);

module.exports = function (app) {
    app.get(constants.POSTS_BASE_URL, async function (req, res) {
        let page = parseInt(req.query.page) || 1;
        let skip = page === 1 ? 0 : (page - 1) * POST_ITEMS_LIMIT;
        let posts = [];
        let totalItemsCount = 0;
        let totalPagesCount = 0;

        try {
            posts = await Post.find().sort({seq: -1}).skip(skip).limit(POST_ITEMS_LIMIT).exec();
            logger.info(posts);
            totalItemsCount = await Post.collection.countDocuments();
            totalPagesCount = Math.ceil(totalItemsCount/POST_ITEMS_LIMIT);
        } catch (err) {
            logger.info(err);
            response.sendServerError(res);
            return;
        }

        let data = {
            items: posts,
            total_items_count: totalItemsCount,
            total_pages_count: totalPagesCount
        };
        logger.info(posts);

        response.sendOK(res, data, constants.RESPONSE_MESSAGE.OK);
    });
};