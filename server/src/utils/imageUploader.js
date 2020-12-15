const fs = require('fs');
const path = require('path');

module.exports.uploadImage = (file) => {

    return new Promise((resolve, reject) => {

        if (!fs.existsSync(file.path)) {
            reject('image file is not saved');
        }

        let dt = new Date();
        let pathArr = file.path.split('/');
        let tmpFilename = pathArr[pathArr.length - 1];
        let relativePath = path.join(
            dt.getFullYear().toString(),
            dt.getMonth().toString(),
            dt.getDate().toString()
        );
        let newFileFolder = path.join(
            process.env.UPLOADS_PATH,
            relativePath
        );
        fs.mkdirSync(newFileFolder, {recursive: true})
        let newFileName = tmpFilename + path.extname(file.name);
        let newFilePath = path.join(
            newFileFolder,
            newFileName
        );

        fs.renameSync(file.path, newFilePath);
        if (!fs.existsSync(newFilePath)) {
            reject('image file is not saved correctly');
        }

        let image = path.join(
            relativePath,
            newFileName
        );

        resolve(image);
    });
}