import { booking_testData } from '../../test-data/api.test-data.js';

describe('RestfulBooker.CreateBooking: Given No preconditions', { testIsolation: false }, () => {
  context('RestfulBooker.CreateBooking.POST: When valid request is sent', () => {
    it('RestfulBooker.Booking.POST: Then Apartments are booked', () => {
      cy.createBooking_POST(booking_testData.validBooking, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('bookingid');
        expect(response.body).to.have.property('booking');
        expect(response.body.booking).to.deep.equal(booking_testData.validBooking.body);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When empty Additional details are sent', () => {
    it('RestfulBooker.CreateBooking.POST: Then Apartments are booked', () => {
      cy.createBooking_POST(booking_testData.emptyAdditionalDetailsBooking, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('bookingid');
        expect(response.body).to.have.property('booking');
        expect(response.body.booking).to.deep.equal(booking_testData.emptyAdditionalDetailsBooking.body);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When empty Firstname is sent', () => {
    // TODO: fix the bug api_createBooking_POST_emptyFirstnameValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/17
    it.skip('RestfulBooker.CreateBooking.POST: Then Error message is received', () => {
      cy.createBooking_POST(booking_testData.emptyFirstNameBooking, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq('Internal Server Error');
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When empty Lastname is sent', () => {
    // TODO: fix the bug api_createBooking_POST_emptyLastnameValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/18
    it.skip('RestfulBooker.CreateBooking.POST: Then Error message is received', () => {
      cy.createBooking_POST(booking_testData.emptyLastNameBooking, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq('Internal Server Error');
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When empty CheckIn is sent', () => {
    // TODO: fix the bug api_createBooking_POST_emptyCheckInValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/19
    it.skip('RestfulBooker.CreateBooking.POST: Then Error message is received', () => {
      cy.createBooking_POST(booking_testData.emptyCheckInBooking, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq('Internal Server Error');
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When empty CheckOut is sent', () => {
    // TODO: fix the bug api_createBooking_POST_emptyCheckOutValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/20
    it.skip('RestfulBooker.CreateBooking.POST: Then Error message is received', () => {
      cy.createBooking_POST(booking_testData.emptyCheckOutBooking, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq('Internal Server Error');
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When Invalid data type for Price is sent', () => {
    // TODO: fix the bug api_createBooking_POST_invalidPriceDataTypeValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/21
    it.skip('RestfulBooker.CreateBooking.POST: Then Error message is received', () => {
      cy.createBooking_POST(booking_testData.invalidPriceDataTypeBooking, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq('Internal Server Error');
      });
    });
  });
  context('RestfulBooker.CreateBooking.POST: When Invalid data type for Deposit is sent', () => {
    // TODO: fix the bug api_createBooking_POST_invalidDepositDataTypeValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/22
    it.skip('RestfulBooker.CreateBooking.POST: Then Error message is received', () => {
      cy.createBooking_POST(booking_testData.invalidDepositPaidDataTypeBooking, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq('Internal Server Error');
      });
    });
  });
  context('RestfulBooker.CreateBooking.POST: When Invalid data type for CheckIn is sent', () => {
    // TODO: fix the bug api_createBooking_POST_invalidCheckInDataTypeValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/23
    it.skip('RestfulBooker.CreateBooking.POST: Then Error message is received', () => {
      cy.createBooking_POST(booking_testData.invalidCheckInDataTypeBooking, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq('Internal Server Error');
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When Invalid data type for CheckOut is sent', () => {
    // TODO: fix the bug api_createBooking_POST_invalidCheckOutDataTypeValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/24
    it.skip('RestfulBooker.CreateBooking.POST: Then Error message is received', () => {
      cy.createBooking_POST(booking_testData.invalidCheckOutDataTypeBooking, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq('Internal Server Error');
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When no Deposit is sent', () => {
    // TODO: fix the bug api_createBooking_POST_noDepositValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/25
    it.skip('RestfulBooker.CreateBooking.POST: Then Error message is received', () => {
      cy.createBooking_POST(booking_testData.noDepositBooking, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq('Internal Server Error');
      });
    });
  });
});

describe('RestfulBooker.GetBookingIds: Some bookings are created', { testIsolation: false }, () => {
  let createdBookingId;
  before(() => {
    cy.createBooking_POST(booking_testData.validBooking).then((resp) => {
      createdBookingId = resp.body.bookingid;
    });
  });
  context('RestfulBooker.GetBookingIds.GET: When no parameters are sent', () => {
    it('RestfulBooker.GetBookingIds.GET: Then all unique booking IDs are got', () => {
      cy.getBookingIds_GET().then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
        const ids = response.body.map((b) => b.bookingid);
        expect(ids).to.include(createdBookingId);
      });
    });
  });

  context('RestfulBooker.GetBookingIds.GET: When firstname is sent', () => {
    let createdFirstname;
    before(() => {
      cy.createBooking_POST(booking_testData.validBooking).then((resp) => {
        createdFirstname = resp.body.booking.firstname;
      });
    });

    it('RestfulBooker.GetBookingIds.GET: Then all IDs with such firstname are got', () => {
      cy.getBookingIds_GET({ firstname: createdFirstname }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
        response.body.forEach((item) => {
          cy.getBooking_GET(item.bookingid).then((bookingResp) => {
            expect(bookingResp.body.firstname).to.eq(createdFirstname);
          });
        });
      });
    });
  });

  context('RestfulBooker.GetBookingIds.GET: When lastname is sent', () => {
    let createdLastname;
    before(() => {
      cy.createBooking_POST(booking_testData.validBooking).then((resp) => {
        createdLastname = resp.body.booking.lastname;
      });
    });
    it('RestfulBooker.GetBookingIds.GET: Then all IDs with such lastname are got', () => {
      cy.getBookingIds_GET({ lastname: createdLastname }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
        response.body.forEach((item) => {
          cy.getBooking_GET(item.bookingid).then((bookingResp) => {
            expect(bookingResp.body.lastname).to.eq(createdLastname);
          });
        });
      });
    });
  });

  context('RestfulBooker.GetBookingIds.GET: When checkin is sent', () => {
    let createdCheckIn;
    before(() => {
      cy.createBooking_POST(booking_testData.validBooking).then((resp) => {
        createdCheckIn = resp.body.booking.bookingdates.checkin;
        cy.log(createdCheckIn);
      });
    });
    it('RestfulBooker.GetBookingIds.GET: Then all bookings in response have checkin >= search checkin date', () => {
      cy.getBookingIds_GET({ checkin: createdCheckIn }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        if (response.body.length === 0) {
          cy.log('No bookings returned for this checkin date');
          return;
        }
        response.body.forEach((item) => {
          cy.getBooking_GET(item.bookingid).then((bookingResp) => {
            const bookingCheckin = bookingResp.body.bookingdates.checkin;
            const created = new Date(createdCheckIn);
            const actual = new Date(bookingCheckin);
            expect(actual.getTime()).to.be.greaterThanOrEqual(created.getTime());
          });
        });
      });
    });
  });

  context('RestfulBooker.GetBookingIds.GET: When checkout is sent', () => {
    let createdCheckOut;
    before(() => {
      cy.createBooking_POST(booking_testData.validBooking).then((resp) => {
        createdCheckOut = resp.body.booking.bookingdates.checkout;
        cy.log(createdCheckOut);
      });
    });
    it('RestfulBooker.GetBookingIds.GET: Then all bookings in response have checkout >= search checkout date', () => {
      cy.getBookingIds_GET({ checkin: createdCheckOut }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        if (response.body.length === 0) {
          cy.log('No bookings returned for this checkout date');
          return;
        }
        response.body.forEach((item) => {
          cy.getBooking_GET(item.bookingid).then((bookingResp) => {
            const bookingCheckOut = bookingResp.body.bookingdates.checkout;
            const created = new Date(createdCheckOut);
            const actual = new Date(bookingCheckOut);
            expect(actual.getTime()).to.be.gte(created.getTime());
          });
        });
      });
    });
  });

  describe('RestfulBooker.GetBooking: Given No preconditions', { testIsolation: false }, () => {
    let createdBooking;
    before(() => {
      cy.createBooking_POST(booking_testData.validBooking).then((resp) => {
        createdBooking = resp.body.booking;
        createdBooking.bookingid = resp.body.bookingid;
      });
    });
    context('RestfulBooker.GetBooking.GET: When valid BookingId is sent', () => {
      it('Then the retrieved booking matches the created booking', () => {
        cy.getBooking_GET(createdBooking.bookingid, { failOnStatusCode: false }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.firstname).to.eq(createdBooking.firstname);
          expect(response.body.lastname).to.eq(createdBooking.lastname);
          expect(response.body.totalprice).to.eq(createdBooking.totalprice);
          expect(response.body.depositpaid).to.eq(createdBooking.depositpaid);
          expect(response.body.bookingdates.checkin).to.eq(createdBooking.bookingdates.checkin);
          expect(response.body.bookingdates.checkout).to.eq(createdBooking.bookingdates.checkout);
        });
      });
    });
  });
});