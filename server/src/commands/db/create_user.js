require('dotenv').config();
const User = require('./../../models/userModel').User;

async function main() {
    let myArgs = process.argv.slice(2);
    let username = myArgs[0];
    let password = myArgs[1];

    let user = new User({
        username: username
    });

    user.set('password', password);

    let errors = user.validateSync();
    if (errors) {
        console.log(errors);
        process.exit(1);
    }

    user.save(function (err) {
        if (err) console.log(errors);
    });
}

main().catch(console.error);