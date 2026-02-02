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
    body: data,
    ...restOptions,
  });
});

Cypress.Commands.add('getBookingIds_GET', (params = {}, restOptions = {}) => {
  return cy.request({
    method: 'GET',
    url: `${urls.apiUrls.booking}`,
    body: params,
    ...restOptions,
  });
});

Cypress.Commands.add('getBooking_GET', (id, restOptions = {}) => {
  return cy.request({
    method: 'GET',
    url: `${urls.apiUrls.booking}${id}`,
    ...restOptions,
  });
});

Cypress.Commands.add('partialUpdateBooking_PATCH', (token, id, updatedParameters, restOptions = {}) => {
  return cy.request({
    method: 'PATCH',
    url: `${urls.apiUrls.booking}${id}`,
    headers: {
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