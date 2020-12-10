const log = require('../../utils/logger')(module);
const response = require('../../utils/response');
const security = require('../../utils/security');
const User = require('../../models/userModel').User;
const ValidationErrorResponseSerializer = require('../../models/userModel').ValidationErrorResponseSerializer;
const constants = require('../../constants/constants');
const {generateTokens} = require("../../models/tokenModel");
const conn = require('./../../utils/mongoose').Db;

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
        }

        let existingUser = null;
        try {
            existingUser = await User.findOne({username: req.params.username}).exec();
        } catch (err) {
            response.sendServerError(res);
        }

        if (!existingUser) {
            response.sendNotFound(res);
        } else {
            if (security.checkPassword(user.password, existingUser.salt, existingUser.hashedPassword)) {

                let tokens = generateTokens();

                let session = null;
                try {
                    session = await conn.startSession();
                } catch (err) {
                    response.sendServerError(err);
                }
                if (!session) {
                    response.sendServerError('session is null');
                }

                session.startTransaction();

                try {

                    await tokens.accessToken.validate();
                    await tokens.accessToken.save();
                    await tokens.refreshToken.validate();
                    await tokens.refreshToken.save();

                } catch(err) {

                    try {
                        await session.abortTransaction();
                    } catch(abortTxnErr) {
                        session.endSession();
                        response.sendServerError(abortTxnErr);
                    }

                    response.sendServerError(err);
                    session.endSession();
                }

                await session.commitTransaction();
                session.endSession();

                response.sendOK(res, tokens, constants.RESPONSE_MESSAGE.OK)
            }
            response.sendUnauthorized(res)
        }
    });
};