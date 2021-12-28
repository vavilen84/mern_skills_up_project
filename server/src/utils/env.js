exports.SetEnv = function () {
    if (process.env.NODE_ENV === 'test') {
        require('dotenv').config({path: '.env.test'});
    } else {
        // used to run tests from IDE
        require('dotenv').config({path: process.env.PWD + '/../.env.test'});
    }
}