const RESPONSE_CODE = {
    UNPROCESSABLE_ENTITY: 422,
    OK: 200,
    CREATED: 201,
    VALIDATION_ERROR: 400,
    SERVER_ERROR: 500
};

const RESPONSE_MESSAGE = {
    UNPROCESSABLE_ENTITY: 'Unprocessable entity',
    OK: 'OK',
    CREATED: 'Created',
    VALIDATION_ERROR: 'Validation error',
    SERVER_ERROR: 'Server error'
};

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
    res.send(new Response(code, message, data));
}

module.exports.sendOK = function (res, data, message) {
    setDefaultRespHeaders(res);
    res.statusCode = RESPONSE_CODE.OK;
    res.send(new Response(RESPONSE_CODE.OK, message, data));
}

module.exports.sendUnprocessableEntity = function (res, errors) {
    send(res, RESPONSE_CODE.UNPROCESSABLE_ENTITY, errors, RESPONSE_MESSAGE.UNPROCESSABLE_ENTITY);
}

module.exports.sendCreated = function (res, user, url) {
    setDefaultRespHeaders(res);
    res.setHeader('Location', url)
    res.statusCode = RESPONSE_CODE.CREATED;
    res.send(new Response(RESPONSE_CODE.CREATED, RESPONSE_MESSAGE.CREATED, user));
}

module.exports.sendValidationError = function (res, err) {
    send(res, RESPONSE_CODE.VALIDATION_ERROR, err, RESPONSE_MESSAGE.VALIDATION_ERROR);
}

module.exports.sendServerError = function (res) {
    send(res, RESPONSE_CODE.SERVER_ERROR, null, RESPONSE_MESSAGE.SERVER_ERROR);
}

module.exports.RESPONSE_CODE = RESPONSE_CODE;

module.exports.RESPONSE_MESSAGE = RESPONSE_MESSAGE;

module.exports.send = send;