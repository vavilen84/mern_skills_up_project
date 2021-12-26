NODE_ENV=test server/./node_modules/mocha/bin/mocha server/src/test/models/*.test.js --exit
NODE_ENV=test server/./node_modules/mocha/bin/mocha server/src/test/endpoints/**/*.test.js --exit

