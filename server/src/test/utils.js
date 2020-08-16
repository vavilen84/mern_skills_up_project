require('dotenv').config({path: '.env.test'});
const mongoose = require('./../libs/mongoose').Mongoose;
const log = require('./../libs/logger')(module);
const constants = require('./../constants/constants');

function clearTestDBCollections() {
    const db = mongoose.connection;
    db.dropCollection(constants.USERS_COLLECTION_NAME, function(err){
        if (err) {
            if (!err.toString().includes("ns not found")) {
                log.info(err.toString());
            }
        }
    })
}

exports.prepareDatabaseBeforeTest = function () {
    clearTestDBCollections();
}