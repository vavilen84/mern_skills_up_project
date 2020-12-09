module.exports.MONGOOSE_VALIDATION_ERR_KEY = 'ValidationError';

module.exports.USERS_COLLECTION_NAME = 'users';
module.exports.POSTS_COLLECTION_NAME = 'posts';


module.exports.USER_MODEL_NAME = 'user';
module.exports.POST_MODEL_NAME = 'post';

module.exports.USERS_BASE_URL = '/api/v1/users';
module.exports.POSTS_BASE_URL = '/api/v1/posts';

module.exports.RESPONSE_CODE = {
    UNPROCESSABLE_ENTITY: 422,
    OK: 200,
    NOT_FOUND: 404,
    NOT_UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    CREATED: 201,
    VALIDATION_ERROR: 400,
    SERVER_ERROR: 500
};

module.exports.RESPONSE_MESSAGE = {
    UNPROCESSABLE_ENTITY: 'Unprocessable entity',
    OK: 'OK',
    NOT_FOUND: 'Not found',
    NOT_UNAUTHORIZED: 'Unauthorized',
    FORBIDDEN: 'Forbidden',
    CREATED: 'Created',
    VALIDATION_ERROR: 'Validation error',
    SERVER_ERROR: 'Server error'
};

module.exports.VALIDATION_ERRORS = {
    UUID: "field data is not valid uuid",
    UNIQUE: "field should be unique",
    REQUIRED: "field is required"
};