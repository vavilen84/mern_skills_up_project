const mongoose = require('../utils/mongoose').Mongoose,
    Schema = mongoose.Schema;
const uuid = require('uuid');
const enums = require('../enum/enum');
const constants = require('./../constants/constants');
const {addYears} = require("../utils/date");
const errorSerializer = require('../utils/modelErrorSerializer').errorSerializer;
const conn = require('./../utils/mongoose').Db;
const logger = require('./../utils/logger')(module);

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

function getModel() {
    return mongoose.model(constants.TOKEN_MODEL_NAME, schema);
}

exports.ValidationErrorResponseSerializer = function (err) {
    return errorSerializer(Object.keys(schemaObj), err);
}

function generateTokens() {
    let model = getModel();
    let accessToken = new model({
        token: uuid.v4(),
        type: enums.TokenTypes.AUTH,
        expiresAt: addYears(1)
    });
    let refreshToken = new model({
        token: uuid.v4(),
        type: enums.TokenTypes.REFRESH,
        expiresAt: addYears(2)
    });
    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    };
}

async function createTokens() {
    let tokens = generateTokens();
    let session = null;
    try {
        session = await conn.startSession();
    } catch (err) {
        throw err;
    }
    if (!session) {
        throw new Error('Txn session is null');
    }
    session.startTransaction();
    try {
        await tokens.accessToken.validate();
        await tokens.accessToken.save();
        await tokens.refreshToken.validate();
        await tokens.refreshToken.save();
    } catch (err) {
        try {
            await session.abortTransaction();
        } catch (abortTxnErr) {
            throw abortTxnErr;
        }
        session.endSession();
        throw err;
    }
    try {
        await session.commitTransaction();
    } catch (err) {
        session.endSession();
        throw err;
    }
    session.endSession();
    return tokens;
}

exports.createTokens = createTokens;
