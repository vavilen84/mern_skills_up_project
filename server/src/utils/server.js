const log = require('./../utils/logger')(module);
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {InitRoutes} = require("./../routes/routes");

function createServer(){
    const app = express()
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cors());
    InitRoutes(app);
    return app
}

exports.CreateServer = createServer;

exports.InitServerApp = function(){
    let app = createServer();
    let port = process.env.SERVER_PORT;
    app.listen(port, () => {
        log.info(`Example app listening at http://localhost:${port}`)
    });
}