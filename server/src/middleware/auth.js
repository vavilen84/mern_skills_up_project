const uuid = require('uuid');
const response = require("../utils/response");
const {getAuthToken} = require("../utils/request");
const Token = require('./../models/tokenModel').Token;
const enums = require('../enum/enum');

module.exports = (req, res, next) => {
    const authToken = getAuthToken(req);
    if (!uuid.validate(authToken)) {
        response.sendUnauthorized(res);
        return;
    }
    Token.findOne({token: authToken, type: enums.TokenTypes.AUTH}).exec()
        .then((token) => {
            if (!token || (token.expiresAt < Date.now())) {
                response.sendUnauthorized(res);
                return;
            }
            next();
        })
        .catch((err) => {
            response.sendServerError(err)
        })
};