// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('resetAppState', () => {
  cy.get(headerItems.burgerMenu).click({ animationDistanceThreshold: 20 });
  cy.then(() => {
    cy.get(headerItems.resetAppState).click();
  });
  cy.then(() => {
    cy.get(headerItems.closeMenu).click();
  });
});
Cypress.Commands.add('loginUser', ({username,password}) => {
  cy.get(loginPage.username).type(username,{ delay: 0 });
  cy.get(loginPage.password).type(password, { log: false, delay: 0 });
  cy.then(() => {
    cy.get(loginPage.login).click();
  });
});
Cypress.Commands.add('checkoutUser', ({firstname,lastname, zipcode}) => {
  cy.get(checkoutInfoPage.firstName).type(firstname,{ delay: 0 });
  cy.get(checkoutInfoPage.lastName).type(lastname, { log: false, delay: 0 });
  cy.get(checkoutInfoPage.zip).type(zipcode, { log: false, delay: 0 });
  cy.then(() => {
    cy.get(checkoutInfoPage.continue).click();
  });
});
