module.exports = function(app, verbose) {
    app.map = function (a, route) {
        route = route || '';
        for (let key in a) {
            switch (typeof a[key]) {
                // { '/path': { ... }}
                case 'object':
                    app.map(a[key], route + key);
                    break;
                // get: function(){ ... }
                case 'function':
                    if (verbose) console.log('%s %s', key, route);
                    app[key](route, a[key]);
                    break;
            }
        }
    };
}