exports.InitRoutes = function(app){
    require('./../endpoints/posts/postCreate')(app);
    require('./../endpoints/posts/postDelete')(app);
    require('./../endpoints/posts/postGet')(app);
    require('./../endpoints/posts/postGetList')(app);
    require('./../endpoints/posts/postUpdate')(app);
    require('./../endpoints/users/userAuthenticate')(app);
}
