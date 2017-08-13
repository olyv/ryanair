var data = require('../test-data/test-data.json');
var HomePage = require('../page-objects/home-page.js');
var BookingDetailsPage = require('../page-objects/booking-details-page.js');
var BookingExtrasPage = require('../page-objects/booking-extras-page.js');
var PaymentPage = require('../page-objects/payment-page.js');

describe('declined payment attempt', function() {
  it('should select a flight from WRO ro LIS', function() {
    var homePage = new HomePage();
    homePage.openHomePage();
    homePage.logIn(data.customer.email, data.customer.application_password);
    expect(homePage.isUserLoggedIn(data.customer.username)).toBeTruthy();
    homePage.selectOneWayTrip();
    homePage.enterDepartureAirport(data.flight.from.airportCountry, data.flight.from.airportCity);
    homePage.enterDestinationAirport(data.flight.to.airportCountry, data.flight.to.airportCity);
    homePage.selectFlyOutDate(data.flight.date);
    homePage.setNumberOfPassengers(1, 0, 0, 0);
    homePage.clickLetsGoButton();
  });

   it('should proceed to booking', function() {
     var bookingDetailsPage = new BookingDetailsPage();
     expect(bookingDetailsPage.isBookingDetailsPageOpened()).toBeTruthy();
     bookingDetailsPage.clickSelectFare(data.flight.fare);
     bookingDetailsPage.clickContinueWhenFareIsSelected();

     var bookingExtrasPage = new BookingExtrasPage();
     bookingExtrasPage.proceedToPayment();
     bookingExtrasPage.declineSeatsSelection();
   });

  it('should decline invalid card', function() {
    var paymentPage = new PaymentPage();
    paymentPage.fillPassengerInfo(data.order.passenger.title,
                                  data.order.passenger.name,
                                  data.order.passenger.surname);
    paymentPage.fillCardInfo(data.card.number,
                             data.card.type,
                             data.card.expiryMonth,
                             data.card.expiryYear,
                             data.card.cvv,
                             data.card.holderName);
    paymentPage.fiilBillingAddress(data.order.billingAddress.address1,
                                   data.order.billingAddress.city,
                                   data.order.billingAddress.postalCode);
    paymentPage.acceptTermsAndPay();
    expect(paymentPage.getErrorMessage()).toEqual('Oh. There was a problem');
    expect(paymentPage.getPaymentErrorDetails()).toContain('your payment was not authorised')
  });
});
