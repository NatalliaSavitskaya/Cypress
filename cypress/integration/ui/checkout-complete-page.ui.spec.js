describe('CheckoutCompletePage: Given Checkout Complete page opened', { testIsolation: false }, () => {
  let randomIndex;
  before(() => {
    cy.visit('/');
    cy.then(() => {
      cy.loginUser(users.StandardUser);
    });
    cy.getRandomProductIndex().then((index) => {
      randomIndex = index;
      cy.get(inventoryPage.inventoryItems)
        .eq(randomIndex)
        .within(() => {
          cy.get(inventoryPage.inventoryItem.addButton).click();
        });
    });
    cy.then(() => {
      cy.get(headerItems.cartIcon).click();
    });
    cy.then(() => {
      cy.get(cartPage.checkout).click();
    });
    cy.checkoutUser(usersInfo.StandardUserInfo);
    cy.then(() => {
      cy.get(checkoutOverviewPage.finish).click();
    });
  });

  context('CheckoutCompletePage: When user explore the Checkout Complete page', () => {
    it('CheckoutCompletePage: Then user should see the URL of Checkout Info page', () => {
      cy.url().should('eq', urls.pages.checkoutComplete);
    });
    it('CheckoutCompletePage: Then user should see the title of Checkout Complete page', () => {
      cy.get(checkoutCompletePage.title).should('have.text', l10n.checkoutCompletePage.title).and('be.visible');
    });
    it('CheckoutCompletePage: Then user should see the Cart icon', () => {
      cy.get(headerItems.cartIcon).should('be.visible');
    });
    it('CheckoutCompletePage: Then user should see Burger menu', () => {
      cy.get(headerItems.burgerMenu).should('be.visible');
    });
    it('CheckoutCompletePage: Then user should see the Green Tick icon', () => {
      cy.get(checkoutCompletePage.successIcon)
        .should('be.visible')
        .and(($img) => {
          expect($img).to.have.attr('src');
          expect($img.attr('src')).to.match(/^data:image\/png;base64,/);
        });
    });
    it('CheckoutCompletePage: Then user should see the Thank you message', () => {
      cy.get(checkoutCompletePage.confirmation.title).should('have.text', l10n.checkoutCompletePage.messageTitle).and('be.visible');
    });
    it('CheckoutCompletePage: Then user should see the Confirmation text message', () => {
      cy.get(checkoutCompletePage.confirmation.message).should('have.text', l10n.checkoutCompletePage.message).and('be.visible');
    });
    it('CheckoutCompletePage: Then user should see the Back home button', () => {
      cy.get(checkoutCompletePage.backHome).should('have.text', l10n.checkoutCompletePage.backHome).and('be.visible').and('be.enabled');
    });
    it('CheckoutCompletePage: Then LinkedIn icon with link should be displayed', () => {
      cy.get(footerItems.linkedin).should('have.attr', 'href', urls.externalPages.linkedin).and('be.visible');
    });
    it('CheckoutCompletePage: Then Twitter icon with link should be displayed', () => {
      cy.get(footerItems.twitter).should('have.attr', 'href', urls.externalPages.twitter).and('be.visible');
    });
    it('CheckoutCompletePage: Then Facebook icon with link should be displayed', () => {
      cy.get(footerItems.facebook).should('have.attr', 'href', urls.externalPages.facebook).and('be.visible');
    });
    it('CheckoutCompletePage: Then the Copyright notice should be displayed', () => {
      cy.get(footerItems.copyRight).should('have.text', l10n.footerItems.copyRight).and('be.visible');
    });
    it.skip('CheckoutCompletePage: Then Terms Of Service link should be displayed', () => {
      // TODO: fix the bug footerItems_TermsOfServiceLink: https://github.com/NatalliaSavitskaya/Cypress/issues/7#issue-3300213312
    });
    it.skip('CheckoutCompletePage: Then Privacy Policy link should be displayed', () => {
      // TODO: fix the bug footerItems_PrivacyPolicyLink: https://github.com/NatalliaSavitskaya/Cypress/issues/8#issue-3300216450
    });
  });

  context('CheckoutCompletePage: When user clicks Back home button', () => {
    before(() => {
      cy.get(checkoutCompletePage.backHome).click();
    });
    it('CheckoutCompletePage: Then user should be redirected to the Inventory page', () => {
      cy.url().should('eq', urls.pages.inventory);
      cy.get(inventoryPage.title).should('have.text', l10n.inventoryPage.title);
    });
  });
});
