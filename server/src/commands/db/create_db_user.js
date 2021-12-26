const {MongoClient} = require('mongodb');
if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({path: '.env.test'});
} else {
    require('dotenv').config();
}


async function main() {
    let dbName = process.env.MONGODB_DATABASE;
    let userName = process.env.MONGODB_USERNAME;
    let password = process.env.MONGODB_PASSWORD;
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
        //const uri = "mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority";
    const uri = process.env.MONGO_SERVER_CONN_STRING;

    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        console.log(userName);
        console.log(password);
        console.log(dbName);

        await client.db(dbName).addUser(userName, password);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);