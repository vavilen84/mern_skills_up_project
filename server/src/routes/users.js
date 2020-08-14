let log = require('./../libs/logger')(module);
let utils = require('./../libs/utils');
let User = require('./../models/user').User;
let validateUserOnCreate = require('./../models/user').validateUserOnCreate;

module.exports = function (app) {

    app.get('/api/v1/users', function(req, res) {
        utils.sendOK(res, {"data":1}, "message");
    });


    app.post('/api/v1/users', function (req, res) {
        let user = new User(req.body);
        let errors = user.validate(user, ['username']);
        if (errors) {
            utils.send(res, 422, errors, "Validation failed")
        } else {
            user.save(function (err, user, affected) {
                if (!err) {
                    log.info("user created");
                    return res.send({status: 'OK', user: user});
                } else {
                    if (err.name === 'ValidationError') {
                        res.statusCode = 400;
                        res.send({error: 'Validation error'});
                    } else {
                        res.statusCode = 500;
                        res.send({error: 'Server error'});
                    }
                    log.error('Internal error(%d): %s', res.statusCode, err.message);
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