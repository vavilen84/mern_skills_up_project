const {App} = require("./utils/server");
const {SetEnv} = require("./utils/env");
const mongoose = require("mongoose");
const config = require("./config/db");
const log = require('./utils/logger')(module);

SetEnv();

log.info("Connecting to DB. Conn string: " + process.env.MONGODB_CONN_STRING);
mongoose.connect(process.env.MONGODB_CONN_STRING, config.mongoose.options)
    .then(() => {
        let port = process.env.SERVER_PORT;
        App.listen(port, () => {
            log.info(`Example app listening at http://localhost:${port}`)
        });
    })
    .catch((err) => {
        log.error(err);
    });






