Cypress.Commands.add('createBooking_POST', (data, restOptions = {}) => {
  const { body, additionalNeeds = '' } = data;

  const requestBody = { ...body, additionalneeds: additionalNeeds };

  return cy.request({
    method: 'POST',
    url: 'https://restful-booker.herokuapp.com/booking',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: requestBody,
    ...restOptions,
  });
});

Cypress.Commands.add('getBookingIds_GET', (params = {}, restOptions = {}) => {
  return cy.request({
    method: 'GET',
    url: 'https://restful-booker.herokuapp.com/booking',
    qs: params,
    ...restOptions,
  });
});

Cypress.Commands.add('getBooking_GET', (id, restOptions = {}) => {
  return cy.request({
    method: 'GET',
    url: `https://restful-booker.herokuapp.com/booking/${id}`,
    headers: {
      Accept: 'application/json',
    },
    ...restOptions,
  });
});