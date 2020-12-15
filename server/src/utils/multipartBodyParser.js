const formidable = require('formidable');

module.exports.parseMultipartDataRequest = (req) => {
    return new Promise((resolve, reject) => {
        const form = formidable({multiples: true, uploadDir: process.env.UPLOADS_PATH});
        form.parse(req, (err, fields, files) => {
            if (err) {
                reject(err);
            }
            resolve({fields: fields, files: files});
        });
    });
}