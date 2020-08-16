const enums = require('./../enum/enum')
const log = require('./../../src/libs/logger')(module);
const security = require('./../../src/libs/security');
const mongoose = require('./../libs/mongoose').Mongoose,
    Schema = mongoose.Schema;

const modelName = 'User';
const secret = 'secret';
const scenarioVirtualProp = 'scenario';
const passwordVirtualProp = 'password';

const schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'username is required']
    },
    hashedPassword: {
        type: String,
        required: [function () {
            switch (this._scenario) {
                case enums.Models.SCENARIO_CREATE:
                    return true;
                default:
                    return false;
            }
        }, 'password is required']
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
});

schema.virtual(scenarioVirtualProp)
    .set(function (scenario) {
        this._scenario = scenario;
    })
    .get(function () {
        return this._scenario;
    });

schema.virtual(passwordVirtualProp)
    .set(function (password) {
        if (password && (this._scenario === enums.Models.SCENARIO_CREATE)) {
            this._plainPassword = password;
            this.salt = Math.random() + secret;
            this.hashedPassword = security.encryptPassword(password, this.salt)
        }
    })
    .get(function () {
        return this._plainPassword;
    });

exports.User = mongoose.model(modelName, schema);

exports.ValidationErrorSerializer = function (err) {
    let data = {};
    if (err.errors.username) {
        data.username = err.errors.username.message;
    }
    if (err.errors.hashedPassword) {
        data.password = err.errors.hashedPassword.message;
    }
    return {"errors": data};
}
