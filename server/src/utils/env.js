exports.SetEnv = function () {
    let envFileName = '.env.local.test';
    let envFilePath = '';

    if (process.env.ENV_FILE) {
        envFileName = process.env.ENV_FILE;
    }
    let currentFolder = process.env.PWD;
    if (currentFolder.includes('server') === false) {
        // it is assumed, that we have run tests using Makefile in project root folder
        envFilePath = currentFolder + "/server/" + envFileName;
    } else {
        // it is assumed, that we have run tests using IDE debug with breakpoints tool
        envFilePath = currentFolder + "/" + envFileName;
    }
    require('dotenv').config({path: envFilePath});
    if (!process.env.MONGODB_CONN_STRING) {
        throw new Error('Env is not loaded!');
    }
}