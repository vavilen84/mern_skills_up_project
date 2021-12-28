const {InitServerApp} = require("./utils/server");
const {SetEnv} = require("./utils/env");
const {DBConnect} = require("./utils/mongoose");

SetEnv();
DBConnect(InitServerApp);





