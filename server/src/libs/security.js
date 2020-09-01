const security = require('crypto');
const secret = 'secret';

exports.checkPassword = function (password, salt, hashedPassword) {
    return this.encryptPassword(password, salt) === hashedPassword;
}

exports.encryptPassword = function (password, salt) {
    return security.createHmac('sha1', salt + secret).update(password).digest('hex');
}

exports.generateAuthTokens = function () {
    return {
        accessToken: generateHash(),
        refreshToken: generateHash()
    };
}

function generateHash() {
    let hash = 0, i, chr;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}