const response = require('Utils/response');
const constants = require('Constants/constants');
const Post = require('Models/post').Post;
const ValidationErrorResponseSerializer = require('Models/post').ValidationErrorResponseSerializer;
const enums = require('Enum/enum');

module.exports = function(app) {

    app.post(constants.POSTS_BASE_URL, async function (req, res) {

        let post = new Post({
            image: req.body.image || null,
            uniqueKey: req.body.uniqueKey || null,
            url: req.body.url || null,
            title: req.body.title || null,
            relatedPostIds: req.body.relatedPostIds || [],
            tags: req.body.tags || [],
            keywords: req.body.keywords || null,
            description: req.body.description || null,
            greeting: req.body.greeting || null,
            content: req.body.content || null,
            status: req.body.status || enums.PostStatuses.ACTIVE
        });

        let errors = post.validateSync();
        if (errors) {
            log.info(errors);
            response.sendUnprocessableEntity(res, ValidationErrorResponseSerializer(errors));
            return;
        }
        post.save(function (err) {
            if (err) {
                response.sendServerError(res);
                return;
            }
            response.sendOK(res, post, "OK")
        });
    });

};