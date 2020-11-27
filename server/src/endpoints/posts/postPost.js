const response = require('Libs/response');
const constants = require('Constants/constants');
const Post = require('Models/post').Post;
const enums = require('Enum/enum');

module.exports = function(app) {

    app.post(constants.POSTS_BASE_URL, function (req, res) {

        let post = new Post({
            scenario: enums.Models.SCENARIO_AUTHENTICATE
        });

        user.set('username', req.body.username);
        user.set('password', req.body.password);

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