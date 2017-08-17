var constants = require('../utils/constants.js');

var BookingDetailsPage = function() {

  this.isBookingDetailsPageOpened = function() {
    return browser.wait(function() {
      return browser.getCurrentUrl().then(function(url) {
        return /booking/.test(url);
      });
    }, constants.CUSTOM_WAIT_TIMEOUT, "[ERROR] URL is not changed to booking page");
  };

  this.clickSelectFare = function(fareType) {
    var fromPriceButton = element(by.css('flights-table-price:not(.show-mobile) div.core-btn-primary'));
    browser.wait(protractor.ExpectedConditions.presenceOf(fromPriceButton), constants.CUSTOM_WAIT_TIMEOUT);
    fromPriceButton.click();

    getSelectFareButton(fareType).click();
  };

  this.clickContinueWhenFareIsSelected = function() {
    element(by.css('#continue')).click();
  };

  getSelectFareButton = function(fareType) {
    var selectFareButton;
    if (fareType == "standard") {
        selectFareButton = element(by.css("div.standard #continue"));
    } else if (fareType == "plus") {
        selectFareButton = element(by.css("div.leisure-plus #continue"));
    } else if (fareType == "business") {
      selectFareButton = element(by.css("div.business-plus #continue"));
    } else {
      throw "[ERROR] clickSelectFare(): please check value of passed argument: " + fareType;
    }
    return selectFareButton;
  };
};

module.exports = BookingDetailsPage;
