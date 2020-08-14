let crypto = require('crypto');
let enums = require('./../enum/enum')
let log = require('./../../src/libs/logger')(module);

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

schema.methods.encryptPassword = function (password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
}

schema.virtual('scenario')
    .set(function (scenario) {
        this._scenario = scenario;
    })
    .get(function () {
        return this._scenario;
    });

schema.virtual('password')
    .set(function (password) {
        if (password) {
            this._plainPassword = password;
            this.salt = Math.random() + '';
            this.hashedPassword = this.encryptPassword(password)
        }
    })
    .get(function () {
        return this._plainPassword;
    });

schema.methods.checkPassword = function (password) {
    return this.encryptPassword(password) === this.hashedPassword;
}

exports.User = mongoose.model('User', schema);

exports.validateUserOnCreate = function (user) {
    return user.validateSync();
}