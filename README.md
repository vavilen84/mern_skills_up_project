# Skills-up Mongo/Express/React/Node stack application

## React FE application

### Implemented functionality
1) Home page
2) Login page 
3) Post List/Create/Update/Delete/Details pages
4) Posts paginator
5) Success/Error alerts
6) Post Delete confirmation modal
7) Protected Require Auth URLs
8) E2E Cypress test coverage 
9) Test fixtures data

### Used tools
- Webpack 
- Redux/Redux-thunk
- Cypress

### Run application

Run frontend
```
cd /prject/root/folder/frontend
npm run dev
```

### Tests

Both BE & FE tests use predefined test fixtures data, which is restored before each Cypress test
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
cd /prject/root/folder/frontend
npm run dev
```
```
cd /prject/root/folder/server
npm run dev
```

Run Cypress tests outside the Docker env
```
cd /prject/root/folder/frontend
npm run cypress:open
```

## Express REST API server application

### Implemented functionality
1) Post Get/GetList/Create/Update/Delete endpoints
2) User auth endpoint (OAuth2)
3) Mocha models & endpoints test coverage
4) Test fixtures data
5) CLI commands

### Used tools
- Mongoose ORM
- Mocha

### Run server
```
cd /prject/root/folder/server
npm run dev
```

### Tests

Run one model test
```
cd /prject/root/folder
make run-server-models-test test=postModel.test.js
```

Run all models tests
```
cd /prject/root/folder
make run-all-models-tests
```

Run one endpoint test
```
cd /prject/root/folder
make run-server-endpoints-test test=posts/postCreate.test.js
```

Run all endpoints tests
```
cd /prject/root/folder
make run-all-endpoints-tests
```

### Run server 
```
cd /prject/root/folder/server
make run-all-tests
```

### CLI commands

Run DB cli command
```
cd /prject/root/folder
make run-db-cmd cmd=create_db_user
```

### Env file

Create .env & .env.test files from .env.dist. If NODE_ENV=test - .env.test will be included respectively. 

