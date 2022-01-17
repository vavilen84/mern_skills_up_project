# Run applications & tests outside of Docker

# Frontend

### Run application

Run frontend
```
cd /project/root/folder/frontend
npm run dev
```

### Tests

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

### CLI commands

Run DB cli command
```
cd /project/root/folder
make run-db-cmd cmd=create_db_user
```