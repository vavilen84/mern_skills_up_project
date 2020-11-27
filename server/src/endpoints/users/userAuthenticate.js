const log = require('Utils/logger')(module);
const response = require('Utils/response');
const security = require('Utils/security');
const User = require('Models/user').User;
const ValidationErrorResponseSerializer = require('Models/user').ValidationErrorResponseSerializer;
const constants = require('Constants/constants');
const enums = require('Enum/enum');

module.exports = function (app) {

    app.post(constants.USERS_BASE_URL+"/:username/authenticate", function (req, res) {

        let user = new User({
            username: req.body.username,
            scenario: enums.Models.SCENARIO_AUTHENTICATE
        });

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