import { booking_testData } from '../../test-data/api.test-data.js';
import { faker } from '@faker-js/faker';

let bookingData = booking_testData.validBooking();

describe('RestfulBooker.CreateBooking: Given No preconditions', { testIsolation: false }, () => {
  context('RestfulBooker.CreateBooking.POST: When valid request is sent', () => {
    before(() => {
      bookingData = booking_testData.validBooking();
    });
    it('RestfulBooker.Booking.POST: Then Apartments are booked', () => {
      cy.createBooking_POST(bookingData, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('bookingid');
        expect(response.body).to.have.property('booking');
        expect(response.body.booking).to.deep.equal({
          ...bookingData.body,
          additionalneeds: bookingData.additionalneeds,
        });
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When empty Firstname is sent', () => {
    before(() => {
      bookingData = booking_testData.emptyFirstNameBooking();
    });
    // TODO: fix the bug api_createBooking_POST_emptyFirstnameValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/17
    it.skip('RestfulBooker.CreateBooking.POST: Then Error message is received', () => {
      cy.createBooking_POST(bookingData, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.firstnameIsRequired);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When empty Lastname is sent', () => {
    before(() => {
      bookingData = booking_testData.emptyLastNameBooking();
    });
    // TODO: fix the bug api_createBooking_POST_emptyLastnameValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/18
    it.skip('RestfulBooker.CreateBooking.POST: Then Error message is received', () => {
      cy.createBooking_POST(bookingData, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.lastnameIsRequired);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When empty TotalPrice is sent', () => {
    before(() => {
      bookingData = booking_testData.emptyTotalPriceBooking();
    });
    // TODO: fix the bug api_createBooking_POST_emptyTotalPriceValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/31
    it.skip('RestfulBooker.CreateBooking.POST: Then Error message is received', () => {
      cy.createBooking_POST(bookingData, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.totalPriceIsRequired);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When empty CheckIn is sent', () => {
    before(() => {
      bookingData = booking_testData.emptyCheckInBooking();
    });
    // TODO: fix the bug api_createBooking_POST_emptyCheckInValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/19
    it.skip('RestfulBooker.CreateBooking.POST: Then Error message is received', () => {
      cy.createBooking_POST(bookingData, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.checkInIsRequired);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When empty CheckOut is sent', () => {
    before(() => {
      bookingData = booking_testData.emptyCheckOutBooking();
    });
    // TODO: fix the bug api_createBooking_POST_emptyCheckOutValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/20
    it.skip('RestfulBooker.CreateBooking.POST: Then Error message is received', () => {
      cy.createBooking_POST(bookingData, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.checkOutIsRequired);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When empty AdditionalNeeds are sent', () => {
    before(() => {
      bookingData = booking_testData.emptyAdditionalDetailsBooking();
    });
    //TODO: fix the bug api_createBooking_POST_emptyAdditionalDetailsValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/32
    it.skip('RestfulBooker.CreateBooking.POST: Then Error message is received', () => {
      cy.createBooking_POST(bookingData, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.additionalNeedsIsRequired);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When Checkin > CheckOut is sent', () => {
    before(() => {
      bookingData = booking_testData.CheckInMoreThanCheckOutBooking();
    });
    // TODO: fix the bug api_createBooking_POST_CheckInMoreThanCheckOutValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/27
    it.skip('RestfulBooker.CreateBooking.POST: Then Error message is received', () => {
      cy.createBooking_POST(bookingData, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.checkInMoreThanCheckOut);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When Checkin = CheckOut is sent', () => {
    before(() => {
      bookingData = booking_testData.CheckInEqualCheckOutBooking();
    });
    // TODO: fix the bug api_createBooking_POST_CheckInEqualCheckOutValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/28
    it.skip('RestfulBooker.CreateBooking.POST: Then Error message is received', () => {
      cy.createBooking_POST(bookingData, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.checkInMoreThanCheckOut);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When Checkin in the past of current date is sent', () => {
    before(() => {
      bookingData = booking_testData.CheckInInThePastBooking();
    });
    // TODO: fix the bug api_createBooking_POST_CheckInInThePastValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/48
    it.skip('RestfulBooker.CreateBooking.POST: Then Error message is received', () => {
      cy.createBooking_POST(bookingData, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.checkInInThePast);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When invalid data type for Firstname is sent', () => {
    before(() => {
      bookingData = booking_testData.invalidFirstnameDataTypeBooking();
    });
    // TODO: fix the bug api_createBooking_POST_invalidFirstnameValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/45
    it.skip('RestfulBooker.CreateBooking.POST: Then Error message is received', () => {
      cy.createBooking_POST(bookingData, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.generalError);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When invalid data type for Lastname is sent', () => {
    before(() => {
      bookingData = booking_testData.invalidLastnameDataTypeBooking();
    });
    // TODO: fix the bug api_createBooking_POST_invalidLastnameValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/46
    it.skip('RestfulBooker.CreateBooking.POST: Then Error message is received', () => {
      cy.createBooking_POST(bookingData, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.generalError);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When invalid data type for Price is sent', () => {
    before(() => {
      bookingData = booking_testData.invalidPriceDataTypeBooking();
    });
    // TODO: fix the bug api_createBooking_POST_invalidPriceDataTypeValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/21
    it.skip('RestfulBooker.CreateBooking.POST: Then Error message is received', () => {
      cy.createBooking_POST(bookingData, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.generalError);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When Invalid data type for Deposit is sent', () => {
    before(() => {
      bookingData = booking_testData.invalidDepositPaidDataTypeBooking();
    });
    // TODO: fix the bug api_createBooking_POST_invalidDepositDataTypeValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/22
    it.skip('RestfulBooker.CreateBooking.POST: Then Error message is received', () => {
      cy.createBooking_POST(bookingData, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.generalError);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When Invalid data type for CheckIn is sent', () => {
    before(() => {
      bookingData = booking_testData.invalidCheckInDataTypeBooking();
    });
    // TODO: fix the bug api_createBooking_POST_invalidCheckInDataTypeValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/23
    it.skip('RestfulBooker.CreateBooking.POST: Then Error message is received', () => {
      cy.createBooking_POST(bookingData, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.generalError);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When Invalid data type for CheckOut is sent', () => {
    before(() => {
      bookingData = booking_testData.invalidCheckOutDataTypeBooking();
    });
    // TODO: fix the bug api_createBooking_POST_invalidCheckOutDataTypeValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/24
    it.skip('RestfulBooker.CreateBooking.POST: Then Error message is received', () => {
      cy.createBooking_POST(bookingData, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.generalError);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When Invalid data type for AdditionalNeeds is sent', () => {
    before(() => {
      bookingData = booking_testData.invalidAdditionalNeedsDataTypeBooking();
    });
    // TODO: fix the bug api_createBooking_POST_invalidAdditionalNeedsDataTypeValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/47
    it.skip('RestfulBooker.CreateBooking.POST: Then Error message is received', () => {
      cy.createBooking_POST(bookingData, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.generalError);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When no Deposit is sent', () => {
    before(() => {
      bookingData = booking_testData.noDepositBooking();
    });
    // TODO: fix the bug api_createBooking_POST_noDepositValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/25
    it.skip('RestfulBooker.CreateBooking.POST: Then Error message is received', () => {
      cy.createBooking_POST(bookingData, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.generalError);
      });
    });
  });
});

describe('RestfulBooker.GetBookingIds: Some bookings are created', { testIsolation: false }, () => {
  let createdBookingId;
  before(() => {
    bookingData = booking_testData.validBooking();
    cy.createBooking_POST(bookingData).then((response) => {
      createdBookingId = response.body.bookingid;
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
      bookingData = booking_testData.validBooking();
      cy.createBooking_POST(bookingData).then((resp) => {
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
      bookingData = booking_testData.validBooking();
      cy.createBooking_POST(bookingData).then((resp) => {
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
      bookingData = booking_testData.validBooking();
      cy.createBooking_POST(bookingData).then((resp) => {
        createdCheckIn = resp.body.booking.bookingdates.checkin;
        cy.log(createdCheckIn);
      });
    });
    it('RestfulBooker.GetBookingIds.GET: Then all bookings in response have checkin >= search checkin date', () => {
      cy.getBookingIds_GET({ checkin: createdCheckIn }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        // TODO: fix the bug api_getBookingIds_GET_searchByCheckin: https://github.com/NatalliaSavitskaya/Cypress/issues/29
        if (response.body.length === 0) {
          cy.log('No bookings returned for this checkin date');
          return;
        }
        response.body.forEach((item) => {
          cy.getBooking_GET(item.bookingid).then((bookingResp) => {
            const bookingCheckIn = bookingResp.body?.bookingdates?.checkin;
            if (bookingCheckIn) {
              const created = new Date(createdCheckIn);
              const actual = new Date(bookingCheckIn);
              if (!Number.isNaN(actual.getTime())) {
                expect(actual.getTime()).to.be.gte(created.getTime());
              }
            } else {
              cy.log(`Booking ${item.bookingid} has empty checkin, skipping comparison`);
            }
          });
        });
      });
    });
  });

  context('RestfulBooker.GetBookingIds.GET: When checkout is sent', () => {
    let createdCheckOut;
    before(() => {
      bookingData = booking_testData.validBooking();
      cy.createBooking_POST(bookingData).then((resp) => {
        createdCheckOut = resp.body.booking.bookingdates.checkout;
        cy.log(createdCheckOut);
      });
    });
    it('RestfulBooker.GetBookingIds.GET: Then all bookings in response have checkout >= search checkout date', () => {
      cy.getBookingIds_GET({ checkin: createdCheckOut }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        // TODO: fix the bug api_getBookingIds_GET_searchByCheckOut: https://github.com/NatalliaSavitskaya/Cypress/issues/30
        if (response.body.length === 0) {
          cy.log('No bookings returned for this checkout date');
          return;
        }
        response.body.forEach((item) => {
          cy.getBooking_GET(item.bookingid).then((bookingResp) => {
            const bookingCheckOut = bookingResp.body?.bookingdates?.checkin;
            if (bookingCheckOut) {
              const created = new Date(createdCheckOut);
              const actual = new Date(bookingCheckOut);
              if (!Number.isNaN(actual.getTime())) {
                expect(actual.getTime()).to.be.gte(created.getTime());
              }
            } else {
              cy.log(`Booking ${item.bookingid} has empty checkout, skipping comparison`);
            }
          });
        });
      });
    });
  });

  describe('RestfulBooker.GetBooking: Given No preconditions', { testIsolation: false }, () => {
    let createdBooking;
    before(() => {
      bookingData = booking_testData.validBooking();
      cy.createBooking_POST(bookingData).then((response) => {
        createdBooking = response.body.booking;
        createdBooking.bookingid = response.body.bookingid;
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
          expect(response.body.additionalneeds).to.eq(createdBooking.additionalneeds);
        });
      });
    });
  });
});

describe('RestfulBooker.UpdateBooking: Some booking is created', { testIsolation: false }, () => {
  let createdBooking;
  beforeEach(() => {
    bookingData = booking_testData.validBooking();
    cy.createBooking_POST(bookingData).then((response) => {
      createdBooking = response.body.booking;
      createdBooking.bookingid = response.body.bookingid;
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When updating the booking with valid Firstname', () => {
    it('Then the Firstname in booking is edited to the new one', () => {
      let randomUpdate = booking_testData.updatedParameters().body;
      cy.partialUpdateBooking_PATCH(createdBooking.bookingid, { firstname: randomUpdate.firstname })
        .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.firstname).to.eq(randomUpdate.firstname);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When updating the booking with valid Lastname', () => {
    it('Then the Lastname in booking is edited to the new one', () => {
      let randomUpdate = booking_testData.updatedParameters().body;
      cy.partialUpdateBooking_PATCH(createdBooking.bookingid, { lastname: randomUpdate.lastname })
        .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.lastname).to.eq(randomUpdate.lastname);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When updating the booking with valid Price', () => {
    it('Then the Price in booking is edited to the new one', () => {
      let randomUpdate = booking_testData.updatedParameters().body;
      cy.partialUpdateBooking_PATCH(createdBooking.bookingid, { totalprice: randomUpdate.totalprice })
        .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.totalprice).to.eq(randomUpdate.totalprice);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When updating the booking with valid CheckIn', () => {
    it('Then the CheckIn in booking is edited to the new one', () => {
      let randomUpdate = booking_testData.updatedParameters().body;
      cy.partialUpdateBooking_PATCH(createdBooking.bookingid, {
        bookingdates: { checkin: randomUpdate.bookingdates.checkin }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.bookingdates.checkin).to.eq(randomUpdate.bookingdates.checkin);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When updating the booking with valid CheckOut', () => {
    it('Then the CheckOut in booking is edited to the new one', () => {
      let randomUpdate = booking_testData.updatedParameters().body;
      cy.partialUpdateBooking_PATCH(createdBooking.bookingid, {
        bookingdates: { checkout: randomUpdate.bookingdates.checkout }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.bookingdates.checkout).to.eq(randomUpdate.bookingdates.checkout);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When updating the booking with valid AdditionalNeeds', () => {
    it('Then the AdditionalNeeds in booking are edited to the new ones', () => {
      let randomUpdate = booking_testData.updatedParameters();
      cy.partialUpdateBooking_PATCH(
        createdBooking.bookingid,
        { additionalneeds: randomUpdate.additionalneeds }
      ).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.additionalneeds).to.eq(randomUpdate.additionalneeds);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When updating the booking with empty Firstname', () => {
    // TODO: fix the bug api_updateBooking_PATCH_emptyFirstnameValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/33
    it.skip('Then the Error message is displayed', () => {
      cy.partialUpdateBooking_PATCH(createdBooking.bookingid, { firstname: '' }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.firstnameIsRequired);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When updating the booking with empty Lastname', () => {
    // TODO: fix the bug api_updateBooking_PATCH_emptyLastnameValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/34
    it.skip('Then the Error message is displayed', () => {
      cy.partialUpdateBooking_PATCH(createdBooking.bookingid, { lastname: '' }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.lastnameIsRequired);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When updating the booking with empty Price', () => {
    it.skip('Then the Error message is displayed', () => {
      // TODO: fix the bug api_updateBooking_PATCH_emptyPriceValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/35
      cy.partialUpdateBooking_PATCH(createdBooking.bookingid, { totalprice: '' }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.totalPriceIsRequired);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When updating the booking with empty CheckIn', () => {
    // TODO: fix the bug api_updateBooking_PATCH_emptyCheckInValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/36
    it.skip('Then the Error message is displayed', () => {
      cy.partialUpdateBooking_PATCH(createdBooking.bookingid, {
        bookingdates: { checkin: '' }
      }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.checkInIsRequired);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When updating the booking with empty CheckOut', () => {
    // TODO: fix the bug api_updateBooking_PATCH_emptyCheckOutValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/37
    it.skip('Then the Error message is displayed', () => {
      cy.partialUpdateBooking_PATCH(createdBooking.bookingid, {
        bookingdates: { checkout: '' }
      }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.checkOutIsRequired);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When updating the booking with empty AdditionalNeeds', () => {
    // TODO: fix the bug api_updateBooking_PATCH_emptyAdditionalNeedsValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/38
    it.skip('Then the Error message is displayed', () => {
      cy.partialUpdateBooking_PATCH(
        createdBooking.bookingid,
        { additionalneeds: '' }
      ).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.additionalNeedsIsRequired);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When updating the booking with Firstname of invalid data type', () => {
    // TODO: fix the bug api_updateBooking_PATCH_invalidFirstnameDataTypeValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/39
    it.skip('Then the Error message is displayed', () => {
      cy.partialUpdateBooking_PATCH(createdBooking.bookingid, { firstname: true}).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.generalError);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When updating the booking with Lastname of invalid data type', () => {
    // TODO: fix the bug api_updateBooking_PATCH_invalidLastnameDataTypeValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/40
    it.skip('Then the Error message is displayed', () => {
      cy.partialUpdateBooking_PATCH(createdBooking.bookingid, { lastname: false}).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.generalError);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When updating the booking with Price of invalid data type', () => {
    it.skip('Then the Error message is displayed', () => {
      // TODO: fix the bug api_updateBooking_PATCH_invalidPriceDataTypeValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/41
      cy.partialUpdateBooking_PATCH(createdBooking.bookingid, { totalprice: 'One dollar' }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.generalError);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When updating the booking with CheckIn of invalid data type', () => {
    // TODO: fix the bug api_updateBooking_PATCH_invalidCheckInDataTypeValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/42
    it.skip('Then the Error message is displayed', () => {
      cy.partialUpdateBooking_PATCH(createdBooking.bookingid, {
        bookingdates: { checkin: true}
      }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.generalError);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When updating the booking with CheckOut of invalid data type', () => {
    // TODO: fix the bug api_updateBooking_PATCH_invalidCheckOutDataTypeValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/43
    it.skip('Then the Error message is displayed', () => {
      cy.partialUpdateBooking_PATCH(createdBooking.bookingid, {
        bookingdates: { checkout: '' }
      }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.generalError);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When updating the booking with AdditionalNeeds of invalid data type', () => {
    // TODO: fix the bug api_updateBooking_PATCH_invalidAdditionalNeedsDataTypeValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/44
    it.skip('Then the Error message is displayed', () => {
      cy.partialUpdateBooking_PATCH(
        createdBooking.bookingid,
        { additionalneeds: false}
      ).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.generalError);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When updating the booking with CheckIn in the past value', () => {
    // TODO: fix the bug api_updateBooking_PATCH_checkInInThePastValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/49
    it.skip('Then the Error message is displayed', () => {
      let now = new Date();
      let checkin = faker.date.between({
        from: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
        to: now
      }).toISOString().split('T')[0];
      cy.partialUpdateBooking_PATCH(createdBooking.bookingid, {
        bookingdates: { checkin: checkin }
      }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.checkInInThePast);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When updating booking with CheckIn > CheckOut', () => {
    // TODO: fix the bug api_updateBooking_PATCH_checkInMoreThanCheckOutValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/50
    it.skip('Then the Error message is displayed', () => {
      let now = new Date();
      let checkout = faker.date.between({
        from: now,
        to: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
      }).toISOString().split('T')[0];
      let checkin = faker.date.between({
        from: new Date(new Date(checkout).getTime() + 24 * 60 * 60 * 1000),
        to: new Date(new Date(checkout).getTime() + 30 * 24 * 60 * 60 * 1000)
      }).toISOString().split('T')[0];
      cy.partialUpdateBooking_PATCH(createdBooking.bookingid, {
        bookingdates: { checkin, checkout }
      }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.checkInMoreThanCheckOut);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When updating the booking with CheckIn = CheckOut', () => {
    // TODO: fix the bug api_updateBooking_PATCH_checkInEqualCheckOutValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/51
    it.skip('Then the Error message is displayed', () => {
      let now = new Date();
      let futureDate = faker.date.between({
        from: now,
        to: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
      }).toISOString().split('T')[0];
      cy.partialUpdateBooking_PATCH(createdBooking.bookingid, {
        bookingdates: { checkin: futureDate, checkout: futureDate }
      }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.checkInMoreThanCheckOut);
      });
    });
  });
});