const express = require('express');
const app = express();
const verbose = process.env.NODE_ENV !== 'test';
const escapeHtml = require('escape-html');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const log = require('./libs/logger')(module);

app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('tiny'))
app.use(function (req, res, next) {
    res.status(404);
    log.debug('Not found URL: %s', req.url);
    res.send({error: 'Not found'});
    return;
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    log.error('Internal error(%d): %s', res.statusCode, err.message);
    res.send({error: err.message});
    return;
});


require('dotenv').config();
require('./routes/utils')(app, verbose);
require('./routes/posts')(app);
require('./routes/users')(app);

const port = process.env.SERVER_PORT;
app.listen(port, () => {
    log.info(`Example app listening at http://localhost:${port}`)
});










