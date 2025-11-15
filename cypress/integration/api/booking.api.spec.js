import { booking_testData } from '../../test-data/booking.test-data.js';
import { generateDateInThePast, generateRandomField } from '../../support/utils';

describe('RestfulBooker.Booking: Given No preconditions', () => {
  let createdBooking;
  context('RestfulBooker.CreateBooking.POST: When valid request to create a booking is sent', () => {
    it('RestfulBooker.Booking.POST: Then Apartments are booked', () => {
      cy.createBooking_POST(booking_testData.validBooking, {}).then((response) => {
        createdBooking = response.body;
        cy.log(`Booking created: ${JSON.stringify(createdBooking, null, 2)}`);
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('bookingid');
        expect(response.body).to.have.property('booking');
        expect(response.body.booking).to.deep.equal({
          ...booking_testData.validBooking.body,
          additionalneeds: booking_testData.validBooking.additionalneeds,
        });
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When create booking with empty required field', () => {
    // TODO: fix the bug api_createBooking_POST_emptyFieldValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/17
    it.skip('RestfulBooker.CreateBooking.POST: Then the correct specific error message is received', () => {
      const randomCase = booking_testData.emptyFieldCases[Math.floor(Math.random() * booking_testData.emptyFieldCases.length)];
      cy.log(`Testing creating booking with empty field: **${randomCase.field}**`);
      cy.createBooking_POST(randomCase.data, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(randomCase.expectedError);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When create booking with invalid data type in some field', () => {
    // TODO: fix the bug api_createBooking_POST_invalidFieldDataTypeValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/45
    it.skip('RestfulBooker.CreateBooking.POST: Then general error message is received', () => {
      const randomCase = booking_testData.invalidFieldCases[Math.floor(Math.random() * booking_testData.invalidFieldCases.length)];
      cy.log(`Testing creating booking with invalid data type for field: **${randomCase.field}**`);
      cy.createBooking_POST(randomCase.data, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.generalError);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When create booking with Checkin later than CheckOut', () => {
    // TODO: fix the bug api_createBooking_POST_CheckInMoreThanCheckOutValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/27
    it.skip('RestfulBooker.CreateBooking.POST: Then Error message is received', () => {
      cy.createBooking_POST(booking_testData.checkInMoreThanCheckOutBooking, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.checkInMoreThanCheckOut);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When create booking with Checkin equal to CheckOut', () => {
    // TODO: fix the bug api_createBooking_POST_CheckInEqualCheckOutValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/28
    it.skip('RestfulBooker.CreateBooking.POST: Then Error message is received', () => {
      cy.createBooking_POST(booking_testData.checkInEqualCheckOutBooking, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.checkInMoreThanCheckOut);
      });
    });
  });

  context('RestfulBooker.CreateBooking.POST: When create booking with Checkin in the past', () => {
    // TODO: fix the bug api_createBooking_POST_CheckInInThePastValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/48
    it.skip('RestfulBooker.CreateBooking.POST: Then Error message is received', () => {
      cy.createBooking_POST(booking_testData.checkInInThePastBooking, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.checkInInThePast);
      });
    });
  });

  context('RestfulBooker.GetBookingIds.GET: When search for all bookings created', () => {
    it('RestfulBooker.GetBookingIds.GET: Then all unique booking IDs are got', () => {
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
    it('RestfulBooker.GetBooking.GET: Then the booking can be got', () => {
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

  context('RestfulBooker.GetBookingIds.GET: When search for all bookings by firstname', () => {
    it('RestfulBooker.GetBookingIds.GET: Then all IDs with such firstname are got', () => {
      cy.getBookingIds_GET({ firstname: createdBooking.booking.firstname }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
        const ids = response.body.map((b) => b.bookingid);
        expect(ids).to.include(createdBooking.bookingid);
      });
    });
  });

  context('RestfulBooker.GetBookingIds.GET: When search for all bookings by lastname', () => {
    it('RestfulBooker.GetBookingIds.GET: Then all IDs with such lastname are got', () => {
      cy.getBookingIds_GET({ lastname: createdBooking.booking.lastname }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
        const ids = response.body.map((b) => b.bookingid);
        expect(ids).to.include(createdBooking.bookingid);
      });
    });
  });

  context('RestfulBooker.GetBookingIds.GET: When search for all bookings by checkin', () => {
    // TODO: fix the bug api_getBookingIds_GET_searchByCheckin: https://github.com/NatalliaSavitskaya/Cypress/issues/29
    it.skip('RestfulBooker.GetBookingIds.GET: Then all IDs with later or equal checkin value are got', () => {
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

  context('RestfulBooker.UpdateBooking.PATCH: When update a random booking parameter with valid value', () => {
    it('RestfulBooker.UpdateBooking.PATCH: Then the chosen parameter in booking is edited to the new value', () => {
      const updatedBooking = booking_testData.validBooking;
      const fieldToUpdate = generateRandomField();

      if (fieldToUpdate === 'checkin' || fieldToUpdate === 'checkout') {
        cy.partialUpdateBooking_PATCH(createdBooking.bookingid, updatedBooking.body.bookingdates[fieldToUpdate]).then((response) => {
          cy.log(`Updated **${fieldToUpdate}** from **${createdBooking.body.bookingdates[fieldToUpdate]}** to **${updatedBooking.body.bookingdates[fieldToUpdate]}**`);
          expect(response.status).to.eq(200);
          expect(response.body.bookingdates[fieldToUpdate]).to.eq(updatedBooking.body.bookingdates[fieldToUpdate]);
        });
      } else if (fieldToUpdate === 'additionalneeds') {
        cy.partialUpdateBooking_PATCH(createdBooking.bookingid, updatedBooking.additionalneeds).then((response) => {
          cy.log(`Updated **${fieldToUpdate}** from **${createdBooking.additionalneeds}** to **${updatedBooking.additionalneeds}**`);
          expect(response.status).to.eq(200);
          expect(response.body.additionalneeds).to.eq(updatedBooking.additionalneeds);
        });
      } else {
        cy.partialUpdateBooking_PATCH(createdBooking.bookingid, updatedBooking.body[fieldToUpdate]).then((response) => {
          cy.log(`Updated **${fieldToUpdate}** from **${createdBooking.body[fieldToUpdate]}** to **${updatedBooking.body[fieldToUpdate]}**`);
          expect(response.status).to.eq(200);
          expect(response.body[fieldToUpdate]).to.eq(updatedBooking.body[fieldToUpdate]);
        });
      }
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When updating booking with an empty required field', () => {
    // TODO: fix the bug api_updateBooking_PATCH_emptyFieldValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/33
    it.skip('RestfulBooker.UpdateBooking.PATCH: Then the correct error message is received', () => {
      const randomCase = booking_testData.emptyFieldCases[Math.floor(Math.random() * booking_testData.emptyFieldCases.length)];
      cy.log(`Trying to update **${randomCase.field}** to an empty value`);
      let updateBody;
      if (randomCase.field === 'checkin' || randomCase.field === 'checkout') {
        updateBody = { bookingdates: { [randomCase.field]: '' } };
      } else if (randomCase.field === 'additionalneeds') {
        updateBody = { additionalneeds: '' };
      } else {
        updateBody = { [randomCase.field]: '' };
      }
      cy.partialUpdateBooking_PATCH(createdBooking.bookingid, updateBody, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(randomCase.expectedError);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When updating booking with invalid data type', () => {
    // TODO: fix the bug api_updateBooking_PATCH_invalidFirstnameDataTypeValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/39
    it.skip('RestfulBooker.UpdateBooking.PATCH: Then general error message is received', () => {
      const randomCase = booking_testData.invalidFieldCases[Math.floor(Math.random() * booking_testData.invalidFieldCases.length)];
      cy.log(`Trying to update field **${randomCase.field}** with invalid data type`);
      let updateBody;
      if (randomCase.field === 'checkin' || randomCase.field === 'checkout') {
        updateBody = { bookingdates: { [randomCase.field]: randomCase.data.bookingdates[randomCase.field] } };
      } else if (randomCase.field === 'additionalneeds') {
        updateBody = { additionalneeds: randomCase.data.additionalneeds };
      } else {
        updateBody = { [randomCase.field]: randomCase.data[randomCase.field] };
      }
      cy.partialUpdateBooking_PATCH(createdBooking.bookingid, updateBody, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(randomCase.expectedError);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When updating checkin to the value that is later than checkout', () => {
    // TODO: fix the bug api_updateBooking_PATCH_checkInMoreThanCheckOutValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/50
    it.skip('RestfulBooker.UpdateBooking.PATCH: Then the update is rejected with an error', () => {
      const originalCheckin = createdBooking.booking.bookingdates.checkin;
      const originalCheckout = createdBooking.booking.bookingdates.checkout;
      if (!originalCheckout) {
        cy.log('Checkout date is missing, cannot perform test');
        return;
      }
      const checkoutDate = new Date(originalCheckout);
      if (isNaN(checkoutDate.getTime())) {
        cy.log(`Invalid checkout date: ${originalCheckout}`);
        return;
      }
      const invalidCheckinDate = new Date(checkoutDate);
      invalidCheckinDate.setDate(invalidCheckinDate.getDate() + 1);
      const invalidCheckinStr = invalidCheckinDate.toISOString().split('T')[0];
      const updateBody = { bookingdates: { checkin: invalidCheckinStr } };
      cy.log(`Trying to update old checkin **${originalCheckin}** to **${invalidCheckinStr}** which is later than checkout **${originalCheckout}**`);
      cy.partialUpdateBooking_PATCH(createdBooking.bookingid, updateBody, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.checkInMoreThanCheckOut);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When updating checkin to the value in the past', () => {
    // TODO: fix the bug api_updateBooking_PATCH_checkInInThePastValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/49
    it.skip('RestfulBooker.UpdateBooking.PATCH: Then the update is rejected with an error', () => {
      const pastCheckin = generateDateInThePast();
      const updateBody = { bookingdates: { checkin: pastCheckin } };
      cy.log(`Trying to update checkin **${createdBooking.booking.bookingdates.checkin}** to a past date **${pastCheckin}**`);
      cy.partialUpdateBooking_PATCH(createdBooking.bookingid, updateBody, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.checkInInThePast);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When updating checkin to the value equal to checkout', () => {
    // TODO: fix the bug api_updateBooking_PATCH_checkInEqualCheckOutValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/51
    it.skip('RestfulBooker.UpdateBooking.PATCH: Then the update is rejected with an error', () => {
      const originalCheckin = createdBooking.booking.bookingdates.checkin;
      const originalCheckout = createdBooking.booking.bookingdates.checkout;
      const updateBody = { bookingdates: { checkin: originalCheckout } };
      cy.log(`Trying to update checkin **${originalCheckin}** to be equal to checkout **${originalCheckout}**`);
      cy.partialUpdateBooking_PATCH(createdBooking.bookingid, updateBody, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.checkInMoreThanCheckOut);
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When updating checkout to the value equal to checkin', () => {
    // TODO: fix the bug api_updateBooking_PATCH_checkInEqualCheckOutValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/51
    it.skip('RestfulBooker.UpdateBooking.PATCH: Then the update is rejected with an error', () => {
      const originalCheckin = createdBooking.booking.bookingdates.checkin;
      const originalCheckout = createdBooking.booking.bookingdates.checkout;
      const updateBody = { bookingdates: { checkout: originalCheckin } };
      cy.log(`Trying to update checkout **${originalCheckout}** to be equal to checkin **${originalCheckin}**`);
      cy.partialUpdateBooking_PATCH(createdBooking.bookingid, updateBody, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.checkInMoreThanCheckOut);
      });
    });
  });
});
