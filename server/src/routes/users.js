var User = require('./../models/user').User;

module.exports = function(app) {
    app.get('/api/v1/users', function(req, res){

    });

    app.post('/api/v1/users', function(req, res) {
        let user = new User({
            username: "Test"
        });
        user.set('password','test');
        user.save(function(err, user, affected){
            if (err) throw err;
            res.send('User created!');
        });
        res.send('...');
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