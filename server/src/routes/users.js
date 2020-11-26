const log = require('./../libs/logger')(module);
const response = require('./../libs/response');
const security = require('./../libs/security');
const User = require('./../models/user').User;
const ValidationErrorResponseSerializer = require('./../models/user').ValidationErrorResponseSerializer;
const UserResponseSerializer = require('./../models/user').UserResponseSerializer;
const constants = require('./../../src/constants/constants');
const enums = require('./../enum/enum');

module.exports = function (app) {

    app.get(constants.USERS_BASE_URL, function (req, res) {

        // action is forbidden
        response.sendForbidden(res);
        return;

        User.find({}, function (err, docs){
            if (err) {
                response.sendServerError(res);
            }
            response.sendOK(res, UserResponseSerializer(docs), "OK");
        });
    });

    app.get(constants.USERS_BASE_URL+"/:username", function (req, res) {

        // action is forbidden
        response.sendForbidden(res);
        return;

        User.findOne({username:req.params.username}, function (err, doc){
            if (err) {
                response.sendServerError(res);
            }
            if (!doc) {
                response.sendNotFound(res)
            } else {
                response.sendOK(res, UserResponseSerializer([doc])[0], "OK")
            }
        });
    });

    app.post(constants.USERS_BASE_URL+"/:username/authenticate", function (req, res) {

        let user = new User({
            scenario: enums.Models.SCENARIO_AUTHENTICATE
        });

        user.set('username', req.body.username);
        user.set('password', req.body.password);

        let errors = user.validateSync();
        if (errors) {
            log.info(errors);
            response.sendUnprocessableEntity(res, ValidationErrorResponseSerializer(errors));
            return;
        }

        User.findOne({username:req.params.username}, function (err, doc){
            if (err) {
                response.sendServerError(res);
                return;
            }
            if (!doc) {
                response.sendNotFound(res)
            } else {
                if (security.checkPassword(user.password, doc.salt, doc.hashedPassword)) {
                    response.sendOK(res, security.generateAuthTokens(), "OK")
                    return;
                }
                response.sendUnauthorized(res)
            }
        });
    });

    app.post(constants.USERS_BASE_URL, function (req, res) {

        // action is forbidden
        response.sendForbidden(res);
        return;

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
                        response.sendCreated(res, UserResponseSerializer([user]), constants.USERS_BASE_URL+'/'+ user.username);
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
};