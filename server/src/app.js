const express = require('express');
const app = express();
const port = 3000;
const verbose = process.env.NODE_ENV !== 'test';
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const escapeHtml = require('escape-html');

const morgan = require('morgan')
app.use(morgan('tiny'))

require('./routes/utils')(app, verbose);
require('./routes/posts')(app, {});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});





