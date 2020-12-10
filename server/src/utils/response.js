const constants = require('../constants/constants');

function Response(code, message, data) {
    this.code = code;
    this.message = message;
    this.data = data;
}

function setDefaultRespHeaders(res) {
    res.setHeader("Cache-control", "no-cache, no-store, must-revalidate")
    res.setHeader("Content-Type", "application/json; charset=UTF-8")
}

function send(res, code, data, message) {
    setDefaultRespHeaders(res);
    res.statusCode = code;
    res.end(new Response(code, message, data));
}

module.exports.sendNotFound = function (res) {
    setDefaultRespHeaders(res);
    res.statusCode = constants.RESPONSE_CODE.NOT_FOUND;
    res.end(new Response(constants.RESPONSE_CODE.NOT_FOUND, constants.RESPONSE_MESSAGE.NOT_FOUND));
}

module.exports.sendUnauthorized = function (res) {
    setDefaultRespHeaders(res);
    res.statusCode = constants.RESPONSE_CODE.NOT_FOUND;
    res.end(new Response(constants.RESPONSE_CODE.NOT_FOUND, constants.RESPONSE_MESSAGE.NOT_FOUND));
}

module.exports.sendForbidden = function (res) {
    setDefaultRespHeaders(res);
    res.statusCode = constants.RESPONSE_CODE.FORBIDDEN;
    res.end(new Response(constants.RESPONSE_CODE.FORBIDDEN, constants.RESPONSE_MESSAGE.FORBIDDEN));
}

module.exports.sendOK = function (res, data, message) {
    setDefaultRespHeaders(res);
    res.statusCode = constants.RESPONSE_CODE.OK;
    res.end(new Response(constants.RESPONSE_CODE.OK, message, data));
}

module.exports.sendUnprocessableEntity = function (res, errors) {
    send(
        res,
        constants.RESPONSE_CODE.UNPROCESSABLE_ENTITY,
        errors,
        constants.RESPONSE_MESSAGE.UNPROCESSABLE_ENTITY
    );
}

module.exports.sendCreated = function (res, user, url) {
    setDefaultRespHeaders(res);
    res.setHeader('Location', url)
    res.statusCode = constants.RESPONSE_CODE.CREATED;
    res.end(
        new Response(
            constants.RESPONSE_CODE.CREATED,
            constants.RESPONSE_MESSAGE.CREATED,
            user
        )
    );
}

module.exports.sendValidationError = function (res, err) {
    send(
        res,
        constants.RESPONSE_CODE.VALIDATION_ERROR,
        err,
        constants.RESPONSE_MESSAGE.VALIDATION_ERROR
    );
}

module.exports.sendServerError = function (res) {
    send(
        res,
        constants.RESPONSE_CODE.SERVER_ERROR,
        null,
        constants.RESPONSE_MESSAGE.SERVER_ERROR
    );
}

module.exports.send = send;