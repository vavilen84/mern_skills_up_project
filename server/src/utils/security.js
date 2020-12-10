const security = require('crypto');
const secret = 'secret';

exports.checkPassword = function (password, salt, hashedPassword) {
    return this.encryptPassword(password, salt) === hashedPassword;
}

exports.encryptPassword = function (password, salt) {
    return security.createHmac('sha1', salt + secret).update(password).digest('hex');
}
