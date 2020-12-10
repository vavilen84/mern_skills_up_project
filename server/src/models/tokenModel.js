const mongoose = require('../utils/mongoose').Mongoose,
    Schema = mongoose.Schema;
const uuid = require('uuid');
const enums = require('../enum/enum');
const constants = require('./../constants/constants');
const errorSerializer = require('../utils/modelErrorSerializer').errorSerializer;

function uuidValidator(v) {
    return uuid.validate(v);
}

const customTokenValidators = [
    {validator: uuidValidator, msg: constants.VALIDATION_ERRORS.UUID}
];

const schemaObj = {
    token: {
        unique: true,
        type: String,
        validate: customTokenValidators,
        required: [true, constants.VALIDATION_ERRORS.REQUIRED],
    },
    type: {
        index: true,
        type: Number,
        enum: [enums.TokenTypes.AUTH, enums.TokenTypes.REFRESH],
        required: [true, constants.VALIDATION_ERRORS.REQUIRED],
    },
    expiresAt: {
        type: Date,
        required: [true, constants.VALIDATION_ERRORS.REQUIRED],
    }
};

const schema = new Schema(schemaObj);

exports.Token = getModel();

function getModel(){
    return mongoose.model(constants.TOKEN_MODEL_NAME, schema);
}

exports.ValidationErrorResponseSerializer = function (err) {
    return errorSerializer(Object.keys(schemaObj), err);
}

