# Run applications & tests outside of Docker

# Frontend

### Run application

Run frontend
```
cd /project/root/folder/frontend
npm run dev
```

### Tests

Both BE & FE tests use predefined test fixtures' data, which is restored before each Cypress test
```
beforeEach(() => {
    cy.loadFixtures();
});
```
```
// see frontend/cypress/support/commands.js

Cypress.Commands.add('loadFixtures', () => {
    let cmd = "cd .. && make load-fixtures";
    cy.exec(cmd).then((result) => {
        cy.log(result);
    });
});
```
'make load-fixtures' will run fake server test, in order to restore DB
```
// see Makefile

load-fixtures:
	NODE_ENV=test server/./node_modules/mocha/bin/mocha server/src/tests/fixtures/loadFixtures.test.js --exit
```

In order to run Cypress tests FE & BE applications should be started like this
```
cd /project/root/folder/frontend
npm run dev
```
```
cd /project/root/folder/server
npm run dev
```

Run Cypress tests
```
cd /project/root/folder/frontend
npm run cypress:open
```

# Server

### Run server
```
cd /project/root/folder/server
npm run dev
```

### Tests

Run one model test
```
cd /project/root/folder
make run-server-models-test test=postModel.test.js
```

Run all models tests
```
cd /project/root/folder
make run-all-models-tests
```

Run one endpoint test
```
cd /project/root/folder
make run-server-endpoints-test test=posts/postCreate.test.js
```

Run all endpoints tests
```
cd /project/root/folder
make run-all-endpoints-tests
```

### Run server
```
cd /project/root/folder/server
make run-all-tests
```

### CLI commands

Run DB cli command
```
cd /project/root/folder
make run-db-cmd cmd=create_db_user
```