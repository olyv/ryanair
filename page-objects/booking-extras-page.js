var BookingExtrasPage = function() {

  this.proceedToPayment = function() {
    var checkOutButton = element(by.css("button[data-ref='header-checkout-btn']"));
      checkOutButton.isDisplayed().then(function (isVisible) {
        checkOutButton.click();
    });
  };

  this.declineSeatsSelection = function() {
    element(by.css("button[ng-click='closeThisDialog()']")).click();
  };
};

module.exports = BookingExtrasPage;
