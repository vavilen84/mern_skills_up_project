let mongoose = require('mongoose');
let config = require('./../config/db');

mongoose.connect(process.env.MONGODB_CONN_STRING, config.mongoose.options);

module.exports = mongoose;
