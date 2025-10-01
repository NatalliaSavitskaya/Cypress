import { faker } from '@faker-js/faker';

export const booking_testData = {
  validBooking: {
    body: {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      totalprice: Math.floor(Math.random() * 1000) + 50,
      depositpaid: Math.random() < 0.5,
      bookingdates: {
        checkin: faker.date.soon({ days: 30 }).toISOString().split('T')[0],
        checkout: faker.date.soon({ days: 60 }).toISOString().split('T')[0],
      },
    },
    additionalNeeds: faker.helpers.arrayElement(['Breakfast', 'Lunch', 'Dinner', 'None']),
  },
  emptyAdditionalDetailsBooking: {
    body: {
      firstname: 'Jim',
      lastname: 'Smith',
      totalprice: 333,
      depositpaid: true,
      bookingdates: {
        checkin: '2018-02-01',
        checkout: '2019-02-01',
      },
    },
  },
  emptyFirstNameBooking: {
    body: {
      firstname: '',
      lastname: 'Smith',
      totalprice: 222,
      depositpaid: true,
      bookingdates: {
        checkin: '2019-01-01',
        checkout: '2019-01-03',
      },
    },
  },
  emptyLastNameBooking: {
    body: {
      firstname: 'Samantha',
      lastname: '',
      totalprice: 201,
      depositpaid: true,
      bookingdates: {
        checkin: '2019-03-01',
        checkout: '2019-03-02',
      },
    },
  },
  emptyCheckInBooking: {
    body: {
      firstname: 'Mary',
      lastname: 'Camry',
      totalprice: 101,
      depositpaid: true,
      bookingdates: {
        checkin: '',
        checkout: '2019-01-01',
      },
    },
  },
  emptyCheckOutBooking: {
    body: {
      firstname: 'John',
      lastname: 'Smile',
      totalprice: 123,
      depositpaid: true,
      bookingdates: {
        checkin: '2018-01-01',
        checkout: '',
      },
    },
  },
  invalidPriceDataTypeBooking: {
    body: {
      firstname: 'Bim',
      lastname: 'Collen',
      totalprice: 'One dollar',
      depositpaid: true,
      bookingdates: {
        checkin: '2018-02-01',
        checkout: '2019-02-01',
      },
    },
  },
  invalidDepositPaidDataTypeBooking: {
    body: {
      firstname: 'Bim',
      lastname: 'Collen',
      totalprice: 500,
      depositpaid: 12345,
      bookingdates: {
        checkin: '2018-02-01',
        checkout: '2019-02-01',
      },
    },
  },
  invalidCheckInDataTypeBooking: {
    body: {
      firstname: 'Bim',
      lastname: 'Collen',
      totalprice: 333,
      depositpaid: true,
      bookingdates: {
        checkin: 'Hello!',
        checkout: '2019-02-01',
      },
    },
  },
  invalidCheckOutDataTypeBooking: {
    body: {
      firstname: 'Bim',
      lastname: 'Collen',
      totalprice: 333,
      depositpaid: true,
      bookingdates: {
        checkin: '2018-02-01',
        checkout: 'Nice to meet you!',
      },
    },
  },
  noDepositBooking: {
    body: {
      firstname: 'Bim',
      lastname: 'Collen',
      totalprice: 333,
      depositpaid: false,
      bookingdates: {
        checkin: '2018-02-01',
        checkout: '2018-02-02',
      },
    },
  },
};