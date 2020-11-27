const response = require('Utils/response');
const constants = require('Constants/constants');
const Post = require('Models/post').Post;
const ValidationErrorResponseSerializer = require('Models/post').ValidationErrorResponseSerializer;

module.exports = function(app) {

    app.post(constants.POSTS_BASE_URL + "/:id", async function (req, res) {

        let post = await Post.findById(id).exec();
        if (!post) {
            response.sendNotFound(res);
            return;
        }

        post.image = req.body.image || post.image;
        post.uniqueKey = req.body.uniqueKey || post.uniqueKey;
        post.url = req.body.url || post.url;
        post.title = req.body.title || post.title;
        post.relatedPostIds = req.body.relatedPostIds || post.relatedPostIds;
        post.tags = req.body.tags || post.tags;
        post.keywords = req.body.keywords || post.keywords;
        post.description = req.body.description || post.description;
        post.greeting = req.body.greeting || post.greeting;
        post.content = req.body.content || post.content;
        post.status = req.body.status || post.status;
        post.updated = Date.now();

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