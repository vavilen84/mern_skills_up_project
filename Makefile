run-server-models-test:
	server/./node_modules/mocha/bin/mocha server/src/tests/models/$(test) --exit

run-server-endpoints-test:
	server/./node_modules/mocha/bin/mocha server/src/tests/endpoints/$(test) --exit

run-all-server-tests:
	server/./node_modules/mocha/bin/mocha server/src/tests/models/*.test.js --exit
	server/./node_modules/mocha/bin/mocha server/src/tests/endpoints/**/*.test.js --exit

run-all-models-tests:
	server/./node_modules/mocha/bin/mocha server/src/tests/models/*.test.js --exit

run-all-endpoints-tests:
	server/./node_modules/mocha/bin/mocha server/src/tests/endpoints/**/*.test.js --exit

run-db-cmd:
	node server/src/commands/db/$(cmd).js

load-fixtures:
	server/./node_modules/mocha/bin/mocha server/src/tests/fixtures/loadFixtures.test.js --exit