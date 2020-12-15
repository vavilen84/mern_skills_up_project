const response = require('../../utils/response');
const constants = require('../../constants/constants');
const Post = require('../../models/postModel').Post;
const ValidationErrorResponseSerializer = require('../../models/postModel').ValidationErrorResponseSerializer;
const {populateFromRequestOnCreate} = require("../../models/postModel");
const authMiddleware = require('./../../middleware/auth');
const logger = require('./../../utils/logger')(module);
const fs = require('fs');
const formidable = require('formidable');
const path = require('path');

module.exports = function (app) {
    app.post(constants.POSTS_BASE_URL, authMiddleware, async function (req, res) {
        const form = formidable({multiples: true, uploadDir: process.env.UPLOADS_PATH});
        form.parse(req, async (err, fields, files) => {

            if (err) {
                logger.info(err);
                response.sendServerError(res)
                return;
            }

            let image = null;
            if (files && files.image) {
                if (!fs.existsSync(files.image.path)) {
                    logger.info('image file is not saved');
                    response.sendServerError(res)
                    return;
                }
                let newFilename = files.image.path + path.extname(files.image.name);
                fs.renameSync(files.image.path, newFilename);
                if (!fs.existsSync(newFilename)) {
                    logger.info('image file is not saved correctly');
                    response.sendServerError(res)
                    return;
                }

                let pathArr = newFilename.split('/');
                image = pathArr[pathArr.length - 1];
            }

            let post = new Post(populateFromRequestOnCreate(fields, image));
            try {
                await post.validate();
            } catch (err) {
                response.sendUnprocessableEntity(res, ValidationErrorResponseSerializer(err));
                return;
            }

            post.save()
                .then(post => {
                    response.sendOK(res, post, constants.RESPONSE_MESSAGE.OK)
                })
                .catch(err => {
                    logger.info(err);
                    response.sendServerError(res)
                });
        });

    });
};