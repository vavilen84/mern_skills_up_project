const mongoose = require('../utils/mongoose').Mongoose,
    Schema = mongoose.Schema;
const uuid = require('uuid');
const enums = require('../enum/enum');
const constants = require('./../constants/constants');
const errorSerializer = require('../utils/modelErrorSerializer').errorSerializer;

const modelName = 'token';

function uuidValidator(v) {
    return uuid.validate(v);
}

const customTokenValidators = [
    {validator: uuidValidator, msg: constants.VALIDATION_ERRORS.UUID}
];

const schema = new Schema({
    token: {
        type: String,
        validate: customTokenValidators,
        required: true
    },
    type: {
        type: Number,
        enum: [enums.TokenTypes.AUTH, enums.TokenTypes.REFRESH],
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
});

exports.Token = mongoose.model(modelName, schema);

exports.ValidationErrorResponseSerializer = function (err) {
    let props = ['token', 'type', 'expiresAt'];
    return errorSerializer(props, err);
}