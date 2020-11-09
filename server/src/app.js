const log = require('./libs/logger')(module);
const express = require('express');
const app = express();
const cors = require('cors');
const verbose = process.env.NODE_ENV !== 'test';
//const escapeHtml = require('escape-html');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
//const morgan = require('morgan')
//app.use(morgan('tiny'))
app.use(cors());

require('dotenv').config();
if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: '.env.test' });
}
if (process.env.NODE_ENV === 'local') {
    require('dotenv').config({ path: '.env.local' });
}
require('./routes/utils')(app, verbose);
require('./routes/posts')(app);
require('./routes/users')(app);

const port = process.env.SERVER_PORT;
let server = app.listen(port, () => {
    log.info(`Example app listening at http://localhost:${port}`)
});

exports.App = server;












