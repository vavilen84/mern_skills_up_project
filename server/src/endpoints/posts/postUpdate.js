const response = require('../../utils/response');
const constants = require('../../constants/constants');
const Post = require('../../models/postModel').Post;
const ValidationErrorResponseSerializer = require('../../models/postModel').ValidationErrorResponseSerializer;
const logger = require('./../../utils/logger')(module);
const authMiddleware = require('./../../middleware/auth');
const {populateFromRequestOnUpdate} = require("../../models/postModel");
const {parseMultipartDataRequest} = require("../../utils/multipartBodyParser");
const {uploadImage} = require("../../utils/imageUploader");

module.exports = function (app) {
    app.post(constants.POSTS_BASE_URL + "/:id", authMiddleware, async function (req, res) {

        let body = null;
        try {
            body = await parseMultipartDataRequest(req);
        } catch (err) {
            logger.info(err);
            response.sendServerError(res);
            return;
        }

        let post = null;
        try {
            post = await Post.findById(req.params.id).exec();
        } catch (err) {
            logger.info(err);
            response.sendServerError(res);
            return;
        }

        let image = null;
        if (body.files.hasOwnProperty('image')) {
            try {
                image = await uploadImage(body.files.image);
            } catch (err) {
                logger.info(err);
                response.sendServerError(res);
                return;
            }
        }

        if (!post) {
            response.sendNotFound(res);
            return;
        }

        post = populateFromRequestOnUpdate(body.fields, post);
        try {
            await post.validate();
        } catch (err) {
            response.sendUnprocessableEntity(res, ValidationErrorResponseSerializer(err));
            return;
        }
        try {
            await post.save();
        } catch (err) {
            logger.info(err);
            response.sendServerError(res);
            return;
        }
        response.sendOK(res, post, constants.RESPONSE_MESSAGE.OK);
    });
};