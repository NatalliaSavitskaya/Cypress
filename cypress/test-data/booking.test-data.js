import { generateRandomText, generateNumber, generateBooleanValue, generateDateInRange, generateAdditionalNeeds } from '../support/utils';

export const testData = {
  validBooking: {
    firstname: generateRandomText(10),
    lastname: generateRandomText(10),
    totalprice: generateNumber(1, 500),
    depositpaid: generateBooleanValue(),
    bookingdates: {
      checkin: generateDateInRange(1, 5),
      checkout: generateDateInRange(6, 10),
    },
    additionalneeds: generateAdditionalNeeds(),
  },

  updatedValidBooking: {
    firstname: generateRandomText(10),
    lastname: generateRandomText(10),
    totalprice: generateNumber(1, 500),
    depositpaid: generateBooleanValue(),
    bookingdates: {
      checkin: generateDateInRange(1, 5),
      checkout: generateDateInRange(6, 10),
    },
    additionalneeds: generateRandomText(10),
  },

  emptyFirstnameBooking: {
    firstname: '',
    lastname: generateRandomText(10),
    totalprice: generateNumber(1, 500),
    depositpaid: generateBooleanValue(),
    bookingdates: {
      checkin: generateDateInRange(1, 5),
      checkout: generateDateInRange(6, 10),
    },
    additionalneeds: generateAdditionalNeeds(),
  },

  emptyLastnameBooking: {
    firstname: generateRandomText(10),
    lastname: '',
    totalprice: generateNumber(1, 500),
    depositpaid: generateBooleanValue(),
    bookingdates: {
      checkin: generateDateInRange(1, 5),
      checkout: generateDateInRange(6, 10),
    },
    additionalneeds: generateAdditionalNeeds(),
  },

  emptyTotalPriceBooking: {
    firstname: generateRandomText(10),
    lastname: generateRandomText(10),
    totalprice: '',
    depositpaid: generateBooleanValue(),
    bookingdates: {
      checkin: generateDateInRange(1, 5),
      checkout: generateDateInRange(6, 10),
    },
    additionalneeds: generateAdditionalNeeds(),
  },

  emptyDepositPaid: {
    firstname: generateRandomText(10),
    lastname: generateRandomText(10),
    totalprice: generateNumber(1,500),
    depositpaid: '',
    bookingdates: {
      checkin: generateDateInRange(1, 5),
      checkout: generateDateInRange(6, 10),
    },
    additionalneeds: generateAdditionalNeeds(),
  },

  emptyCheckinBooking: {
    firstname: generateRandomText(10),
    lastname: generateRandomText(10),
    totalprice: generateNumber(1, 500),
    depositpaid: generateBooleanValue(),
    bookingdates: {
      checkin: '',
      checkout: generateDateInRange(6, 10),
    },
    additionalneeds: generateAdditionalNeeds(),
  },

  emptyCheckoutBooking: {
    firstname: generateRandomText(10),
    lastname: generateRandomText(10),
    totalprice: generateNumber(1, 500),
    depositpaid: generateBooleanValue(),
    bookingdates: {
      checkin: generateDateInRange(1, 5),
      checkout: '',
    },
    additionalneeds: generateAdditionalNeeds(),
  },

  emptyAdditionalNeedsBooking: {
    firstname: generateRandomText(10),
    lastname: generateRandomText(10),
    totalprice: generateNumber(1, 500),
    depositpaid: generateBooleanValue(),
    bookingdates: {
      checkin: generateDateInRange(1, 5),
      checkout: generateDateInRange(6, 10),
    },
    additionalneeds: '',
  },

  noFirstnameBooking: {
    lastname: generateRandomText(10),
    totalprice: generateNumber(1, 500),
    depositpaid: generateBooleanValue(),
    bookingdates: {
      checkin: generateDateInRange(1, 5),
      checkout: generateDateInRange(6, 10),
    },
    additionalneeds: generateAdditionalNeeds(),
  },

  noLastnameBooking: {
    firstname: generateRandomText(10),
    totalprice: generateNumber(1, 500),
    depositpaid: generateBooleanValue(),
    bookingdates: {
      checkin: generateDateInRange(1, 5),
      checkout: generateDateInRange(6, 10),
    },
    additionalneeds: generateAdditionalNeeds(),
  },

  noTotalPriceBooking: {
    firstname: generateRandomText(10),
    lastname: generateRandomText(10),
    depositpaid: generateBooleanValue(),
    bookingdates: {
      checkin: generateDateInRange(1, 5),
      checkout: generateDateInRange(6, 10),
    },
    additionalneeds: generateAdditionalNeeds(),
  },

  noDepositPaid: {
    firstname: generateRandomText(10),
    lastname: generateRandomText(10),
    totalprice: generateNumber(1,500),
    bookingdates: {
      checkin: generateDateInRange(1, 5),
      checkout: generateDateInRange(6, 10),
    },
    additionalneeds: generateAdditionalNeeds(),
  },

  noCheckinBooking: {
    firstname: generateRandomText(10),
    lastname: generateRandomText(10),
    totalprice: generateNumber(1, 500),
    depositpaid: generateBooleanValue(),
    bookingdates: {
      checkout: generateDateInRange(6, 10),
    },
    additionalneeds: generateAdditionalNeeds(),
  },

  noCheckoutBooking: {
    firstname: generateRandomText(10),
    lastname: generateRandomText(10),
    totalprice: generateNumber(1, 500),
    depositpaid: generateBooleanValue(),
    bookingdates: {
      checkin: generateDateInRange(1, 5),
    },
    additionalneeds: generateAdditionalNeeds(),
  },

  noAdditionalNeedsBooking: {
    firstname: generateRandomText(10),
    lastname: generateRandomText(10),
    totalprice: generateNumber(1, 500),
    depositpaid: generateBooleanValue(),
    bookingdates: {
      checkin: generateDateInRange(1, 5),
      checkout: generateDateInRange(6, 10),
    },
  },

  invalidTypeFirstnameBooking: {
    firstname: generateNumber(1, 500),
    lastname: generateRandomText(10),
    totalprice: generateNumber(1, 500),
    depositpaid: generateBooleanValue(),
    bookingdates: {
      checkin: generateDateInRange(1, 5),
      checkout: generateDateInRange(6, 10),
    },
    additionalneeds: generateAdditionalNeeds(),
  },

  invalidTypeLastnameBooking: {
    firstname: generateRandomText(10),
    lastname: generateNumber(1, 500),
    totalprice: generateNumber(1, 500),
    depositpaid: generateBooleanValue(),
    bookingdates: {
      checkin: generateDateInRange(1, 5),
      checkout: generateDateInRange(6, 10),
    },
    additionalneeds: generateAdditionalNeeds(),
  },

  invalidTypeTotalPriceBooking: {
    firstname: generateRandomText(10),
    lastname: generateRandomText(10),
    totalprice: generateBooleanValue(),
    depositpaid: generateBooleanValue(),
    bookingdates: {
      checkin: generateDateInRange(1, 5),
      checkout: generateDateInRange(6, 10),
    },
    additionalneeds: generateAdditionalNeeds(),
  },

  invalidTypeDepositPaid: {
    firstname: generateRandomText(10),
    lastname: generateRandomText(10),
    totalprice: generateNumber(1,500),
    depositpaid: generateNumber(1,500),
    bookingdates: {
      checkin: generateDateInRange(1, 5),
      checkout: generateDateInRange(6, 10),
    },
    additionalneeds: generateAdditionalNeeds(),
  },

  invalidTypeCheckinBooking: {
    firstname: generateRandomText(10),
    lastname: generateRandomText(10),
    totalprice: generateNumber(1, 500),
    depositpaid: generateBooleanValue(),
    bookingdates: {
      checkin: generateBooleanValue(),
      checkout: generateDateInRange(6, 10),
    },
    additionalneeds: generateAdditionalNeeds(),
  },

  invalidTypeCheckoutBooking: {
    firstname: generateRandomText(10),
    lastname: generateRandomText(10),
    totalprice: generateNumber(1, 500),
    depositpaid: generateBooleanValue(),
    bookingdates: {
      checkin: generateDateInRange(1, 5),
      checkout: generateBooleanValue(),
    },
    additionalneeds: generateAdditionalNeeds(),
  },

  invalidTypeAdditionalNeedsBooking: {
    firstname: generateRandomText(10),
    lastname: generateRandomText(10),
    totalprice: generateNumber(1, 500),
    depositpaid: generateBooleanValue(),
    bookingdates: {
      checkin: generateDateInRange(1, 5),
      checkout: generateDateInRange(6, 10),
    },
    additionalneeds: generateBooleanValue(),
  },

  checkInMoreThanCheckOutBooking: {
    firstname: generateRandomText(10),
    lastname: generateRandomText(10),
    totalprice: generateNumber(1, 500),
    depositpaid: generateBooleanValue(),
    bookingdates: {
      checkin: generateDateInRange(6, 5),
      checkout: generateDateInRange(1, 5),
    },
    additionalneeds: generateAdditionalNeeds(),
  },

  checkInEqualCheckOutBooking: {
    firstname: generateRandomText(10),
    lastname: generateRandomText(10),
    totalprice: generateNumber(1, 500),
    depositpaid: generateBooleanValue(),
    bookingdates: {
      checkin: generateDateInRange(1, 1),
      checkout: generateDateInRange(1, 1),
    },
    additionalneeds: generateAdditionalNeeds(),
  },

  checkInInThePastBooking: {
    firstname: generateRandomText(10),
    lastname: generateRandomText(10),
    totalprice: generateNumber(1, 500),
    depositpaid: generateBooleanValue(),
    bookingdates: {
      checkin: generateDateInRange(-5, -3),
      checkout: generateDateInRange(1, 5),
    },
    additionalneeds: generateAdditionalNeeds(),
  },
};
