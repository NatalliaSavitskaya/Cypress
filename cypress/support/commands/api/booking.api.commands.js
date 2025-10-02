Cypress.Commands.add('createBooking_POST', (data, restOptions = {}) => {
  const { body, additionalneeds = '' } = data;
  const requestBody = { ...body, additionalneeds };
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
    url: `${urls.apiBaseUrl.booking}`,
    qs: params,
    ...restOptions,
  });
});

Cypress.Commands.add('getBooking_GET', (id, restOptions = {}) => {
  return cy.request({
    method: 'GET',
    url: `${urls.apiBaseUrl.booking}${id}`,
    headers: {
      'Accept': 'application/json',
    },
    ...restOptions,
  });
});

Cypress.Commands.add('partialUpdateBooking_PATCH', (id, updatedParameters, restOptions = {}) => {

  return cy.createToken_POST().then((response) => {
    const token = response.body.token;
    cy.log('Token: ' + token);

    return cy.request({
      method: 'PATCH',
      url: `${urls.apiBaseUrl.booking}${id}`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': `token=${token}`,
      },
      body: updatedParameters,
      ...restOptions,
    });
  });
});

  Cypress.Commands.add('createToken_POST', (restOptions = {}) => {
    return cy.request({
      method: 'POST',
      url: `${urls.apiBaseUrl.auth}`,
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        username: 'admin',
        password: 'password123',
      },
      ...restOptions,
    });
  });

Cypress.Commands.add('healthCheck_GET', (restOptions = {}) => {
  return cy.request({
    method: 'GET',
    url: `${urls.apiBaseUrl.ping}`,
    ...restOptions,
  });
});