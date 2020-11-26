const {MongoClient} = require('mongodb');
require('dotenv').config();

async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
        //const uri = "mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority";
    const uri = process.env.MONGODB_CONN_STRING;

    const client = new MongoClient(uri);

    try {
        await client.connect(function (err, client) {
            if (err) throw err;
        });

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);