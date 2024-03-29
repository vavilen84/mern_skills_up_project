exports.SetEnv = function () {
    let envFileName = '.env';
    let envFilePath = '';

    let currentFolder = process.env.PWD;
    if (!currentFolder) {
        // it is assumed, that we have run docker env
        let serverWorkingDir = process.env.SERVER_WORKING_DIR;
        if (!serverWorkingDir) {
            throw new Error('Docker env is not loaded!');
        }
        envFilePath = serverWorkingDir + "/" + envFileName;
    } else {
        if (process.env.SERVER_WORKING_DIR && (process.env.SERVER_WORKING_DIR === currentFolder)) {
            // it is assumed, that we have run docker env
            envFilePath = currentFolder + "/" + envFileName;
        } else if (currentFolder.includes('server') === false) {
            // it is assumed, that we have run tests using Makefile in project root folder
            envFilePath = currentFolder + "/server/" + envFileName;
        } else {
            // it is assumed, that we have run tests using IDE debug with breakpoints tool
            envFilePath = currentFolder + "/" + envFileName;
        }
    }

    require('dotenv').config({path: envFilePath});

    if (!process.env.MONGODB_CONN_STRING) {
        throw new Error('Env is not loaded!');
    }
}