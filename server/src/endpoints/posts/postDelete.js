const response = require('../../utils/response');
const constants = require('../../constants/constants');
const Post = require('../../models/postModel').Post;
const logger = require('./../../utils/logger')(module);

module.exports = function (app) {

    app.delete(constants.POSTS_BASE_URL + "/:id", async function (req, res) {
        let post = await Post.findById(req.params.id).exec();
        if (!post) {
            response.sendNotFound(res);
            return;
        }
        post.remove()
            .then(function () {
                response.sendOK(res, null, "OK")
            }).catch(function (err) {
                console.log(err);
                response.sendServerError(res);
            });
    });

};