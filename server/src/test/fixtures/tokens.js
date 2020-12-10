const enums = require('./../../enum/enum');
const {addYears} = require("../../utils/date");

const TOKEN_1_UUID = '469cf79f-78e8-4c57-a8e8-8455684fb6b0';

module.exports.TOKEN_1_UUID = TOKEN_1_UUID;

module.exports.TOKEN_1 = {
    token: TOKEN_1_UUID,
    type: enums.TokenTypes.AUTH,
    expiresAt: addYears(1)
};