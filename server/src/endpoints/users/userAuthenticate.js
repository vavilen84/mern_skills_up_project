const logger = require('../../utils/logger')(module);
const response = require('../../utils/response');
const security = require('../../utils/security');
const User = require('../../models/userModel').User;
const ValidationErrorResponseSerializer = require('../../models/userModel').ValidationErrorResponseSerializer;
const constants = require('../../constants/constants');
const {createTokens} = require("../../models/tokenModel");

module.exports = function (app) {
    app.post(constants.USERS_BASE_URL + "/:username/authenticate", async function (req, res) {
        let user = new User({
            username: req.body.username
        });
        user.set('password', req.body.password);
        try {
            await user.validate();
        } catch (err) {
            response.sendUnprocessableEntity(res, ValidationErrorResponseSerializer(err));
            return;
        }
        let existingUser = null;
        try {
            existingUser = await User.findOne({username: req.params.username}).exec();
        } catch (err) {
            logger.info(err);
            response.sendServerError(res);
            return;
        }
        if (!existingUser) {
            response.sendNotFound(res);
            return;
        }
        if (!security.checkPassword(user.password, existingUser.salt, existingUser.hashedPassword)) {
            response.sendUnauthorized(res);
            return;
        }
        let tokens = null;
        try {
            tokens = await createTokens();
        } catch (err) {
            logger.info(err);
            response.sendServerError(res);
            return;
        }
        response.sendOK(res, tokens, constants.RESPONSE_MESSAGE.OK)
    });
};