const log = require('./../libs/logger')(module);
const response = require('./../libs/response');
const User = require('./../models/user').User;
const ValidationErrorSerializer = require('./../models/user').ValidationErrorSerializer;
const constants = require('./../../src/constants/constants');
const path = require('path');
const enums = require('./../enum/enum');

module.exports = function (app) {

    app.get(constants.USERS_BASE_URL, function (req, res) {
        response.sendOK(res, {"data": 1}, "message");
    });

    app.post(constants.USERS_BASE_URL, function (req, res) {
        let user = new User(req.body);
        user.set('scenario', enums.Models.SCENARIO_CREATE);
        let errors = user.validateSync();
        if (errors) {
            response.sendUnprocessableEntity(res, ValidationErrorSerializer(errors));
        } else {
            user.save(function (err, user, affected) {
                if (!err) {
                    //log.info("user created");
                    response.sendCreated(res, user, path.join(constants.USERS_BASE_URL, user._id))
                } else {
                    if (err.name === constants.MONGOOSE_VALIDATION_ERR_KEY) {
                        response.sendValidationError(res, ValidationErrorSerializer(err));
                    } else {
                        response.sendServerError(res);
                    }
                    //log.error('Internal error(%d): %s', res.statusCode, err.message);
                }
            });
        }
    });


    // let posts = {
    //     list: function (req, res) {
    //         res.send('user list');
    //     },
    //
    //     get: function (req, res) {
    //         res.send('user ' + escapeHtml(req.params.uid))
    //     },
    //
    //
    //     post: function (req, res) {
    //         res.send('user ' + escapeHtml(req.params.uid))
    //     },
    //
    //     delete: function (req, res) {
    //         res.send('delete users');
    //     }
    // };
    //
    // app.map({
    //     '/posts': {
    //         get: posts.list,
    //         '/:uid': {
    //             get: posts.get,
    //             post: posts.post,
    //             delete: posts.delete,
    //         },
    //     }
    // });
};