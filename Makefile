# server test env

run-models-test:
	NODE_ENV=test server/./node_modules/mocha/bin/mocha server/src/tests/models/$(test) --exit

run-endpoints-test:
	NODE_ENV=test server/./node_modules/mocha/bin/mocha server/src/tests/endpoints/$(test) --exit

run-all-tests:
	NODE_ENV=test server/./node_modules/mocha/bin/mocha server/src/tests/models/*.test.js --exit
	NODE_ENV=test server/./node_modules/mocha/bin/mocha server/src/tests/endpoints/**/*.test.js --exit

run-all-models-tests:
	NODE_ENV=test server/./node_modules/mocha/bin/mocha server/src/tests/models/*.test.js --exit

run-all-endpoints-tests:
	NODE_ENV=test server/./node_modules/mocha/bin/mocha server/src/tests/endpoints/**/*.test.js --exit

db-cmd:
	NODE_ENV=test node server/src/commands/db/$(cmd).js

load-fixtures:
	NODE_ENV=test server/./node_modules/mocha/bin/mocha server/src/tests/fixtures/loadFixtures.test.js --exit