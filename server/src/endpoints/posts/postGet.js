const response = require('Libs/response');
const constants = require('Constants/constants');
const Post = require('Models/post').Post;
const enums = require('Enum/enum');

module.exports = function(app) {

    app.get(constants.POSTS_BASE_URL+"/:id", function (req, res) {
        Post.findById({username:req.params.username}, function (err, doc){
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