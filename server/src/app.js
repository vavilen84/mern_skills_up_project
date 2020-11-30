const log = require('./utils/logger')(module);
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());

if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: '.env.test' });
} else {
    require('dotenv').config();
}

require('./endpoints/posts/postCreate')(app);
require('./endpoints/posts/postDelete')(app);
require('./endpoints/posts/postGet')(app);
require('./endpoints/posts/postGetList')(app);
require('./endpoints/posts/postUpdate')(app);

require('./endpoints/users/userAuthenticate')(app);

const port = process.env.SERVER_PORT;
app.listen(port, () => {
    log.info(`Example app listening at http://localhost:${port}`)
});

exports.App = app;












