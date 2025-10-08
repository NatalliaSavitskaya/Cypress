import { genRandomText, generatePrice, generateDepositPaid, generateValidDates, generateInvalidDates, generateDateInThePast } from '../support/utils';

const baseBooking = () => ({
  firstname: genRandomText(),
  lastname: genRandomText(),
  totalprice: generatePrice(),
  depositpaid: generateDepositPaid(),
  bookingdates: generateValidDates(),
});

const withOverride = (overrides = {}, additionalneeds) => ({
  body: { ...baseBooking(), ...overrides },
  additionalneeds: additionalneeds ?? genRandomText(),
});

export const booking_testData = {
  validBooking: withOverride(),

  // empty fields
  emptyFieldCases: (() => {
    const validDates = generateValidDates();
    return [
      {
        field: 'firstname',
        data: withOverride({ firstname: '' }),
        expectedError: l10n.apiBooking.errors.firstnameIsRequired,
      },
      {
        field: 'lastname',
        data: withOverride({ lastname: '' }),
        expectedError: l10n.apiBooking.errors.lastnameIsRequired,
      },
      {
        field: 'totalprice',
        data: withOverride({ totalprice: '' }),
        expectedError: l10n.apiBooking.errors.totalPriceIsRequired,
      },
      {
        field: 'checkin',
        data: withOverride({
          bookingdates: { checkin: '', checkout: validDates.checkout },
        }),
        expectedError: l10n.apiBooking.errors.checkInIsRequired,
      },
      {
        field: 'checkout',
        data: withOverride({
          bookingdates: { checkin: validDates.checkin, checkout: '' },
        }),
        expectedError: l10n.apiBooking.errors.checkOutIsRequired,
      },
      {
        field: 'additionalneeds',
        data: withOverride({}, ''),
        expectedError: l10n.apiBooking.errors.additionalNeedsIsRequired,
      },
    ];
  })(),

  // invalid data types
  invalidFieldCases: [
    {
      field: 'firstname',
      data: withOverride({ firstname: generateDepositPaid() }),
    },
    {
      field: 'lastname',
      data: withOverride({ lastname: generateDepositPaid() }),
    },
    {
      field: 'totalprice',
      data: withOverride({ totalprice: generateDepositPaid() }),
    },
    {
      field: 'depositpaid',
      data: withOverride({ depositpaid: generatePrice() }),
    },
    {
      field: 'checkin',
      data: withOverride({ bookingdates: { checkin: generateDepositPaid(), checkout: generateValidDates().checkout } }),
    },
    {
      field: 'checkout',
      data: withOverride({ bookingdates: { checkin: generateValidDates().checkin, checkout: generateDepositPaid() } }),
    },
    {
      field: 'additionalneeds',
      data: withOverride({}, generateDepositPaid()),
    },
  ],

  // invalid values for booking dates
  checkInMoreThanCheckOutBooking: withOverride({ bookingdates: generateInvalidDates() }),
  checkInEqualCheckOutBooking: (() => {
    const date = generateValidDates().checkin;
    return withOverride({ bookingdates: { checkin: date, checkout: date } });
  })(),
  checkInInThePastBooking: (() => {
    const checkin = generateDateInThePast();
    const checkout = generateValidDates().checkout;
    return withOverride({
      bookingdates: {
        checkin,
        checkout,
      },
    });
  })(),

  // parameters for update tests
  updatedParameters: () => ({
    body: {
      firstname: genRandomText(),
      lastname: genRandomText(),
      totalprice: generatePrice(),
      depositpaid: generateDepositPaid(),
      bookingdates: generateValidDates(),
    },
    additionalneeds: genRandomText(),
  }),
};
