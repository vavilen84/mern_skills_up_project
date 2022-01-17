# Run applications & tests using Docker environment

# Env file

For both ways need to create /root/project/folder/.env file from /root/project/folder/.env.dist and set correct values.

# Commands

Run containers
```
make docker-up-all
```

Run containers with --build flag
```
make docker-up-build-all
```

Stop all containers
```
make docker-stop-all
```

Load fixtures
```
make docker-load-fixtures
```

Run all server tests
```
make docker-run-all-server-tests
```

Run frontend tests
```
cd frontend
npm run cypress:open:docker
```
