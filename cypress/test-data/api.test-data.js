import { faker } from '@faker-js/faker';
import numberToWords from 'number-to-words';

const generateValidDates = () => {
  const checkin = faker.date.soon({ days: 30 });
  const checkout = faker.date.soon({ days: 60, refDate: checkin });
  return {
    checkin: checkin.toISOString().split('T')[0],
    checkout: checkout.toISOString().split('T')[0],
  };
};

const generateInvalidDates = () => {
  const checkout = faker.date.soon({ days: 30 });
  const checkin = faker.date.soon({ days: 60, refDate: checkout });
  return {
    checkin: checkin.toISOString().split('T')[0],
    checkout: checkout.toISOString().split('T')[0],
  };
};

const generatePrice = () => Math.floor(Math.random() * 1000) + 50;

export const booking_testData = {
  validBooking: () => {
    return {
      body: {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        totalprice: generatePrice(),
        depositpaid: true,
        bookingdates: generateValidDates(),
      },
      additionalneeds: faker.helpers.arrayElement(['Breakfast', 'Lunch', 'Dinner', 'None']),
    };
  },

  emptyFirstNameBooking: () => {
    return {
      body: {
        firstname: '',
        lastname: faker.person.lastName(),
        totalprice: generatePrice(),
        depositpaid: true,
        bookingdates: generateValidDates(),
      },
      additionalneeds: faker.helpers.arrayElement(['Breakfast', 'Lunch', 'Dinner', 'None']),
    };
  },

  emptyLastNameBooking: () => {
    return {
      body: {
        firstname: faker.person.firstName(),
        lastname: '',
        totalprice: generatePrice(),
        depositpaid: true,
        bookingdates: generateValidDates(),
      },
      additionalneeds: faker.helpers.arrayElement(['Breakfast', 'Lunch', 'Dinner', 'None']),
    };
  },

  emptyTotalPriceBooking: () => {
    return {
      body: {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        totalprice: '',
        depositpaid: true,
        bookingdates: generateValidDates(),
      },
      additionalneeds: faker.helpers.arrayElement(['Breakfast', 'Lunch', 'Dinner', 'None']),
    };
  },

  emptyCheckInBooking: () => {
    return {
      body: {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        totalprice: generatePrice(),
        depositpaid: true,
        bookingdates: {
          checkin: '',
          checkout: faker.date.soon({ days: 60 }).toISOString().split('T')[0],
        },
      },
      additionalneeds: faker.helpers.arrayElement(['Breakfast', 'Lunch', 'Dinner', 'None']),
    };
  },

  emptyCheckOutBooking: () => {
    return {
      body: {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        totalprice: generatePrice(),
        depositpaid: true,
        bookingdates: {
          checkin: faker.date.soon({ days: 30 }).toISOString().split('T')[0],
          checkout: '',
        },
      },
      additionalneeds: faker.helpers.arrayElement(['Breakfast', 'Lunch', 'Dinner', 'None']),
    };
  },

  emptyAdditionalDetailsBooking: () => {
    return {
      body: {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        totalprice: generatePrice(),
        depositpaid: true,
        bookingdates: generateValidDates(),
      },
      additionalneeds: '',
    };
  },

  CheckInMoreThanCheckOutBooking: () => {
    return {
      body: {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        totalprice: generatePrice(),
        depositpaid: true,
        bookingdates: generateInvalidDates(),
      },
      additionalneeds: faker.helpers.arrayElement(['Breakfast', 'Lunch', 'Dinner', 'None']),
    };
  },

  CheckInEqualCheckOutBooking: () => {
    const date = faker.date.soon({ days: 30 }).toISOString().split('T')[0];
    return {
      body: {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        totalprice: generatePrice(),
        depositpaid: true,
        bookingdates: {
          checkin: date,
          checkout: date,
        },
      },
      additionalneeds: faker.helpers.arrayElement(['Breakfast', 'Lunch', 'Dinner', 'None']),
    };
  },

  CheckInInThePastBooking: () => {
    let now = new Date();
    let checkin = faker.date.between({
      from: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
      to: now
    }).toISOString().split('T')[0];
    let checkout = faker.date.between({
      from: now,
      to: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
    }).toISOString().split('T')[0];
    return {
      body: {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        totalprice: generatePrice(),
        depositpaid: true,
        bookingdates: { checkin, checkout  }
      },
      additionalneeds: faker.helpers.arrayElement(['Breakfast', 'Lunch', 'Dinner', 'None'])
    };
  },

  invalidFirstnameDataTypeBooking: () => {
    return {
      body: {
        firstname: faker.datatype.boolean(),
        lastname: faker.person.lastName(),
        totalprice: generatePrice(),
        depositpaid: true,
        bookingdates: generateValidDates(),
      },
      additionalneeds: faker.helpers.arrayElement(['Breakfast', 'Lunch', 'Dinner', 'None']),
    };
  },

  invalidLastnameDataTypeBooking: () => {
    return {
      body: {
        firstname: faker.person.firstName(),
        lastname: faker.datatype.boolean(),
        totalprice: generatePrice(),
        depositpaid: true,
        bookingdates: generateValidDates(),
      },
      additionalneeds: faker.helpers.arrayElement(['Breakfast', 'Lunch', 'Dinner', 'None']),
    };
  },

  invalidPriceDataTypeBooking: () => {
    const number = generatePrice();
    return {
      body: {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        totalprice: `${number} ${numberToWords.toWords(number)}`,
        depositpaid: true,
        bookingdates: generateValidDates(),
      },
      additionalneeds: faker.helpers.arrayElement(['Breakfast', 'Lunch', 'Dinner', 'None']),
    };
  },

  invalidDepositPaidDataTypeBooking: () => {
    return {
      body: {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        totalprice: generatePrice(),
        depositpaid: generatePrice(),
        bookingdates: generateValidDates(),
      },
      additionalneeds: faker.helpers.arrayElement(['Breakfast', 'Lunch', 'Dinner', 'None']),
    };
  },

  invalidCheckInDataTypeBooking: () => {
    return {
      body: {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        totalprice: generatePrice(),
        depositpaid: true,
        bookingdates: {
          checkin: faker.person.firstName(),
          checkout: faker.date.soon({ days: 60 }).toISOString().split('T')[0],
        },
      },
      additionalneeds: faker.helpers.arrayElement(['Breakfast', 'Lunch', 'Dinner', 'None']),
    };
  },

  invalidCheckOutDataTypeBooking: () => {
    return {
      body: {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        totalprice: generatePrice(),
        depositpaid: true,
        bookingdates: {
          checkin: faker.date.soon({ days: 60 }).toISOString().split('T')[0],
          checkout: faker.person.lastName(),
        },
      },
      additionalneeds: faker.helpers.arrayElement(['Breakfast', 'Lunch', 'Dinner', 'None']),
    };
  },

  invalidAdditionalNeedsDataTypeBooking: () => {
    return {
      body: {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        totalprice: generatePrice(),
        depositpaid: true,
        bookingdates: generateValidDates(),
      },
      additionalneeds: faker.datatype.boolean(),
    };
  },

  noDepositBooking: () => {
    return {
      body: {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        totalprice: generatePrice(),
        depositpaid: false,
        bookingdates: generateValidDates(),
      },
      additionalneeds: faker.helpers.arrayElement(['Breakfast', 'Lunch', 'Dinner', 'None']),
    };
  },

  updatedParameters:()=> {
    return {
      body: {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        totalprice: generatePrice(),
        depositpaid: true,
        bookingdates: generateValidDates(),
      },
      additionalneeds: faker.helpers.arrayElement(['Breakfast', 'Lunch', 'Dinner', 'None']),
    };
  },
};