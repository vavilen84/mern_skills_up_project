const {MongoClient} = require('mongodb');
require('dotenv').config();

async function main() {
    let myArgs = process.argv.slice(2);
    let  dbName = myArgs[0];
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

        // Make the appropriate DB calls
        await listUsers(client, dbName);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function listUsers(client, dbName) {
    client.connect(function (err, client) {
        client.db(dbName).command({usersInfo: 1}).then((userList) => {
            console.log(userList);
        })
            .catch((err) => {
                console.log(err);
            });
    });
};

main().catch(console.error);