var constants = require('../utils/constants.js');

var PaymentPage = function() {

  this.fillPassengerInfo = function(title, name, surname) {
    browser.sleep(constants.PAYMENTS_PAGE_HARDCODED_TIMEOUT);
    browser.waitForAngularEnabled(false);
    element(by.model('passenger.name.title')).sendKeys(title);
    element(by.model('passenger.name.first')).sendKeys(name);
    element(by.model('passenger.name.last')).sendKeys(surname);
    browser.waitForAngularEnabled(true);
  };

  this.fillCardInfo = function(cardNumber, cardType, expiryMonth, expiryYear, cvv, cardHolderName) {
    browser.waitForAngularEnabled(false);
    element(by.model('$ctrl.cardModel.cardNumber')).sendKeys(cardNumber);
    // element(by.model('$ctrl.cardModel.cardType')).sendKeys(cardNumber);
    element(by.cssContainingText('option', cardType)).click();
    element(by.model('$ctrl.cardModel.expiry.month')).sendKeys(expiryMonth);
    element(by.model('$ctrl.cardModel.expiry.year')).sendKeys(expiryYear);
    element(by.model('$ctrl.cardModel.securityCode')).sendKeys(cvv);
    element(by.model('$ctrl.cardModel.cardHolderName')).sendKeys(cardHolderName);
    browser.waitForAngularEnabled(true);
  };

  this.acceptTermsAndPay = function() {
    browser.waitForAngularEnabled(false);
    element(by.model('$ctrl.termsAccepted')).click();
    element(by.cssContainingText('button', 'Pay Now')).click();
    browser.waitForAngularEnabled(true);
  };

  this.fiilBillingAddress = function(addres1, city, postalCode) {
    browser.waitForAngularEnabled(false);
    element(by.model('$ctrl.model.addressLine1')).sendKeys(addres1);
    element(by.model('$ctrl.model.city')).sendKeys(city);
    element(by.model('$ctrl.model.postcode')).sendKeys(postalCode);
    browser.waitForAngularEnabled(true);
  };

  this.getErrorMessage = function() {
    browser.waitForAngularEnabled(false);
    browser.sleep(constants.PAYMENTS_PAGE_HARDCODED_TIMEOUT);
    var messageDisplayed = browser.driver.findElement(by.css('.info-title'));
    browser.waitForAngularEnabled(true);
    return messageDisplayed.getText();
  };

  this.getPaymentErrorDetails = function() {
    browser.waitForAngularEnabled(false);
    var detailsDisplayed = browser.driver.findElement(by.css("div[translate='common.components.payment_forms.error_explain_declined']"));
    browser.waitForAngularEnabled(true);
    return detailsDisplayed.getText();
  };
};

module.exports = PaymentPage;
