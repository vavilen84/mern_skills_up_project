const response = require('../../utils/response');
const constants = require('../../constants/constants');
const Post = require('../../models/postModel').Post;

module.exports = function(app) {

    app.get(constants.POSTS_BASE_URL+"/:id", function (req, res) {
        Post.findById(req.params.id, function (err, doc){
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
    });

};