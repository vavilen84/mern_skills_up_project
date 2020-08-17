const mongoose = require('mongoose');
const log = require('./../libs/logger')(module);
const response = require('./../libs/response');
const User = require('./../models/user').User;
const ValidationErrorResponseSerializer = require('./../models/user').ValidationErrorResponseSerializer;
const UserResponseSerializer = require('./../models/user').UserResponseSerializer;
const constants = require('./../../src/constants/constants');
const path = require('path');
const enums = require('./../enum/enum');

module.exports = function (app) {

    app.get(constants.USERS_BASE_URL, function (req, res) {
        User.find({}, function (err, docs){
            if (err) {
                response.sendServerError(res);
            }
            response.sendOK(res, UserResponseSerializer(docs), "OK")
        });
    });

    app.post(constants.USERS_BASE_URL, function (req, res) {

        let user = new User({
            scenario: enums.Models.SCENARIO_CREATE
        });

        user.set('username', req.body.username);
        user.set('password', req.body.password);

        let errors = user.validateSync();
        if (errors) {
            response.sendUnprocessableEntity(res, ValidationErrorResponseSerializer(errors));
            return;
        }

        User.findOne({username: req.body.username}, function (err, doc){
            if (err) {
                response.sendServerError(res);
            } else if (!doc) {
                user.save(function (err, user, affected) {
                    if (!err) {
                        response.sendCreated(res, UserResponseSerializer([user]), constants.USERS_BASE_URL+'/'+ user._id)
                    } else {
                        if (err.name === constants.MONGOOSE_VALIDATION_ERR_KEY) {
                            response.sendValidationError(res, ValidationErrorResponseSerializer(err));
                        } else {
                            response.sendServerError(res);
                        }
                    }
                });
            } else {
                response.sendValidationError(res, {"message": "user already exists"});
            }
        });


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