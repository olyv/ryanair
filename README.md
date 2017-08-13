# Prerequisites:
- nodejs 8.3.0
- npm 5.3.0

To run tests:
1. Execute `npm install` to download project dependencies
2. Install protractor globally with  `npm install -g protractor` (project is created with 5.1.2)
3. Execute `webdriver-manager update` and then start Selenium Server with `webdriver-manager start`
4. Run tests with `protractor conf.js`
5. When execution is completed, find reports under generated _reports_ directory  :tada:
