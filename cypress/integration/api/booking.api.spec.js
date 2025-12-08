import { testData } from '../../test-data/booking.test-data.js';
import { AdminUser, StandardUser } from '../../sensitive-data/test-users.json';
import { apiBooking } from '../../support/l10n.json';

describe('RestfulBooker.Booking: Given No preconditions', () => {
  let createdBooking;
  let authToken;
  let idsForCleanUp = [];

  const cleanUp = (ids) => {
    ids.forEach((id) => {
      cy.deleteBooking_DELETE(authToken, id);
    });
  };

  after(() => {
    cleanUp(idsForCleanUp);
  });

  context('RestfulBooker.Auth.POST: When valid credentials are provided', () => {
    it('RestfulBooker.Auth.POST: Then authentication token is generated', () => {
      cy.createToken_POST(AdminUser).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('token');
        expect(response.body.token).to.be.a('string');
        expect(response.body.token).to.have.length.greaterThan(0);
        authToken = response.body.token;
      });
    });
  });

  context('RestfulBooker.Auth.POST: When invalid credentials are provided', () => {
    //TODO: fix the bug api_auth_POST_failedAuthenticationStatusCode: https://github.com/NatalliaSavitskaya/Cypress/issues/55
    it('RestfulBooker.Auth.POST: Then the error message is displayed', () => {
      cy.createToken_POST(StandardUser).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('reason');
        expect(response.body.reason).to.eq(apiBooking.errors.badCredentials);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When create booking with valid data', () => {
    it('RestfulBooker.Booking.POST: Then Apartments are booked', () => {
      cy.createBooking_POST(testData.validBooking).then((response) => {
        createdBooking = response.body;
        cy.log(`Booking created: ${JSON.stringify(createdBooking, null, 2)}`);
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('bookingid');
        expect(response.body).to.have.property('booking');
        expect(response.body.booking).to.deep.equal(testData.validBooking);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When create booking with empty Firstname', () => {
    // TODO: fix the bug api_createBooking_POST_emptyFieldValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/17
    it('RestfulBooker.CreateBooking.POST: Then Apartments are booked with empty Firstname', () => {
      cy.log(`Booking created: ${JSON.stringify(testData.emptyFirstnameBooking, null, 2)}`);
      cy.createBooking_POST(testData.emptyFirstnameBooking).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.booking).to.deep.equal(testData.emptyFirstnameBooking);
        idsForCleanUp.push(response.body.bookingid);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When create booking with empty Lastname', () => {
    // TODO: fix the bug api_createBooking_POST_emptyFieldValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/17
    it('RestfulBooker.CreateBooking.POST: Then Apartments are booked with empty Lastname', () => {
      cy.log(`Booking created: ${JSON.stringify(testData.emptyLastnameBooking, null, 2)}`);
      cy.createBooking_POST(testData.emptyLastnameBooking).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.booking).to.deep.equal(testData.emptyLastnameBooking);
        idsForCleanUp.push(response.body.bookingid);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When create booking with empty TotalPrice', () => {
    // TODO: fix the bug api_createBooking_POST_emptyFieldValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/17
    it('RestfulBooker.CreateBooking.POST: Then Apartments are booked with null in TotalPrice', () => {
      cy.log(`Booking created: ${JSON.stringify(testData.emptyTotalPriceBooking, null, 2)}`);
      cy.createBooking_POST(testData.emptyTotalPriceBooking).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.booking.firstname).to.eq(testData.emptyTotalPriceBooking.firstname);
        expect(response.body.booking.lastname).to.eq(testData.emptyTotalPriceBooking.lastname);
        expect(response.body.booking.totalprice).is.null;
        expect(response.body.booking.depositpaid).to.eq(testData.emptyTotalPriceBooking.depositpaid);
        expect(response.body.booking.bookingdates.checkin).to.eq(testData.emptyTotalPriceBooking.bookingdates.checkin);
        expect(response.body.booking.bookingdates.checkout).to.eq(testData.emptyTotalPriceBooking.bookingdates.checkout);
        expect(response.body.booking.additionalneeds).to.eq(testData.emptyTotalPriceBooking.additionalneeds);
        idsForCleanUp.push(response.body.bookingid);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When create booking with empty DepositPaid', () => {
    // TODO: fix the bug api_createBooking_POST_emptyFieldValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/17
    it('RestfulBooker.CreateBooking.POST: Then Apartments are booked with empty DepositPaid', () => {
      cy.log(`Booking created: ${JSON.stringify(testData.emptyDepositPaid, null, 2)}`);
      cy.createBooking_POST(testData.emptyDepositPaid).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.booking.firstname).to.eq(testData.emptyDepositPaid.firstname);
        expect(response.body.booking.lastname).to.eq(testData.emptyDepositPaid.lastname);
        expect(response.body.booking.totalprice).to.eq(testData.emptyDepositPaid.totalprice);
        expect(response.body.booking.depositpaid).to.eq(false);
        expect(response.body.booking.bookingdates.checkin).to.eq(testData.emptyDepositPaid.bookingdates.checkin);
        expect(response.body.booking.bookingdates.checkout).to.eq(testData.emptyDepositPaid.bookingdates.checkout);
        expect(response.body.booking.additionalneeds).to.eq(testData.emptyDepositPaid.additionalneeds);
        idsForCleanUp.push(response.body.bookingid);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When create booking with empty Checkin', () => {
    // TODO: fix the bug api_createBooking_POST_emptyFieldValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/17
    it('RestfulBooker.CreateBooking.POST: Then Apartments are booked with empty Checkin', () => {
      cy.log(`Booking created: ${JSON.stringify(testData.emptyCheckinBooking, null, 2)}`);
      cy.createBooking_POST(testData.emptyCheckinBooking).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.booking.firstname).to.eq(testData.emptyCheckinBooking.firstname);
        expect(response.body.booking.lastname).to.eq(testData.emptyCheckinBooking.lastname);
        expect(response.body.booking.totalprice).to.eq(testData.emptyCheckinBooking.totalprice);
        expect(response.body.booking.depositpaid).to.eq(testData.emptyCheckinBooking.depositpaid);
        expect(response.body.booking.bookingdates.checkin).to.eq(apiBooking.defaultValues.noneDate);
        expect(response.body.booking.bookingdates.checkout).to.eq(testData.emptyCheckinBooking.bookingdates.checkout);
        expect(response.body.booking.additionalneeds).to.eq(testData.emptyCheckinBooking.additionalneeds);
        idsForCleanUp.push(response.body.bookingid);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When create booking with empty Checkout', () => {
    // TODO: fix the bug api_createBooking_POST_emptyFieldValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/17
    it('RestfulBooker.CreateBooking.POST: Then Apartments are booked with empty Checkout', () => {
      cy.log(`Booking created: ${JSON.stringify(testData.emptyCheckoutBooking, null, 2)}`);
      cy.createBooking_POST(testData.emptyCheckoutBooking).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.booking.firstname).to.eq(testData.emptyCheckoutBooking.firstname);
        expect(response.body.booking.lastname).to.eq(testData.emptyCheckoutBooking.lastname);
        expect(response.body.booking.totalprice).to.eq(testData.emptyCheckoutBooking.totalprice);
        expect(response.body.booking.depositpaid).to.eq(testData.emptyCheckoutBooking.depositpaid);
        expect(response.body.booking.bookingdates.checkin).to.eq(testData.emptyCheckoutBooking.bookingdates.checkin);
        expect(response.body.booking.bookingdates.checkout).to.eq(apiBooking.defaultValues.noneDate);
        expect(response.body.booking.additionalneeds).to.eq(testData.emptyCheckoutBooking.additionalneeds);
        idsForCleanUp.push(response.body.bookingid);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When create booking with empty AdditionalNeeds', () => {
    // TODO: fix the bug api_createBooking_POST_emptyFieldValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/17
    it('RestfulBooker.CreateBooking.POST: Then Apartments are booked with empty AdditionalNeeds', () => {
      cy.log(`Booking created: ${JSON.stringify(testData.emptyAdditionalNeedsBooking, null, 2)}`);
      cy.createBooking_POST(testData.emptyAdditionalNeedsBooking).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.booking).to.deep.equal(testData.emptyAdditionalNeedsBooking);
        idsForCleanUp.push(response.body.bookingid);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When create booking with no Firstname in the body', () => {
    it('RestfulBooker.CreateBooking.POST: Then the error is displayed', () => {
      cy.createBooking_POST(testData.noFirstnameBooking, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.equal(apiBooking.errors.internalServerError);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When create booking with no Lastname in the body', () => {
    it('RestfulBooker.CreateBooking.POST: Then the error is displayed', () => {
      cy.createBooking_POST(testData.noLastnameBooking, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.equal(apiBooking.errors.internalServerError);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When create booking with no TotalPrice in the body', () => {
    it('RestfulBooker.CreateBooking.POST: Then the error is displayed', () => {
      cy.createBooking_POST(testData.noTotalPriceBooking, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.equal(apiBooking.errors.internalServerError);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When create booking with no DepositPaid in the body', () => {
    it('RestfulBooker.CreateBooking.POST: Then the error is displayed', () => {
      cy.createBooking_POST(testData.noDepositPaid, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.equal(apiBooking.errors.internalServerError);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When create booking with no Checkin in the body', () => {
    it('RestfulBooker.CreateBooking.POST: Then the error is displayed', () => {
      cy.createBooking_POST(testData.noCheckinBooking, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.equal(apiBooking.errors.internalServerError);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When create booking with no Checkout in the body', () => {
    it('RestfulBooker.CreateBooking.POST: Then the error is displayed', () => {
      cy.createBooking_POST(testData.noCheckoutBooking, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.equal(apiBooking.errors.internalServerError);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When create booking with no AdditionalNeeds in the body', () => {
    it('RestfulBooker.CreateBooking.POST: Then the Apartments are booked with no AdditionalNeeds', () => {
      cy.createBooking_POST(testData.noAdditionalNeedsBooking).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.booking).to.deep.equal(testData.noAdditionalNeedsBooking);
        idsForCleanUp.push(response.body.bookingid);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When create booking with invalid datatype in Firstname', () => {
    it('RestfulBooker.CreateBooking.POST: Then the error is displayed', () => {
      cy.createBooking_POST(testData.invalidTypeFirstnameBooking, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.equal(apiBooking.errors.internalServerError);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When create booking with invalid datatype in Lastname', () => {
    it('RestfulBooker.CreateBooking.POST: Then the error is displayed', () => {
      cy.createBooking_POST(testData.invalidTypeLastnameBooking, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.equal(apiBooking.errors.internalServerError);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When create booking with invalid datatype in TotalPrice', () => {
    // TODO: fix the bug api_createBooking_POST_invalidFieldDataTypeValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/45
    it('RestfulBooker.CreateBooking.POST: Then the Apartments are booked with null in TotalPrice', () => {
      cy.createBooking_POST(testData.invalidTypeTotalPriceBooking).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.booking.firstname).to.eq(testData.invalidTypeTotalPriceBooking.firstname);
        expect(response.body.booking.lastname).to.eq(testData.invalidTypeTotalPriceBooking.lastname);
        expect(response.body.booking.totalprice).to.be.null;
        expect(response.body.booking.depositpaid).to.eq(testData.invalidTypeTotalPriceBooking.depositpaid);
        expect(response.body.booking.bookingdates.checkin).to.eq(testData.invalidTypeTotalPriceBooking.bookingdates.checkin);
        expect(response.body.booking.bookingdates.checkout).to.eq(testData.invalidTypeTotalPriceBooking.bookingdates.checkout);
        expect(response.body.booking.additionalneeds).to.eq(testData.invalidTypeTotalPriceBooking.additionalneeds);
        idsForCleanUp.push(response.body.bookingid);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When create booking with invalid datatype in DepositPaid', () => {
    // TODO: fix the bug api_createBooking_POST_invalidFieldDataTypeValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/45
    it('RestfulBooker.CreateBooking.POST: Then the Apartments are booked with true value in DepositPaid', () => {
      cy.createBooking_POST(testData.invalidTypeDepositPaid).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.booking.firstname).to.eq(testData.invalidTypeDepositPaid.firstname);
        expect(response.body.booking.lastname).to.eq(testData.invalidTypeDepositPaid.lastname);
        expect(response.body.booking.totalprice).to.eq(testData.invalidTypeDepositPaid.totalprice);
        expect(response.body.booking.depositpaid).to.eq(true);
        expect(response.body.booking.bookingdates.checkin).to.eq(testData.invalidTypeDepositPaid.bookingdates.checkin);
        expect(response.body.booking.bookingdates.checkout).to.eq(testData.invalidTypeDepositPaid.bookingdates.checkout);
        expect(response.body.booking.additionalneeds).to.eq(testData.invalidTypeDepositPaid.additionalneeds);
        idsForCleanUp.push(response.body.bookingid);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When create booking with invalid datatype in Checkin', () => {
    // TODO: fix the bug api_createBooking_POST_invalidFieldDataTypeValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/45
    it('RestfulBooker.CreateBooking.POST: Then the Apartments are booked with "1970-01-01" in checkin', () => {
      cy.createBooking_POST(testData.invalidTypeCheckinBooking).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.booking.firstname).to.eq(testData.invalidTypeCheckinBooking.firstname);
        expect(response.body.booking.lastname).to.eq(testData.invalidTypeCheckinBooking.lastname);
        expect(response.body.booking.totalprice).to.eq(testData.invalidTypeCheckinBooking.totalprice);
        expect(response.body.booking.depositpaid).to.eq(testData.invalidTypeCheckinBooking.depositpaid);
        expect(response.body.booking.bookingdates.checkin).to.eq(apiBooking.defaultValues.defaultDate);
        expect(response.body.booking.bookingdates.checkout).to.eq(testData.invalidTypeCheckinBooking.bookingdates.checkout);
        expect(response.body.booking.additionalneeds).to.eq(testData.invalidTypeCheckinBooking.additionalneeds);
        idsForCleanUp.push(response.body.bookingid);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When create booking with invalid datatype in Checkout', () => {
    // TODO: fix the bug api_createBooking_POST_invalidFieldDataTypeValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/45
    it('RestfulBooker.CreateBooking.POST: Then the Apartments are booked with "1970-01-01" in checkout', () => {
      cy.createBooking_POST(testData.invalidTypeCheckoutBooking).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.booking.firstname).to.eq(testData.invalidTypeCheckoutBooking.firstname);
        expect(response.body.booking.lastname).to.eq(testData.invalidTypeCheckoutBooking.lastname);
        expect(response.body.booking.totalprice).to.eq(testData.invalidTypeCheckoutBooking.totalprice);
        expect(response.body.booking.depositpaid).to.eq(testData.invalidTypeCheckoutBooking.depositpaid);
        expect(response.body.booking.bookingdates.checkin).to.eq(testData.invalidTypeCheckoutBooking.bookingdates.checkin);
        expect(response.body.booking.bookingdates.checkout).to.eq(apiBooking.defaultValues.defaultDate);
        expect(response.body.booking.additionalneeds).to.eq(testData.invalidTypeCheckoutBooking.additionalneeds);
        idsForCleanUp.push(response.body.bookingid);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When create booking with invalid datatype in AdditionalNeeds', () => {
    // TODO: fix the bug api_createBooking_POST_invalidFieldDataTypeValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/45
    it('RestfulBooker.CreateBooking.POST: Then the Apartments are booked with no AdditionalNeeds', () => {
      cy.createBooking_POST(testData.invalidTypeAdditionalNeedsBooking).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.booking).to.deep.equal(testData.invalidTypeAdditionalNeedsBooking);
        idsForCleanUp.push(response.body.bookingid);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When create booking with negative number in TotalPrice', () => {
    //TODO: fix the bug api_createBooking_POST_negativeTotalPrice: https://github.com/NatalliaSavitskaya/Cypress/issues/53
    it('RestfulBooker.CreateBooking.POST: Then the booking is created with negative TotalPrice', () => {
      cy.createBooking_POST(testData.negativeTotalPriceBooking).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.booking).to.deep.equal(testData.negativeTotalPriceBooking);
        idsForCleanUp.push(response.body.bookingid);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When create booking with Checkin later than CheckOut', () => {
    // TODO: fix the bug api_createBooking_POST_CheckInMoreThanCheckOutValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/27
    it('RestfulBooker.CreateBooking.POST: Then the Apartments are booked', () => {
      cy.createBooking_POST(testData.checkInMoreThanCheckOutBooking).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.booking).to.deep.equal(testData.checkInMoreThanCheckOutBooking);
        idsForCleanUp.push(response.body.bookingid);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When create booking with Checkin equal to CheckOut', () => {
    // TODO: fix the bug api_createBooking_POST_CheckInEqualCheckOutValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/28
    it('RestfulBooker.CreateBooking.POST: Then the Apartments are booked', () => {
      cy.createBooking_POST(testData.checkInEqualCheckOutBooking).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.booking).to.deep.equal(testData.checkInEqualCheckOutBooking);
        idsForCleanUp.push(response.body.bookingid);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When create booking with Checkin in the past', () => {
    // TODO: fix the bug api_createBooking_POST_CheckInInThePastValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/48
    it('RestfulBooker.CreateBooking.POST: Then the Apartments are booked', () => {
      cy.createBooking_POST(testData.checkInInThePastBooking).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.booking).to.deep.equal(testData.checkInInThePastBooking);
        idsForCleanUp.push(response.body.bookingid);
      });
    });
  });

  context('RestfulBooker.GetBookingIds.GET: When search for all bookings', () => {
    it('RestfulBooker.GetBookingIds.GET: Then all unique booking IDs are found', () => {
      cy.getBookingIds_GET().then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
        const ids = response.body.map((b) => b.bookingid);
        expect(ids).to.include(createdBooking.bookingid);
      });
    });
  });

  context('RestfulBooker.GetBooking.GET: When search for a specific booking by bookingId', () => {
    it('RestfulBooker.GetBooking.GET: Then the booking is found', () => {
      cy.getBooking_GET(createdBooking.bookingid).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.firstname).to.eq(createdBooking.booking.firstname);
        expect(response.body.lastname).to.eq(createdBooking.booking.lastname);
        expect(response.body.totalprice).to.eq(createdBooking.booking.totalprice);
        expect(response.body.depositpaid).to.eq(createdBooking.booking.depositpaid);
        expect(response.body.bookingdates.checkin).to.eq(createdBooking.booking.bookingdates.checkin);
        expect(response.body.bookingdates.checkout).to.eq(createdBooking.booking.bookingdates.checkout);
        expect(response.body.additionalneeds).to.eq(createdBooking.booking.additionalneeds);
      });
    });
  });

  context('RestfulBooker.GetBooking.GET: When search for booking by non-existing bookingId', () => {
    it('RestfulBooker.GetBooking.GET: Then the error is displayed', () => {
      cy.getBooking_GET(0, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body).to.eq(apiBooking.errors.notFound);
      });
    });
  });

  context('RestfulBooker.GetBookingIds.GET: When search for all bookings by firstname', () => {
    it('RestfulBooker.GetBookingIds.GET: Then all IDs with such firstname are found', () => {
      cy.getBookingIds_GET({ firstname: createdBooking.booking.firstname }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
        const ids = response.body.map((b) => b.bookingid);
        expect(ids).to.include(createdBooking.bookingid);
        cy.getBooking_GET(createdBooking.bookingid).then((response) => {
          expect(response.body.firstname).to.eq(createdBooking.booking.firstname);
        });
      });
    });
  });

  context('RestfulBooker.GetBookingIds.GET: When search for all bookings by lastname', () => {
    it('RestfulBooker.GetBookingIds.GET: Then all IDs with such lastname are found', () => {
      cy.getBookingIds_GET({ lastname: createdBooking.booking.lastname }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
        const ids = response.body.map((b) => b.bookingid);
        expect(ids).to.include(createdBooking.bookingid);
        cy.getBooking_GET(createdBooking.bookingid).then((response) => {
          expect(response.body.lastname).to.eq(createdBooking.booking.lastname);
        });
      });
    });
  });

  context('RestfulBooker.GetBookingIds.GET: When search for all bookings by checkin', () => {
    // TODO: fix the bug api_getBookingIds_GET_searchByCheckin: https://github.com/NatalliaSavitskaya/Cypress/issues/29
    it.skip('RestfulBooker.GetBookingIds.GET: Then all IDs with later or equal checkin value are found', () => {
      cy.getBookingIds_GET({ checkin: createdBooking.booking.bookingdates.checkin }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
        const ids = response.body.map((b) => b.bookingid);
        expect(ids).to.include(createdBooking.bookingid);
      });
    });
  });

  context('RestfulBooker.GetBookingIds.GET: When search for all bookings by checkout', () => {
    // TODO: fix the bug api_getBookingIds_GET_searchByCheckout: https://github.com/NatalliaSavitskaya/Cypress/issues/30
    it('RestfulBooker.GetBookingIds.GET: Then all IDs with later or equal checkout value are got', () => {
      cy.getBookingIds_GET({ checkout: createdBooking.booking.bookingdates.checkout }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
        const ids = response.body.map((b) => b.bookingid);
        expect(ids).to.include(createdBooking.bookingid);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When partially update the booking - the Firstname with valid value', () => {
    it('RestfulBooker.UpdateBooking.PATCH: Then the booking is updated with the new value in Firstname', () => {
      cy.partialUpdateBooking_PATCH(authToken, createdBooking.bookingid, { firstname: testData.updatedValidBooking.firstname }).then((response) => {
        cy.log(`Updated Firstname from **${testData.validBooking.firstname}** to **${testData.updatedValidBooking.firstname}**`);
        expect(response.status).to.eq(200);
        expect(response.body.firstname).to.eq(testData.updatedValidBooking.firstname);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When partially update the booking - the Lastname with valid value', () => {
    it('RestfulBooker.UpdateBooking.PATCH: Then the booking is updated with the new value in Lastname', () => {
      cy.partialUpdateBooking_PATCH(authToken, createdBooking.bookingid, { lastname: testData.updatedValidBooking.lastname }).then((response) => {
        cy.log(`Updated Lastname from **${testData.validBooking.lastname}** to **${testData.updatedValidBooking.lastname}**`);
        expect(response.status).to.eq(200);
        expect(response.body.lastname).to.eq(testData.updatedValidBooking.lastname);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When partially update the booking - the TotalPrice with valid value', () => {
    it('RestfulBooker.UpdateBooking.PATCH: Then the booking is updated with the new value in TotalPrice', () => {
      cy.partialUpdateBooking_PATCH(authToken, createdBooking.bookingid, { totalprice: testData.updatedValidBooking.totalprice }).then((response) => {
        cy.log(`Updated TotalPrice from **${testData.validBooking.totalprice}** to **${testData.updatedValidBooking.totalprice}**`);
        expect(response.status).to.eq(200);
        expect(response.body.totalprice).to.eq(testData.updatedValidBooking.totalprice);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When partially update the booking - the BookingDates with valid value', () => {
    it('RestfulBooker.UpdateBooking.PATCH: Then the booking is updated with the new value in BookingDates', () => {
      cy.partialUpdateBooking_PATCH(authToken, createdBooking.bookingid, { bookingdates: testData.updatedValidBooking.bookingdates }).then((response) => {
        cy.log(`Updated BookingDates from **${testData.validBooking.bookingdates.checkin}**, **${testData.validBooking.bookingdates.checkout}**
         to **${testData.updatedValidBooking.bookingdates.checkin}**, **${testData.updatedValidBooking.bookingdates.checkout}**`);
        expect(response.status).to.eq(200);
        expect(response.body.bookingdates.checkin).to.eq(testData.updatedValidBooking.bookingdates.checkin);
        expect(response.body.bookingdates.checkout).to.eq(testData.updatedValidBooking.bookingdates.checkout);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When partially update the booking - the AdditionalNeeds with valid value', () => {
    it('RestfulBooker.UpdateBooking.PATCH: Then the booking is updated with the new value in AdditionalNeeds', () => {
      cy.partialUpdateBooking_PATCH(authToken, createdBooking.bookingid, { additionalneeds: testData.updatedValidBooking.additionalneeds }).then((response) => {
        cy.log(`Updated AdditionalNeeds from **${testData.validBooking.additionalneeds}** to **${testData.updatedValidBooking.additionalneeds}**`);
        expect(response.status).to.eq(200);
        expect(response.body.additionalneeds).to.eq(testData.updatedValidBooking.additionalneeds);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When partially update the booking - the Firstname with empty value', () => {
    // TODO: fix the bug api_updateBooking_PATCH_emptyFieldValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/33
    it('RestfulBooker.UpdateBooking.PATCH: Then the booking is updated with the empty value in Firstname', () => {
      cy.partialUpdateBooking_PATCH(authToken, createdBooking.bookingid, { firstname: '' }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.firstname).to.eq('');
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When partially update the booking - the Lastname with empty value', () => {
    // TODO: fix the bug api_updateBooking_PATCH_emptyFieldValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/33
    it('RestfulBooker.UpdateBooking.PATCH: Then the booking is updated with the empty value in Lastname', () => {
      cy.partialUpdateBooking_PATCH(authToken, createdBooking.bookingid, { lastname: '' }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.lastname).to.eq('');
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When partially update the booking - the TotalPrice with empty value', () => {
    // TODO: fix the bug api_updateBooking_PATCH_emptyFieldValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/33
    it('RestfulBooker.UpdateBooking.PATCH: Then the booking is updated with null value in TotalPrice', () => {
      cy.partialUpdateBooking_PATCH(authToken, createdBooking.bookingid, { totalprice: '' }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.totalprice).to.be.null;
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When partially update the booking - the DepositPaid with empty value', () => {
    // TODO: fix the bug api_updateBooking_PATCH_emptyFieldValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/33
    it('RestfulBooker.UpdateBooking.PATCH: Then the booking is updated with false value in DepositPaid', () => {
      cy.partialUpdateBooking_PATCH(authToken, createdBooking.bookingid, { depositpaid: '' }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.depositpaid).to.eq(false);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When partially update the booking - the BookingDates with empty value', () => {
    // TODO: fix the bug api_updateBooking_PATCH_emptyFieldValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/33
    it('RestfulBooker.UpdateBooking.PATCH: Then the booking is updated with 0NaN-aN-aN value in BookingDates', () => {
      cy.partialUpdateBooking_PATCH(authToken, createdBooking.bookingid, { bookingdates: '' }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.bookingdates.checkin).to.eq(apiBooking.defaultValues.noneDate);
        expect(response.body.bookingdates.checkout).to.eq(apiBooking.defaultValues.noneDate);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When partially update the booking - the AdditionalNeeds with empty value', () => {
    // TODO: fix the bug api_updateBooking_PATCH_emptyFieldValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/33
    it('RestfulBooker.UpdateBooking.PATCH: Then the booking is updated with the empty value in AdditionalNeeds', () => {
      cy.partialUpdateBooking_PATCH(authToken, createdBooking.bookingid, { additionalneeds: '' }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.additionalneeds).to.eq('');
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When partially update the booking - the Firstname with invalid datatype value', () => {
    // TODO: fix the bug api_updateBooking_PATCH_invalidFirstnameDataTypeValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/39
    it('RestfulBooker.UpdateBooking.PATCH: Then the booking is updated with the new value in Firstname', () => {
      cy.partialUpdateBooking_PATCH(authToken, createdBooking.bookingid, { firstname: testData.invalidTypeFirstnameBooking.firstname }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.firstname).to.eq(testData.invalidTypeFirstnameBooking.firstname);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When partially update the booking - the Lastname with invalid datatype value', () => {
    // TODO: fix the bug api_updateBooking_PATCH_invalidFirstnameDataTypeValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/39
    it('RestfulBooker.UpdateBooking.PATCH: Then the booking is updated with the new value in Lastname', () => {
      cy.partialUpdateBooking_PATCH(authToken, createdBooking.bookingid, { lastname: testData.invalidTypeLastnameBooking.lastname }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.lastname).to.eq(testData.invalidTypeLastnameBooking.lastname);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When partially update the booking - the TotalPrice with invalid datatype value', () => {
    // TODO: fix the bug api_updateBooking_PATCH_invalidFirstnameDataTypeValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/39
    it('RestfulBooker.UpdateBooking.PATCH: Then the booking is updated with null value in TotalPrice', () => {
      cy.partialUpdateBooking_PATCH(authToken, createdBooking.bookingid, { totalprice: testData.invalidTypeTotalPriceBooking.totalprice }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.totalprice).to.be.null;
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When partially update the booking - the DepositPaid with invalid datatype value', () => {
    // TODO: fix the bug api_updateBooking_PATCH_invalidFirstnameDataTypeValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/39
    it('RestfulBooker.UpdateBooking.PATCH: Then the booking is updated with true value in DepositPaid', () => {
      cy.partialUpdateBooking_PATCH(authToken, createdBooking.bookingid, { depositpaid: testData.invalidTypeDepositPaid.depositpaid }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.depositpaid).to.eq(true);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When partially update the booking - the BookingDates with invalid datatype value', () => {
    // TODO: fix the bug api_updateBooking_PATCH_invalidFirstnameDataTypeValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/39
    it('RestfulBooker.UpdateBooking.PATCH: Then the booking is updated with 1970-01-01 value in BookingDates', () => {
      cy.partialUpdateBooking_PATCH(authToken, createdBooking.bookingid, {
        bookingdates: {
          checkin: testData.invalidTypeCheckinBooking.bookingdates.checkin,
          checkout: testData.invalidTypeCheckoutBooking.bookingdates.checkout,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.bookingdates.checkin).to.eq(apiBooking.defaultValues.defaultDate);
        expect(response.body.bookingdates.checkout).to.eq(apiBooking.defaultValues.defaultDate);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When partially update the booking - the AdditionalNeeds with invalid datatype value', () => {
    // TODO: fix the bug api_updateBooking_PATCH_invalidFirstnameDataTypeValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/39
    it('RestfulBooker.UpdateBooking.PATCH: Then the booking is updated with the new value in AdditionalNeeds', () => {
      cy.partialUpdateBooking_PATCH(authToken, createdBooking.bookingid, { additionalneeds: testData.invalidTypeAdditionalNeedsBooking.additionalneeds }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.additionalneeds).to.eq(testData.invalidTypeAdditionalNeedsBooking.additionalneeds);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When partially update the booking - booking with negative number in TotalPrice', () => {
    it('RestfulBooker.UpdateBooking.PATCH: Then the booking is updated with the negative price', () => {
      cy.partialUpdateBooking_PATCH(authToken, createdBooking.bookingid, { totalprice: testData.negativeTotalPriceBooking.totalprice }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.totalprice).to.eq(testData.negativeTotalPriceBooking.totalprice);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When partially update the booking - checkin to the value that is later than checkout', () => {
    // TODO: fix the bug api_updateBooking_PATCH_checkInMoreThanCheckOutValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/50
    it('RestfulBooker.UpdateBooking.PATCH: Then the booking is updated with new values in BookingDates', () => {
      cy.partialUpdateBooking_PATCH(authToken, createdBooking.bookingid, {
        bookingdates: {
          checkin: testData.checkInMoreThanCheckOutBooking.bookingdates.checkin,
          checkout: testData.checkInMoreThanCheckOutBooking.bookingdates.checkout,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.bookingdates.checkin).to.eq(testData.checkInMoreThanCheckOutBooking.bookingdates.checkin);
        expect(response.body.bookingdates.checkout).to.eq(testData.checkInMoreThanCheckOutBooking.bookingdates.checkout);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When partially update the booking - checkin to the value in the past', () => {
    // TODO: fix the bug api_updateBooking_PATCH_checkInInThePastValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/49
    it('RestfulBooker.UpdateBooking.PATCH: Then the booking is updated with new values in BookingDates', () => {
      cy.partialUpdateBooking_PATCH(authToken, createdBooking.bookingid, {
        bookingdates: {
          checkin: testData.checkInInThePastBooking.bookingdates.checkin,
          checkout: testData.checkInInThePastBooking.bookingdates.checkout,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.bookingdates.checkin).to.eq(testData.checkInInThePastBooking.bookingdates.checkin);
        expect(response.body.bookingdates.checkout).to.eq(testData.checkInInThePastBooking.bookingdates.checkout);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When partially update the booking - checkin to the value equal to checkout', () => {
    // TODO: fix the bug api_updateBooking_PATCH_checkInEqualCheckOutValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/51
    it('RestfulBooker.UpdateBooking.PATCH: Then the booking is updated with new values in BookingDates', () => {
      cy.partialUpdateBooking_PATCH(authToken, createdBooking.bookingid, {
        bookingdates: {
          checkin: testData.checkInEqualCheckOutBooking.bookingdates.checkin,
          checkout: testData.checkInEqualCheckOutBooking.bookingdates.checkout,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.bookingdates.checkin).to.eq(testData.checkInEqualCheckOutBooking.bookingdates.checkin);
        expect(response.body.bookingdates.checkout).to.eq(testData.checkInEqualCheckOutBooking.bookingdates.checkout);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When partially update the booking with non-existing Id', () => {
    it('RestfulBooker.UpdateBooking.PATCH: Then the error message is displayed', () => {
      cy.partialUpdateBooking_PATCH(authToken, 0, { totalprice: testData.validBooking.totalprice }, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(405);
        expect(response.body).to.eq(apiBooking.errors.methodNotAllowed);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When partially update without authentication', () => {
    it('RestfulBooker.UpdateBooking.PATCH: Then the error message is displayed', () => {
      cy.partialUpdateBooking_PATCH('invalid-token', createdBooking.bookingid, { totalprice: testData.validBooking.totalprice }, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(403);
        expect(response.body).to.eq(apiBooking.errors.forbidden);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PUT: When update all the parameters in booking with valid values', () => {
    it('RestfulBooker.UpdateBooking.PUT: Then the booking is updated with the values', () => {
      cy.updateBooking_PUT(authToken, createdBooking.bookingid, testData.updatedValidBooking).then((response) => {
        cy.log(`Data for updating the booking:  ${JSON.stringify(testData.updatedValidBooking, null, 2)}`);
        expect(response.status).to.eq(200);
        expect(response.body).to.deep.equal(testData.updatedValidBooking);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PUT: When update the booking with valid parameters but leave the Firstname empty', () => {
    it('RestfulBooker.UpdateBooking.PUT: Then the booking is updated with the values', () => {
      cy.updateBooking_PUT(authToken, createdBooking.bookingid, testData.emptyFirstnameBooking).then((response) => {
        cy.log(`Data for updating the booking:  ${JSON.stringify(testData.emptyFirstnameBooking, null, 2)}`);
        expect(response.status).to.eq(200);
        expect(response.body).to.deep.equal(testData.emptyFirstnameBooking);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PUT: When update the booking with valid parameters but leave the Lastname empty', () => {
    it('RestfulBooker.UpdateBooking.PUT: Then the booking is updated with the values', () => {
      cy.updateBooking_PUT(authToken, createdBooking.bookingid, testData.emptyLastnameBooking).then((response) => {
        cy.log(`Data for updating the booking:  ${JSON.stringify(testData.emptyLastnameBooking, null, 2)}`);
        expect(response.status).to.eq(200);
        expect(response.body).to.deep.equal(testData.emptyLastnameBooking);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PUT: When update the booking with valid parameters but leave the TotalPrice empty', () => {
    it('RestfulBooker.UpdateBooking.PUT: Then the booking is updated with the new values and null in TotalPrice', () => {
      cy.updateBooking_PUT(authToken, createdBooking.bookingid, testData.emptyTotalPriceBooking).then((response) => {
        cy.log(`Data for updating the booking:  ${JSON.stringify(testData.emptyTotalPriceBooking, null, 2)}`);
        expect(response.status).to.eq(200);
        expect(response.body.firstname).to.eq(testData.emptyTotalPriceBooking.firstname);
        expect(response.body.lastname).to.eq(testData.emptyTotalPriceBooking.lastname);
        expect(response.body.totalprice).is.null;
        expect(response.body.depositpaid).to.eq(testData.emptyTotalPriceBooking.depositpaid);
        expect(response.body.bookingdates.checkin).to.eq(testData.emptyTotalPriceBooking.bookingdates.checkin);
        expect(response.body.bookingdates.checkout).to.eq(testData.emptyTotalPriceBooking.bookingdates.checkout);
        expect(response.body.additionalneeds).to.eq(testData.emptyTotalPriceBooking.additionalneeds);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PUT: When update the booking with valid parameters but leave DepositPaid empty', () => {
    it('RestfulBooker.UpdateBooking.PUT: Then the booking is updated with the new values and false DepositPaid', () => {
      cy.updateBooking_PUT(authToken, createdBooking.bookingid, testData.emptyDepositPaid).then((response) => {
        cy.log(`Data for updating the booking:  ${JSON.stringify(testData.emptyDepositPaid, null, 2)}`);
        expect(response.status).to.eq(200);
        expect(response.body.firstname).to.eq(testData.emptyDepositPaid.firstname);
        expect(response.body.lastname).to.eq(testData.emptyDepositPaid.lastname);
        expect(response.body.totalprice).to.eq(testData.emptyDepositPaid.totalprice);
        expect(response.body.depositpaid).to.eq(false);
        expect(response.body.bookingdates.checkin).to.eq(testData.emptyDepositPaid.bookingdates.checkin);
        expect(response.body.bookingdates.checkout).to.eq(testData.emptyDepositPaid.bookingdates.checkout);
        expect(response.body.additionalneeds).to.eq(testData.emptyDepositPaid.additionalneeds);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PUT: When update the booking with valid parameters but leave CheckIn empty', () => {
    it('RestfulBooker.UpdateBooking.PUT: Then the booking is updated with the new values and "0NaN-aN-aN" value in CheckIn', () => {
      cy.updateBooking_PUT(authToken, createdBooking.bookingid, testData.emptyCheckinBooking).then((response) => {
        cy.log(`Data for updating the booking:  ${JSON.stringify(testData.emptyCheckinBooking, null, 2)}`);
        expect(response.status).to.eq(200);
        expect(response.body.firstname).to.eq(testData.emptyCheckinBooking.firstname);
        expect(response.body.lastname).to.eq(testData.emptyCheckinBooking.lastname);
        expect(response.body.totalprice).to.eq(testData.emptyCheckinBooking.totalprice);
        expect(response.body.depositpaid).to.eq(testData.emptyCheckinBooking.depositpaid);
        expect(response.body.bookingdates.checkin).to.eq(apiBooking.defaultValues.noneDate);
        expect(response.body.bookingdates.checkout).to.eq(testData.emptyCheckinBooking.bookingdates.checkout);
        expect(response.body.additionalneeds).to.eq(testData.emptyCheckinBooking.additionalneeds);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PUT: When update the booking with valid parameters but leave CheckOut empty', () => {
    it('RestfulBooker.UpdateBooking.PUT: Then the booking is updated with the new values and "0NaN-aN-aN" value in CheckOut', () => {
      cy.updateBooking_PUT(authToken, createdBooking.bookingid, testData.emptyCheckoutBooking).then((response) => {
        cy.log(`Data for updating the booking:  ${JSON.stringify(testData.emptyCheckoutBooking, null, 2)}`);
        expect(response.status).to.eq(200);
        expect(response.body.firstname).to.eq(testData.emptyCheckoutBooking.firstname);
        expect(response.body.lastname).to.eq(testData.emptyCheckoutBooking.lastname);
        expect(response.body.totalprice).to.eq(testData.emptyCheckoutBooking.totalprice);
        expect(response.body.depositpaid).to.eq(testData.emptyCheckoutBooking.depositpaid);
        expect(response.body.bookingdates.checkin).to.eq(testData.emptyCheckoutBooking.bookingdates.checkin);
        expect(response.body.bookingdates.checkout).to.eq(apiBooking.defaultValues.noneDate);
        expect(response.body.additionalneeds).to.eq(testData.emptyCheckoutBooking.additionalneeds);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PUT: When update the booking with valid parameters but leave AdditionalNeeds empty', () => {
    it('RestfulBooker.UpdateBooking.PUT:  Then the booking is updated with the new values and empty AdditionalNeeds', () => {
      cy.updateBooking_PUT(authToken, createdBooking.bookingid, testData.emptyAdditionalNeedsBooking).then((response) => {
        cy.log(`Data for updating the booking:  ${JSON.stringify(testData.emptyAdditionalNeedsBooking, null, 2)}`);
        expect(response.status).to.eq(200);
        expect(response.body).to.deep.equal(testData.emptyAdditionalNeedsBooking);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PUT: When update the booking with invalid parameters - no Firstname', () => {
    it('RestfulBooker.UpdateBooking.PUT: Then the error message is displayed', () => {
      cy.updateBooking_PUT(authToken, createdBooking.bookingid, testData.noFirstnameBooking, { failOnStatusCode: false }).then((response) => {
        cy.log(`Data for updating the booking:  ${JSON.stringify(testData.noFirstnameBooking, null, 2)}`);
        expect(response.status).to.eq(400);
        expect(response.body).to.equal(apiBooking.errors.badRequest);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PUT: When update the booking with invalid parameters - no Lastname', () => {
    it('RestfulBooker.UpdateBooking.PUT: Then the error message is displayed', () => {
      cy.updateBooking_PUT(authToken, createdBooking.bookingid, testData.noLastnameBooking, { failOnStatusCode: false }).then((response) => {
        cy.log(`Data for updating the booking:  ${JSON.stringify(testData.noLastnameBooking, null, 2)}`);
        expect(response.status).to.eq(400);
        expect(response.body).to.equal(apiBooking.errors.badRequest);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PUT: When update the booking with invalid parameters - no TotalPrice', () => {
    it('RestfulBooker.UpdateBooking.PUT: Then the error message is displayed', () => {
      cy.updateBooking_PUT(authToken, createdBooking.bookingid, testData.noTotalPriceBooking, { failOnStatusCode: false }).then((response) => {
        cy.log(`Data for updating the booking:  ${JSON.stringify(testData.noTotalPriceBooking, null, 2)}`);
        expect(response.status).to.eq(400);
        expect(response.body).to.equal(apiBooking.errors.badRequest);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PUT: When update the booking with invalid parameters - no DepositPaid', () => {
    it('RestfulBooker.UpdateBooking.PUT: Then the error message is displayed', () => {
      cy.updateBooking_PUT(authToken, createdBooking.bookingid, testData.noDepositPaid, { failOnStatusCode: false }).then((response) => {
        cy.log(`Data for updating the booking:  ${JSON.stringify(testData.noDepositPaid, null, 2)}`);
        expect(response.status).to.eq(400);
        expect(response.body).to.equal(apiBooking.errors.badRequest);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PUT: When update the booking with invalid parameters - no Checkin', () => {
    it('RestfulBooker.UpdateBooking.PUT: Then the error message is displayed', () => {
      cy.updateBooking_PUT(authToken, createdBooking.bookingid, testData.noCheckinBooking, { failOnStatusCode: false }).then((response) => {
        cy.log(`Data for updating the booking:  ${JSON.stringify(testData.noCheckinBooking, null, 2)}`);
        expect(response.status).to.eq(400);
        expect(response.body).to.equal(apiBooking.errors.badRequest);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PUT: When update the booking with invalid parameters - no Checkout', () => {
    it('RestfulBooker.UpdateBooking.PUT: Then the error message is displayed', () => {
      cy.updateBooking_PUT(authToken, createdBooking.bookingid, testData.noCheckoutBooking, { failOnStatusCode: false }).then((response) => {
        cy.log(`Data for updating the booking:  ${JSON.stringify(testData.noCheckoutBooking, null, 2)}`);
        expect(response.status).to.eq(400);
        expect(response.body).to.equal(apiBooking.errors.badRequest);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PUT: When update the booking with invalid parameters - no AdditionalNeeds', () => {
    it('RestfulBooker.UpdateBooking.PUT: Then the booking is updated with new values for all parameters with empty AdditionalNeeds value', () => {
      cy.updateBooking_PUT(authToken, createdBooking.bookingid, testData.noAdditionalNeedsBooking).then((response) => {
        cy.log(`Data for updating the booking:  ${JSON.stringify(testData.noAdditionalNeedsBooking, null, 2)}`);
        expect(response.status).to.eq(200);
        expect(response.body.firstname).to.eq(testData.noAdditionalNeedsBooking.firstname);
        expect(response.body.lastname).to.eq(testData.noAdditionalNeedsBooking.lastname);
        expect(response.body.totalprice).to.eq(testData.noAdditionalNeedsBooking.totalprice);
        expect(response.body.depositpaid).to.eq(testData.noAdditionalNeedsBooking.depositpaid);
        expect(response.body.bookingdates.checkin).to.eq(testData.noAdditionalNeedsBooking.bookingdates.checkin);
        expect(response.body.bookingdates.checkout).to.eq(testData.noAdditionalNeedsBooking.bookingdates.checkout);
        expect(response.body.additionalneeds).to.eq('');
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PUT: When update the booking - the Firstname with invalid datatype value', () => {
    it('RestfulBooker.UpdateBooking.PUT: Then the error message is displayed', () => {
      cy.updateBooking_PUT(authToken, createdBooking.bookingid, testData.invalidTypeFirstnameBooking, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(apiBooking.errors.internalServerError);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PUT: When update the booking - the Lastname with invalid datatype value', () => {
    it('RestfulBooker.UpdateBooking.PATCH: Then the error message is displayed', () => {
      cy.updateBooking_PUT(authToken, createdBooking.bookingid, testData.invalidTypeLastnameBooking, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(apiBooking.errors.internalServerError);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PUT: When update the booking - the TotalPrice with invalid datatype value', () => {
    // TODO: fix the bug api_updateBooking_PUT_invalidDataTypeValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/54
    it('RestfulBooker.UpdateBooking.PUT: Then the booking is updated with null value in TotalPrice', () => {
      cy.updateBooking_PUT(authToken, createdBooking.bookingid, testData.invalidTypeTotalPriceBooking).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.totalprice).to.be.null;
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PUT: When update the booking - the DepositPaid with invalid datatype value', () => {
    // TODO: fix the bug api_updateBooking_PUT_invalidDataTypeValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/54
    it('RestfulBooker.UpdateBooking.PUT: Then the booking is updated with true value in DepositPaid', () => {
      cy.updateBooking_PUT(authToken, createdBooking.bookingid, testData.invalidTypeDepositPaid).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.depositpaid).to.eq(true);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PUT: When update the booking - Checkin with invalid datatype value', () => {
    // TODO: fix the bug api_updateBooking_PUT_invalidDataTypeValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/54
    it('RestfulBooker.UpdateBooking.PUT: Then the booking is updated with 1970-01-01 value in Checkin', () => {
      cy.updateBooking_PUT(authToken, createdBooking.bookingid, testData.invalidTypeCheckinBooking).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.bookingdates.checkin).to.eq(apiBooking.defaultValues.defaultDate);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PUT: When update the booking - Checkout with invalid datatype value', () => {
    // TODO: fix the bug api_updateBooking_PUT_invalidDataTypeValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/54
    it('RestfulBooker.UpdateBooking.PUT: Then the booking is updated with 1970-01-01 value in Checkout', () => {
      cy.updateBooking_PUT(authToken, createdBooking.bookingid, testData.invalidTypeCheckoutBooking).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.bookingdates.checkout).to.eq(apiBooking.defaultValues.defaultDate);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PUT: When update the booking - the AdditionalNeeds with invalid datatype value', () => {
    // TODO: fix the bug api_updateBooking_PUT_invalidDataTypeValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/54
    it('RestfulBooker.UpdateBooking.PUT: Then the booking is updated with the new value in AdditionalNeeds', () => {
      cy.updateBooking_PUT(authToken, createdBooking.bookingid, testData.invalidTypeAdditionalNeedsBooking).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.additionalneeds).to.eq(testData.invalidTypeAdditionalNeedsBooking.additionalneeds);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PUT: When update the booking - booking with negative number in TotalPrice', () => {
    it('RestfulBooker.UpdateBooking.PUT: Then the booking is updated with the negative price', () => {
      cy.updateBooking_PUT(authToken, createdBooking.bookingid, testData.negativeTotalPriceBooking).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.totalprice).to.eq(testData.negativeTotalPriceBooking.totalprice);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PUT: When update the booking - checkin to the value that is later than checkout', () => {
    // TODO: fix the bug api_updateBooking_PATCH_checkInMoreThanCheckOutValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/50
    it('RestfulBooker.UpdateBooking.PUT: Then the booking is updated with new values in BookingDates', () => {
      cy.updateBooking_PUT(authToken, createdBooking.bookingid, testData.checkInMoreThanCheckOutBooking).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.bookingdates.checkin).to.eq(testData.checkInMoreThanCheckOutBooking.bookingdates.checkin);
        expect(response.body.bookingdates.checkout).to.eq(testData.checkInMoreThanCheckOutBooking.bookingdates.checkout);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PUT: When update the booking - checkin to the value in the past', () => {
    // TODO: fix the bug api_updateBooking_PATCH_checkInInThePastValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/49
    it('RestfulBooker.UpdateBooking.PUT: Then the booking is updated with new values in BookingDates', () => {
      cy.updateBooking_PUT(authToken, createdBooking.bookingid, testData.checkInInThePastBooking).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.bookingdates.checkin).to.eq(testData.checkInInThePastBooking.bookingdates.checkin);
        expect(response.body.bookingdates.checkout).to.eq(testData.checkInInThePastBooking.bookingdates.checkout);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PUT: When update the booking - checkin to the value equal to checkout', () => {
    // TODO: fix the bug api_updateBooking_PATCH_checkInEqualCheckOutValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/51
    it('RestfulBooker.UpdateBooking.PUT: Then the booking is updated with new values in BookingDates', () => {
      cy.updateBooking_PUT(authToken, createdBooking.bookingid, testData.checkInEqualCheckOutBooking).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.bookingdates.checkin).to.eq(testData.checkInEqualCheckOutBooking.bookingdates.checkin);
        expect(response.body.bookingdates.checkout).to.eq(testData.checkInEqualCheckOutBooking.bookingdates.checkout);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PUT: When update the booking with non-existing Id', () => {
    it('RestfulBooker.UpdateBooking.PUT: Then the error message is displayed', () => {
      cy.updateBooking_PUT(authToken, 0, testData.validBooking, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(405);
        expect(response.body).to.eq(apiBooking.errors.methodNotAllowed);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PUT: When update booking without authentication', () => {
    it('RestfulBooker.UpdateBooking.PUT: Then the error message is displayed', () => {
      cy.updateBooking_PUT('invalid-token', createdBooking.bookingid, testData.validBooking, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(403);
        expect(response.body).to.eq(apiBooking.errors.forbidden);
      });
    });
  });

  context('RestfulBooker.DeleteBooking.DELETE: When delete booking without authentication', () => {
    it('RestfulBooker.DeleteBooking.DELETE: Then the error message is displayed', () => {
      cy.deleteBooking_DELETE('invalid-token', createdBooking.bookingid, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(403);
        expect(response.body).to.eq(apiBooking.errors.forbidden);
      });
    });
  });

  context('RestfulBooker.DeleteBooking.DELETE: When delete existing booking', () => {
    // TODO: fix the bug api_deleteBooking_DELETE_correctResponseStatusCode: https://github.com/NatalliaSavitskaya/Cypress/issues/52
    it('RestfulBooker.DeleteBooking.DELETE: Then the selected booking is deleted', () => {
      cy.deleteBooking_DELETE(authToken, createdBooking.bookingid).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.eq('Created');
      });
    });
  });

  context('RestfulBooker.DeleteBooking.DELETE: When delete non-existing booking', () => {
    it('RestfulBooker.DeleteBooking.DELETE: Then the error is displayed', () => {
      cy.deleteBooking_DELETE(authToken, 0, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(405);
        expect(response.body).to.eq(apiBooking.errors.methodNotAllowed);
      });
    });
  });
});
