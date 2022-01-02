const response = require('../../utils/response');
const constants = require('../../constants/constants');
const Post = require('../../models/postModel').Post;
const ValidationErrorResponseSerializer = require('../../models/postModel').ValidationErrorResponseSerializer;
const {populateFromRequestOnCreate, addAutoIncrement} = require("../../models/postModel");
const authMiddleware = require('./../../middleware/auth');
const {parseMultipartDataRequest} = require("../../utils/multipartBodyParser");
const {uploadImage} = require("../../utils/imageUploader");
const logger = require('./../../utils/logger')(module);

module.exports = function (app) {
    app.post(constants.POSTS_BASE_URL, authMiddleware, async function (req, res) {

        let body = null;
        try {
            body = await parseMultipartDataRequest(req);
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

        let post = new Post(populateFromRequestOnCreate(body.fields, image));
        try {
            await post.validate();
        } catch (err) {
            response.sendUnprocessableEntity(res, ValidationErrorResponseSerializer(err));
            return;
        }

        post.save()
            .then(post => {
                response.sendOK(res, post, constants.RESPONSE_MESSAGE.OK);
            })
            .catch(err => {
                logger.info(err);
                response.sendServerError(res);
            });

    });
};