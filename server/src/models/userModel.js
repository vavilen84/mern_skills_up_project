const security = require('../utils/security');
const mongoose = require('../utils/mongoose').Mongoose,
    Schema = mongoose.Schema;
const errorSerializer = require('../utils/modelErrorSerializer').errorSerializer;

const modelName = 'User';
const passwordVirtualProp = 'password';

const schema = new Schema({
    username: {
        type: String,
        unique: true,
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
});

schema.virtual(passwordVirtualProp)
    .set(function (password) {
        this._plainPassword = password;
        this.salt = Math.random();
        this.hashedPassword = security.encryptPassword(password, this.salt)
    })
    .get(function () {
        return this._plainPassword;
    });

exports.User = mongoose.model(modelName, schema);

exports.ValidationErrorResponseSerializer = function (err) {
    let props = ['username', ['hashedPassword', 'password']];
    return errorSerializer(props, err);
}