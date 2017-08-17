var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var currentDatePath = "report " + new Date();

exports.config = {
  framework: 'jasmine2',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['specs/*-spec.js'],
  getPageTimeout: 30000,
  allScriptsTimeout: 30000,
  jasmineNodeOpts: {
      defaultTimeoutInterval: 30000,
      includeStackTrace: true
    },
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
        args: [
            '--start-maximized'
        ]
    }
  },
  onPrepare: function() {
      jasmine.getEnv().addReporter(
        new Jasmine2HtmlReporter({
          savePath: "./reports/" + currentDatePath + "/",
          screenshotsFolder: "screenshots"
        })
      );
   }
};
