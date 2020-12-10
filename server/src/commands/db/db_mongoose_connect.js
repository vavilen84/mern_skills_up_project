const mongoose = require('mongoose');
const config = require('./../../../src/config/db.json');
const log = require('./../../utils/logger')(module);
//require('dotenv').config();
require('dotenv').config({path: '.env.test'});

async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
        //const uri = "mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority";

    mongoose.connect(process.env.MONGODB_CONN_STRING, config.mongoose.options);
    // const db = mongoose.connection;

    // db.on('error', function (err) {
    //     log.error('connection error:', err.message);
    // });
    // db.once('open', function callback () {
    //     log.info("Connected to DB. Conn string: " + process.env.MONGODB_CONN_STRING);
    // });

    try {
        await mongoose.connect(process.env.MONGODB_CONN_STRING, config.mongoose.options)
    } catch (e) {
        console.error(e);
    } finally {

    }
}

main().catch(console.error);