const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {InitRoutes} = require("./../routes/routes");

let app = createServer();

function createServer(){
    const app = express()
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cors());
    InitRoutes(app);
    return app
}

exports.App = app;