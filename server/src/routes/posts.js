let response = require('./../libs/response');

module.exports = function(app) {

    app.get('/api/v1/posts', function(req, res) {
        response.sendOK(res, {"data":1}, "message");
    });

};