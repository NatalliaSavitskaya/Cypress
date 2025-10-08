import { booking_testData } from '../../test-data/booking.test-data.js';
import { generateDateInThePast } from '../../support/utils';

describe('RestfulBooker.Booking: Given No preconditions', { testIsolation: false }, () => {
  let createdBooking;
  context('RestfulBooker.CreateBooking.POST: When valid request to create a booking is sent', () => {
    it('RestfulBooker.Booking.POST: Then Apartments are booked', () => {
      cy.createBooking_POST(booking_testData.validBooking, { failOnStatusCode: false }).then((response) => {
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
    it.skip('RestfulBooker.CreateBooking.POST: Then the correct error message is received', () => {
      const randomCase = booking_testData.emptyFieldCases[Math.floor(Math.random() * booking_testData.emptyFieldCases.length)];
      cy.log(`Testing creating booking with empty field: **${randomCase.field}**`);
      cy.createBooking_POST(randomCase.data, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.generalError);
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
      cy.getBooking_GET(createdBooking.bookingid, { failOnStatusCode: false }).then((response) => {
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
        response.body.forEach((item) => {
          cy.getBooking_GET(item.bookingid).then((bookingResp) => {
            expect(bookingResp.body.firstname).to.eq(createdBooking.booking.firstname);
          });
        });
      });
    });
  });

  context('RestfulBooker.GetBookingIds.GET: When search for all bookings by lastname', () => {
    it('RestfulBooker.GetBookingIds.GET: Then all IDs with such lastname are got', () => {
      cy.getBookingIds_GET({ lastname: createdBooking.booking.lastname }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
        response.body.forEach((item) => {
          cy.getBooking_GET(item.bookingid).then((bookingResp) => {
            expect(bookingResp.body.lastname).to.eq(createdBooking.booking.lastname);
          });
        });
      });
    });
  });

  context('RestfulBooker.GetBookingIds.GET: When search for all bookings by checkin', () => {
    // TODO: fix the bug api_getBookingIds_GET_searchByCheckin: https://github.com/NatalliaSavitskaya/Cypress/issues/29
    it.skip('RestfulBooker.GetBookingIds.GET: Then all IDs with later or equal checkin value are got', () => {
      cy.getBookingIds_GET({ checkin: createdBooking.booking.bookingdates.checkin }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        response.body.forEach((item) => {
          cy.getBooking_GET(item.bookingid).then((bookingResp) => {
            const bookingCheckIn = bookingResp.body?.bookingdates?.checkin;
            if (bookingCheckIn) {
              const created = new Date(createdBooking.booking.bookingdates.checkin);
              const actual = new Date(bookingCheckIn);
              if (!Number.isNaN(actual.getTime())) {
                expect(actual.getTime()).to.be.gte(created.getTime());
              }
            }
          });
        });
      });
    });
  });

  context('RestfulBooker.GetBookingIds.GET: When search for all bookings by checkout', () => {
    // TODO: fix the bug api_getBookingIds_GET_searchByCheckout: https://github.com/NatalliaSavitskaya/Cypress/issues/30
    it.skip('RestfulBooker.GetBookingIds.GET: Then all IDs with later or equal checkout value are got', () => {
      cy.getBookingIds_GET({ checkout: createdBooking.booking.bookingdates.checkout }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        response.body.forEach((item) => {
          cy.getBooking_GET(item.bookingid).then((bookingResp) => {
            const bookingCheckOut = bookingResp.body?.bookingdates?.checkout;
            if (bookingCheckOut) {
              const created = new Date(createdBooking.booking.bookingdates.checkout);
              const actual = new Date(bookingCheckOut);
              if (!Number.isNaN(actual.getTime())) {
                expect(actual.getTime()).to.be.gte(created.getTime());
              }
            }
          });
        });
      });
    });
  });

  context('RestfulBooker.UpdateBooking.PATCH: When update a random booking parameter with valid value', () => {
    it('RestfulBooker.UpdateBooking.PATCH: Then the chosen parameter in booking is edited to the new value', () => {
      const randomUpdate = booking_testData.updatedParameters();
      const updatableFields = ['firstname', 'lastname', 'totalprice', 'checkin', 'checkout', 'additionalneeds'];
      const fieldToUpdate = updatableFields[Math.floor(Math.random() * updatableFields.length)];
      cy.getBooking_GET(createdBooking.bookingid).then((originalResp) => {
        const originalBooking = originalResp.body;
        let oldValue;
        let updateBody;
        if (fieldToUpdate === 'checkin' || fieldToUpdate === 'checkout') {
          oldValue = originalBooking.bookingdates[fieldToUpdate];
          updateBody = { bookingdates: { [fieldToUpdate]: randomUpdate.body.bookingdates[fieldToUpdate] } };
        } else if (fieldToUpdate === 'additionalneeds') {
          oldValue = originalBooking.additionalneeds;
          updateBody = { additionalneeds: randomUpdate.additionalneeds };
        } else {
          oldValue = originalBooking[fieldToUpdate];
          updateBody = { [fieldToUpdate]: randomUpdate.body[fieldToUpdate] };
        }
        cy.partialUpdateBooking_PATCH(createdBooking.bookingid, updateBody).then((response) => {
          expect(response.status).to.eq(200);
          let expectedValue;
          if (fieldToUpdate === 'checkin' || fieldToUpdate === 'checkout') {
            expectedValue = randomUpdate.body.bookingdates[fieldToUpdate];
            expect(response.body.bookingdates[fieldToUpdate]).to.eq(expectedValue);
          } else if (fieldToUpdate === 'additionalneeds') {
            expectedValue = randomUpdate.additionalneeds;
            expect(response.body.additionalneeds).to.eq(expectedValue);
          } else {
            expectedValue = randomUpdate.body[fieldToUpdate];
            expect(response.body[fieldToUpdate]).to.eq(expectedValue);
          }
          cy.log(`Updated **${fieldToUpdate}** from **${oldValue}** to **${expectedValue}**`);
        });
      });
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

  context('RestfulBooker.UpdateBooking.PATCH: When updating checkin to a past date', () => {
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

  context('RestfulBooker.UpdateBooking.PATCH: When updating checkin to be equal to checkout', () => {
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

  context('RestfulBooker.UpdateBooking.PATCH: When updating checkout to be equal to checkin', () => {
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
