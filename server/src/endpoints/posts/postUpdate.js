const response = require('Utils/response');
const constants = require('Constants/constants');
const Post = require('Models/post').Post;
const enums = require('Enum/enum');

module.exports = function(app) {

    app.post(constants.POSTS_BASE_URL, async function (req, res) {

        let existingPost = null;
        if (req.body.id) {
            existingPost = await Post.findById(req.body.id).exec();
        }

        let postModel = new Post({
            id: req.body.id,
            image: req.body.image,
            uniqueKey: req.body.uniqueKey,
            greeting: req.body.greeting,
            content: req.body.content,
            status: req.body.status
        });




        const existingPost = Post.findById(req.params.id, function (err, doc){
            if (err) {
                response.sendServerError(res);
                return;
            }
            if (!doc) {
                response.sendNotFound(res)
            } else {
                response.sendOK(res, doc, "OK")
            }
        });
        post.set('username', req.body.username);
        post.set('password', req.body.password);

        let errors = user.validateSync();
        if (errors) {
            log.info(errors);
            response.sendUnprocessableEntity(res, ValidationErrorResponseSerializer(errors));
            return;
        }

        User.findOne({username:req.params.username}, function (err, doc){
            if (err) {
                response.sendServerError(res);
                return;
            }
            if (!doc) {
                response.sendNotFound(res)
            } else {
                if (security.checkPassword(user.password, doc.salt, doc.hashedPassword)) {
                    response.sendOK(res, security.generateAuthTokens(), "OK")
                    return;
                }
                response.sendUnauthorized(res)
            }
        });
    });

};