let enums = require('./../enum/enum')
let log = require('./../../src/libs/logger')(module);
let security = require('./../../src/libs/security');

let mongoose = require('./../libs/mongoose'),
    Schema = mongoose.Schema;

let schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: function () {
            switch (this._scenario) {
                case enums.Models.SCENARIO_CREATE:
                    return true;
                default:
                    return false;
            }
        }
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

schema.virtual('scenario')
    .set(function (scenario) {
        this._scenario = scenario;
    })
    .get(function () {
        return this._scenario;
    });

schema.virtual('password')
    .set(function (password) {
        if (password && (this._scenario === enums.Models.SCENARIO_CREATE)) {
            this._plainPassword = password;
            this.salt = Math.random() + 'secret';
            this.hashedPassword = security.encryptPassword(password, this.salt)
        }
    })
    .get(function () {
        return this._plainPassword;
    });

exports.User = mongoose.model('User', schema);