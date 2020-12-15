APP_ENV=test server/./node_modules/mocha/bin/mocha server/src/test/models/*.test.js --exit
APP_ENV=test server/./node_modules/mocha/bin/mocha server/src/test/endpoints/**/*.test.js --exit

