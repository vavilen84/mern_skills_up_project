const security = require('../utils/security');
const mongoose = require('../utils/mongoose').Mongoose,
    Schema = mongoose.Schema;
const errorSerializer = require('../utils/modelErrorSerializer').errorSerializer;
const constants = require('../constants/constants');

async function usernameUniqueValidator(v) {
    let model = getModel();
    let doc = await model.findOne({username: v}).exec();
    if (doc) {
        if (doc.id !== this._id.toString()) {
            return false;
        }
    }
    return true;
}

const usernameCustomValidators = [
    {validator: usernameUniqueValidator, msg: constants.VALIDATION_ERRORS.UNIQUE}
]

const schemaObj = {
    username: {
        type: String,
        unique: true,
        validate: usernameCustomValidators,
        required: [true, 'username is required']
    },
    hashedPassword: {
        type: String,
        required: [true, 'password is required']
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
};

const schema = new Schema(schemaObj);

schema.virtual('password')
    .set(function (password) {
        if (password) {
            this._plainPassword = password;
            this.salt = Math.random();
            this.hashedPassword = security.encryptPassword(password, this.salt)
        }
    })
    .get(function () {
        return this._plainPassword;
    });

exports.User = getModel();

function getModel() {
    return mongoose.model(constants.USER_MODEL_NAME, schema);
}

exports.ValidationErrorResponseSerializer = function (err) {
    const keys = Object.keys(schemaObj);
    delete keys.hashedPassword;
    keys.push(['hashedPassword', 'password']);
    return errorSerializer(keys, err);
}