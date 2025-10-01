import requirements from '../../support/requirements.js';

describe('CheckoutInfoPage: Given Checkout Info page opened', { testIsolation: false }, () => {
  before(() => {
    cy.visit('/');
    cy.loginUser(users.StandardUser);
    cy.resetAppState();
    // TODO: fix the bug inventoryPage_resetDoesNotClearRemoveButton: https://github.com/NatalliaSavitskaya/Cypress/issues/6#issue-3300190487
    cy.get(headerItems.cartIcon).click();
    cy.get(cartPage.checkout).click();
  });

  context('CheckoutInfoPage: When user explore the Checkout Info page', () => {
    it('CheckoutInfoPage: Then user should see the URL of Checkout Info page', () => {
      cy.url().should('eq', urls.pages.checkoutInfo);
    });
    it('CheckoutInfoPage: Then user should see the title of Checkout Info page', () => {
      cy.get(checkoutInfoPage.title).should('have.text', l10n.checkoutInfoPage.title).and('be.visible');
    });
    it('CheckoutInfoPage: Then user should see the Cart icon', () => {
      cy.get(headerItems.cartIcon).should('be.visible');
    });
    it('CheckoutInfoPage: Then user should see Burger menu', () => {
      cy.get(headerItems.burgerMenu).should('be.visible');
    });
    it('CheckoutInfoPage: Then user should see the Cancel button', () => {
      cy.get(checkoutInfoPage.cancel).should('have.text', l10n.checkoutInfoPage.cancel).and('be.visible').and('be.enabled');
    });
    it('CheckoutInfoPage: Then user should see the Continue button', () => {
      cy.get(checkoutInfoPage.continue).should('have.value', l10n.checkoutInfoPage.continue).and('be.visible').and('be.enabled');
    });
    it('CheckoutInfoPage: Continue button is green-colored', () => {
      cy.get(checkoutInfoPage.continue).should('have.css', 'background-color', requirements.colors.green);
    });
    it('CheckoutInfoPage: Then LinkedIn icon with link should be displayed', () => {
      cy.get(footerItems.linkedin).should('have.attr', 'href', urls.externalPages.linkedin).and('be.visible');
    });
    it('CheckoutInfoPage: Then Twitter icon with link should be displayed', () => {
      cy.get(footerItems.twitter).should('have.attr', 'href', urls.externalPages.twitter).and('be.visible');
    });
    it('CheckoutInfoPage: Then Facebook icon with link should be displayed', () => {
      cy.get(footerItems.facebook).should('have.attr', 'href', urls.externalPages.facebook).and('be.visible');
    });
    it('CheckoutInfoPage: Then the Copyright notice should be displayed', () => {
      cy.get(footerItems.copyRight).should('have.text', l10n.footerItems.copyRight).and('be.visible');
    });
    it.skip('CheckoutInfoPage: Then Terms Of Service link should be displayed', () => {
      // TODO: fix the bug footerItems_TermsOfServiceLink: https://github.com/NatalliaSavitskaya/Cypress/issues/7#issue-3300213312
    });
    it.skip('CheckoutInfoPage: Then Privacy Policy link should be displayed', () => {
      // TODO: fix the bug footerItems_PrivacyPolicyLink: https://github.com/NatalliaSavitskaya/Cypress/issues/8#issue-3300216450
    });
  });

  context('CheckoutInfoPage: When user clicks Cancel button', () => {
    before(() => {
      cy.get(checkoutInfoPage.cancel).click();
    });
    it('CheckoutInfoPage: Then user should be redirected to the Cart page', () => {
      cy.url().should('eq', urls.pages.cart);
      cy.get(cartPage.title).should('have.text', l10n.cartPage.title);
    });
    after(() => {
      cy.get(cartPage.checkout).click();
    });
  });

  context('CheckoutInfoPage: When user leaves Firstname field empty and enters valid Lastname and Code and clicks Continue button', () => {
    // TODO: fix the bug checkoutInfoPage_invalidFieldFrame: https://github.com/NatalliaSavitskaya/Cypress/issues/12#issue-3300298712
    before(() => {
      cy.get(checkoutInfoPage.lastName).type(usersInfo.StandardUserInfo.lastname, { delay: 0 });
      cy.get(checkoutInfoPage.zip).type(usersInfo.StandardUserInfo.zipcode, { delay: 0 });
      cy.then(() => {
        cy.get(checkoutInfoPage.continue).click();
      });
    });
    it('CheckoutInfoPage: Then Firstname field should be underlined with a red line', () => {
      cy.get(checkoutInfoPage.firstName).should('have.css', 'border-bottom-color', requirements.colors.red);
    });
    it('CheckoutInfoPage: Then Lastname field should be underlined with a red line', () => {
      cy.get(checkoutInfoPage.lastName).should('have.css', 'border-bottom-color', requirements.colors.red);
    });
    it('CheckoutInfoPage: Then ZipCode field should be underlined with a red line', () => {
      cy.get(checkoutInfoPage.zip).should('have.css', 'border-bottom-color', requirements.colors.red);
    });
    it('CheckoutInfoPage: Then the error message should be displayed under the Login button', () => {
      cy.get(checkoutInfoPage.errorMessage).contains(l10n.checkoutInfoPage.errors.firstNameIsRequired);
    });
    it('CheckoutInfoPage: Then the cross icon should be displayed to the right of Firstname field', () => {
      cy.get(checkoutInfoPage.firstName).parent().find(checkoutInfoPage.errorIcon).should('be.visible');
    });
    it('CheckoutInfoPage: Then the cross icon should be displayed to the right of Lastname field', () => {
      cy.get(checkoutInfoPage.lastName).parent().find(checkoutInfoPage.errorIcon).should('be.visible');
    });
    it('CheckoutInfoPage: Then the cross icon should be displayed to the right of ZipCode field', () => {
      cy.get(checkoutInfoPage.zip).parent().find(checkoutInfoPage.errorIcon).should('be.visible');
    });
    it('CheckoutInfoPage: Then the cross icon should be displayed to the right of error message', () => {
      cy.get(checkoutInfoPage.errorClose).should('be.visible');
    });
    after(() => {
      cy.get(checkoutInfoPage.lastName).clear();
      cy.get(checkoutInfoPage.zip).clear();
    });
  });

  context('CheckoutInfoPage: When user leaves Lastname field empty and enters valid Firstname and Code and clicks Continue button', () => {
    // TODO: fix the bug checkoutInfoPage_invalidFieldFrame: https://github.com/NatalliaSavitskaya/Cypress/issues/12#issue-3300298712
    before(() => {
      cy.get(checkoutInfoPage.firstName).type(usersInfo.StandardUserInfo.firstname, { delay: 0 });
      cy.get(checkoutInfoPage.zip).type(usersInfo.StandardUserInfo.zipcode, { delay: 0 });
      cy.then(() => {
        cy.get(checkoutInfoPage.continue).click();
      });
    });
    it('CheckoutInfoPage: Then Firstname field should be underlined with a red line', () => {
      cy.get(checkoutInfoPage.firstName).should('have.css', 'border-bottom-color', requirements.colors.red);
    });
    it('CheckoutInfoPage: Then Lastname field should be underlined with a red line', () => {
      cy.get(checkoutInfoPage.lastName).should('have.css', 'border-bottom-color', requirements.colors.red);
    });
    it('CheckoutInfoPage: Then ZipCode field should be underlined with a red line', () => {
      cy.get(checkoutInfoPage.zip).should('have.css', 'border-bottom-color', requirements.colors.red);
    });
    it('CheckoutInfoPage: Then the error message should be displayed under the Login button', () => {
      cy.get(checkoutInfoPage.errorMessage).contains(l10n.checkoutInfoPage.errors.lastNameIsRequired);
    });
    it('CheckoutInfoPage: Then the cross icon should be displayed to the right of Firstname field', () => {
      cy.get(checkoutInfoPage.firstName).parent().find(checkoutInfoPage.errorIcon).should('be.visible');
    });
    it('CheckoutInfoPage: Then the cross icon should be displayed to the right of Lastname field', () => {
      cy.get(checkoutInfoPage.lastName).parent().find(checkoutInfoPage.errorIcon).should('be.visible');
    });
    it('CheckoutInfoPage: Then the cross icon should be displayed to the right of ZipCode field', () => {
      cy.get(checkoutInfoPage.zip).parent().find(checkoutInfoPage.errorIcon).should('be.visible');
    });
    it('CheckoutInfoPage: Then the cross icon should be displayed to the right of error message', () => {
      cy.get(checkoutInfoPage.errorClose).should('be.visible');
    });
    after(() => {
      cy.get(checkoutInfoPage.firstName).clear();
      cy.get(checkoutInfoPage.zip).clear();
    });
  });

  context('CheckoutInfoPage: When user leaves ZIPCode field empty and enters valid Firstname and Lastname and clicks Continue button', () => {
    // TODO: fix the bug checkoutInfoPage_invalidFieldFrame: https://github.com/NatalliaSavitskaya/Cypress/issues/12#issue-3300298712
    before(() => {
      cy.get(checkoutInfoPage.firstName).type(usersInfo.StandardUserInfo.firstname, { delay: 0 });
      cy.get(checkoutInfoPage.lastName).type(usersInfo.StandardUserInfo.lastname, { delay: 0 });
      cy.then(() => {
        cy.get(checkoutInfoPage.continue).click();
      });
    });
    it('CheckoutInfoPage: Then Firstname field should be underlined with a red line', () => {
      cy.get(checkoutInfoPage.firstName).should('have.css', 'border-bottom-color', requirements.colors.red);
    });
    it('CheckoutInfoPage: Then Lastname field should be underlined with a red line', () => {
      cy.get(checkoutInfoPage.lastName).should('have.css', 'border-bottom-color', requirements.colors.red);
    });
    it('CheckoutInfoPage: Then ZipCode field should be underlined with a red line', () => {
      cy.get(checkoutInfoPage.zip).should('have.css', 'border-bottom-color', requirements.colors.red);
    });
    it('CheckoutInfoPage: Then the error message should be displayed under the Login button', () => {
      cy.get(checkoutInfoPage.errorMessage).contains(l10n.checkoutInfoPage.errors.postalCodeIsRequired);
    });
    it('CheckoutInfoPage: Then the cross icon should be displayed to the right of Firstname field', () => {
      cy.get(checkoutInfoPage.firstName).parent().find(checkoutInfoPage.errorIcon).should('be.visible');
    });
    it('CheckoutInfoPage: Then the cross icon should be displayed to the right of Lastname field', () => {
      cy.get(checkoutInfoPage.lastName).parent().find(checkoutInfoPage.errorIcon).should('be.visible');
    });
    it('CheckoutInfoPage: Then the cross icon should be displayed to the right of ZipCode field', () => {
      cy.get(checkoutInfoPage.zip).parent().find(checkoutInfoPage.errorIcon).should('be.visible');
    });
    it('CheckoutInfoPage: Then the cross icon should be displayed to the right of error message', () => {
      cy.get(checkoutInfoPage.errorClose).should('be.visible');
    });
    after(() => {
      cy.get(checkoutInfoPage.firstName).clear();
      cy.get(checkoutInfoPage.lastName).clear();
    });
  });

  context('CheckoutInfoPage: When user fills First name, Last name, ZIP Code with valid data and clicks Continue button', () => {
    //TODO: fix the bug checkoutInfoPage_spacesValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/13#issue-3300312197
    before(() => {
      cy.checkoutUser(usersInfo.StandardUserInfo);
    });
    it('CheckoutInfoPage: Then user should be redirected to the Checkout Overview page', () => {
      cy.url().should('eq', urls.pages.checkoutOverview);
      cy.get(checkoutOverviewPage.title).should('have.text', l10n.checkoutOverviewPage.title);
    });
  });
});
