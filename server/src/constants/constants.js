module.exports.MONGOOSE_VALIDATION_ERR_KEY = 'ValidationError';

module.exports.USERS_COLLECTION_NAME = 'users';

module.exports.USERS_BASE_URL = '/api/v1/users';

module.exports.RESPONSE_CODE = {
    UNPROCESSABLE_ENTITY: 422,
    OK: 200,
    NOT_FOUND: 404,
    NOT_UNAUTHORIZED: 401,
    CREATED: 201,
    VALIDATION_ERROR: 400,
    SERVER_ERROR: 500
};

module.exports.RESPONSE_MESSAGE = {
    UNPROCESSABLE_ENTITY: 'Unprocessable entity',
    OK: 'OK',
    NOT_FOUND: 'Not found',
    NOT_UNAUTHORIZED: 'Unauthorized',
    CREATED: 'Created',
    VALIDATION_ERROR: 'Validation error',
    SERVER_ERROR: 'Server error'
};