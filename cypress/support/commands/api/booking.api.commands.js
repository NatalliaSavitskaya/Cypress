Cypress.Commands.add('healthCheck_GET', (restOptions = {}) => {
  return cy.request({
    method: 'GET',
    url: `${urls.apiUrls.ping}`,
    ...restOptions,
  });
});

Cypress.Commands.add('createToken_POST', (user, restOptions = {}) => {
  return cy.request({
    method: 'POST',
    url: `${urls.apiUrls.auth}`,
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      username: user.username,
      password: user.password,
    },
    ...restOptions,
  });
});

Cypress.Commands.add('createBooking_POST', (data, restOptions = {}) => {
  return cy.request({
    method: 'POST',
    url: `${urls.apiUrls.booking}`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
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
      Accept: 'application/json',
    },
    ...restOptions,
  });
});

Cypress.Commands.add('partialUpdateBooking_PATCH', (token, id, updatedParameters, restOptions = {}) => {
  return cy.request({
    method: 'PATCH',
    url: `${urls.apiUrls.booking}${id}`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Cookie: `token=${token}`,
    },
    body: updatedParameters,
    ...restOptions,
  });
});

Cypress.Commands.add('updateBooking_PUT', (token, id, updatedParameters, restOptions = {}) => {
  return cy.request({
    method: 'PUT',
    url: `${urls.apiUrls.booking}${id}`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Cookie: `token=${token}`,
    },
    body: updatedParameters,
    ...restOptions,
  });
});

Cypress.Commands.add('deleteBooking_DELETE', (token, id, restOptions = {}) => {
  return cy.request({
    method: 'DELETE',
    url: `${urls.apiUrls.booking}${id}`,
    headers: {
      Cookie: `token=${token}`,
    },
    ...restOptions,
  });
});