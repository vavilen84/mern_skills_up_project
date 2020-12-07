# Skills up blog on Node.js

## Mocha

Run all tests
```
shell/run_all_tests.sh
```  

APP_ENV=test server/./node_modules/mocha/bin/mocha server/src/test/endpoints/posts/postCreate.test.js  --exit --unhandled-rejections=strict  --trace-warnings 
