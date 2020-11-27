const response = require('Utils/response');
const constants = require('Constants/constants');
const Post = require('Models/post').Post;

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