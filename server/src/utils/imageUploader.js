const fs = require('fs');
const path = require('path');

module.exports.uploadImage = (file) => {

    return new Promise((resolve, reject) => {

        if (!fs.existsSync(file.filepath)) {
            reject('image file is not saved');
        }

        let dt = new Date();
        let relativePath = path.join(
            dt.getFullYear().toString(),
            dt.getMonth().toString(),
            dt.getDate().toString()
        );
        let newFileFolder = path.join(
            process.env.UPLOADS_FOLDER,
            relativePath
        );
        fs.mkdirSync(newFileFolder, {recursive: true})
        let newFileName = file.newFilename + path.extname(file.originalFilename);
        let newFilePath = path.join(
            newFileFolder,
            newFileName
        );

        fs.renameSync(file.filepath, newFilePath);
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