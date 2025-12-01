Cypress.Commands.add('createBooking_POST', (data, restOptions = {}) => {
  return cy.request({
    method: 'POST',
    url: `${urls.apiUrls.booking}`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: data,
    ...restOptions,
  });
});

Cypress.Commands.add('getBookingIds_GET', (params = {}, restOptions = {}) => {
  return cy.request({
    method: 'GET',
    url: `${urls.apiUrls.booking}`,
    qs: params,
    ...restOptions,
  });
});

Cypress.Commands.add('getBooking_GET', (id, restOptions = {}) => {
  return cy.request({
    method: 'GET',
    url: `${urls.apiUrls.booking}${id}`,
    headers: {
      'Accept': 'application/json',
    },
    ...restOptions,
  });
});

Cypress.Commands.add('partialUpdateBooking_PATCH', (id, updatedParameters, restOptions = {}) => {
  return cy.createToken_POST({ }).then((response) => {
    const token = response.body.token;

    return cy.request({
      method: 'PATCH',
      url: `${urls.apiUrls.booking}${id}`,
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

Cypress.Commands.add('updateBooking_PUT', (id, updatedParameters, restOptions = {}) => {
  return cy.createToken_POST({ }).then((response) => {
    const token = response.body.token;

    return cy.request({
      method: 'PUT',
      url: `${urls.apiUrls.booking}${id}`,
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

Cypress.Commands.add('deleteBooking_DELETE', (id, restOptions = {}) => {
  return cy.createToken_POST({  }).then((response) => {
    const token = response.body.token;

    return cy.request({
      method: 'DELETE',
      url: `${urls.apiUrls.booking}${id}`,
      headers: {
        'Cookie': `token=${token}`,
      },
      ...restOptions,
    });
  });
});

  Cypress.Commands.add('createToken_POST', (restOptions = {}) => {
    return cy.request({
      method: 'POST',
      url: `${urls.apiUrls.auth}`,
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
    url: `${urls.apiUrls.ping}`,
    ...restOptions,
  });
});