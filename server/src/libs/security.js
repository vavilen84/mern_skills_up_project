let security = require('crypto');

exports.checkPassword = function (password, hashedPassword) {
    return this.encryptPassword(password) === hashedPassword;
}

exports.encryptPassword = function (password, salt) {
    return security.createHmac('sha1', salt).update(password).digest('hex');
}