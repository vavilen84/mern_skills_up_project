const log = require('../../utils/logger')(module);
const response = require('../../utils/response');
const security = require('../../utils/security');
const User = require('../../models/userModel').User;
const ValidationErrorResponseSerializer = require('../../models/userModel').ValidationErrorResponseSerializer;
const constants = require('../../constants/constants');
const enums = require('../../enum/enum');

module.exports = function (app) {

    app.post(constants.USERS_BASE_URL+"/:username/authenticate", function (req, res) {

        let user = new User({
            username: req.body.username,
            scenario: enums.Scenarios.SCENARIO_AUTHENTICATE
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