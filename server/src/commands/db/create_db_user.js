const {MongoClient} = require('mongodb');
require('dotenv').config();

async function main() {
    let myArgs = process.argv.slice(2);
    let dbName = myArgs[0];
    let user = myArgs[1];
    let password = myArgs[2];
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

        await client.db(dbName).addUser(user, password);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);