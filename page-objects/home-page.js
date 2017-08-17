var HomePage = function() {

  this.openHomePage = function() {
    browser.get('http://www.ryanair.com');
  };

  this.logIn = function(username, password) {
    element(by.css("a[ui-sref='login']")).click();
    element(by.css('div.modal-form-container')).isDisplayed().then(function () {
      element(by.css("input[name='emailAddress']")).sendKeys(username);
      element(by.css("password-input > input[name='password']")).sendKeys(password);
      element(by.css("[button-text='MYRYANAIR.AUTHORIZATION.LOGIN.LOGIN_AUTHORIZATION']")).click();
    });
  };

  this.enterDepartureAirport = function(departureCountry, departureCity) {
    var airportFromInput = element(by.css("input[placeholder='Departure airport']"));

    airportFromInput.click();
    if(!isAirportPickerOpen) {
      airportFromInput.click();
    }

    var countryElement = element(by.cssContainingText('div.core-list-item', departureCountry));
    scrollElementIntoViewAndClick(countryElement);

    var cityElement = element(by.cssContainingText('span', departureCity));
    scrollElementIntoViewAndClick(cityElement);
  };

  this.enterDestinationAirport = function(destinationCountry, destinationCity) {
    var airportToInput = element(by.css("input[placeholder='Destination airport']"));

    if(!isAirportPickerOpen) {
      airportToInput.click();
    }

    var countryElement = element(by.cssContainingText('div.core-list-item', destinationCountry));
    scrollElementIntoViewAndClick(countryElement);

    var cityElement = element(by.cssContainingText('span', destinationCity));
    scrollElementIntoViewAndClick(cityElement);
  };

  this.selectOneWayTrip = function() {
    element(by.css("div[class='flight-search-type-option one-way']")).click();
  };

  this.selectFlyOutDate = function(date) {
    var flyOutDateInput = element(by.model('dateRange.startDate'));
    flyOutDateInput.click();
    element(by.css("[data-id='" + date + "']")).click();
  };

  this.setNumberOfPassengers = function(adults, teens, children, infant) {
    var passengersNumberDropdown = element(by.css("div.dropdown-handle"));
    passengersNumberDropdown.click();

    for(var i=0; i < adults - 1; i++) { //since 1 adult is already pre-selected
      element(by.css("div[value='paxInput.adults'] button[ng-click='$ctrl.increment()']")).click();
    }

    for(var i=0; i < teens; i++) {
      element(by.css("div[value='paxInput.teens'] button[ng-click='$ctrl.increment()']")).click();
    }

    for(var i=0; i < children; i++) {
      element(by.css("div[value='paxInput.children'] button[ng-click='$ctrl.increment()']")).click();
    }

    for(var i=0; i < infant; i++) {
      element(by.css("div[value='paxInput.infants'] button[ng-click='$ctrl.increment()']")).click();
    }
  };

  this.clickLetsGoButton = function() {
    element(by.css("[ng-click='searchFlights()']")).click();
  };

  this.isUserLoggedIn = function(expectedUsername) {
    var username = element(by.cssContainingText('span.username', expectedUsername));
    return username.isDisplayed().then(function (isVisible) {
      return isVisible;
    });
  };

  isAirportPickerOpen = function() {
    var airportsPicker = element(by.css('core-linked-list'));
    airportsPicker.isDisplayed().then(function (isVisible) {
      return isVisible;
    });
  };

  scrollElementIntoViewAndClick = function(element) {
    browser.executeScript("arguments[0].scrollIntoView();", element.getWebElement());
    element.click();
  };
};

module.exports = HomePage;
