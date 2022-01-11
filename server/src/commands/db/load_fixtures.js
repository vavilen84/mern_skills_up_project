

async function main() {
    let myArgs = process.argv.slice(2);
    let pass = myArgs[0];

    let salt = Number(myArgs[1]);
    console.log(typeof salt);
    console.log(encryptPassword(pass, salt));
    process.exit(0);
}

main().catch(console.error);