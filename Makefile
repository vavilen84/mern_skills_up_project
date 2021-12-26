# server test env

run-models-test:
	NODE_ENV=test server/./node_modules/mocha/bin/mocha server/src/test/models/$(test) --exit

run-endpoints-test:
	NODE_ENV=test server/./node_modules/mocha/bin/mocha server/src/test/endpoints/$(test) --exit

db-cmd:
	NODE_ENV=test node server/src/commands/db/$(cmd).js

