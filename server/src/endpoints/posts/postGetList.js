const response = require('../../utils/response');
const constants = require('../../constants/constants');
const Post = require('../../models/postModel').Post;

module.exports = function(app) {

    app.get(constants.POSTS_BASE_URL, function (req, res) {
        Post.find({}, function (err, docs){
            if (err) {
                response.sendServerError(res);
                return;
            }
            response.sendOK(res, docs, "OK");
        });
    });

};