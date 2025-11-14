Cypress.Commands.add('resetAppState', () => {
  cy.get(headerItems.burgerMenu).click({ animationDistanceThreshold: 20 });
  cy.get(headerItems.resetAppState).click();
  cy.get(headerItems.closeMenu).click();
});

Cypress.Commands.add('loginUser', ({ username, password }) => {
  cy.get(loginPage.username).type(username, { delay: 0 });
  cy.get(loginPage.password).type(password, { log: false, delay: 0 });
  cy.then(() => {
    cy.get(loginPage.login).click();
  });
});

Cypress.Commands.add('checkoutUser', ({ firstname, lastname, zipcode }) => {
  cy.get(checkoutInfoPage.firstName).type(firstname, { delay: 0 });
  cy.get(checkoutInfoPage.lastName).type(lastname, { log: false, delay: 0 });
  cy.get(checkoutInfoPage.zip).type(zipcode, { log: false, delay: 0 });
  cy.then(() => {
    cy.get(checkoutInfoPage.continue).click();
  });
});

Cypress.Commands.add('getRandomProductIndex', () => {
  return Math.floor(Math.random() * requirements.inventoryPage.numberOfProductsOnThePage);
});