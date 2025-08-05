describe('CheckoutOverviewPage: Given there is 1 random Product in Cart and Checkout Overview page is opened', { testIsolation: false }, () => {
  let randomIndex;
  before(() => {
    cy.visit('/');
    cy.then(() => {
      cy.loginUser(users.StandardUser);
    });
    cy.then(() => {
      cy.resetAppState();
    });
    cy.get(inventoryPage.inventoryItems).then(($items) => {
      randomIndex = Math.floor(Math.random() * $items.length);
      cy.wrap($items).eq(randomIndex).find(inventoryPage.inventoryItem.addButton).click();
    });
    cy.then(() => {
      cy.get(headerItems.cartIcon).click();
    });
    cy.then(() => {
      cy.get(cartPage.checkout).click();
    });
    cy.checkoutUser(usersInfo.StandardUserInfo);
  });

  context('CheckoutOverviewPage: When user explore the CheckoutOverviewPage page', () => {
    it('CheckoutOverviewPage: Then user should see the URL of CheckoutOverviewPage page', () => {
      cy.url().should('eq', urls.pages.checkoutOverview);
    });
    it('CheckoutOverviewPage: Then user should see the title of CheckoutOverviewPage page', () => {
      cy.get(checkoutOverviewPage.title).should('have.text', l10n.checkoutOverviewPage.title).and('be.visible');
    });
    it('CheckoutOverviewPage: Then user should see the Cart icon', () => {
      cy.get(headerItems.cartIcon).should('be.visible');
    });
    it('CheckoutOverviewPage: Then user should see Burger menu', () => {
      cy.get(headerItems.burgerMenu).should('be.visible');
    });
    it('CheckoutOverviewPage: Then user should see the QTY label', () => {
      cy.get(checkoutOverviewPage.quantityLabel).should('have.text', l10n.checkoutOverviewPage.quantity).and('be.visible');
    });
    it('CheckoutOverviewPage: Then user should see the Description label', () => {
      cy.get(checkoutOverviewPage.descriptionLabel).should('have.text', l10n.checkoutOverviewPage.description).and('be.visible');
    });
    it('CheckoutOverviewPage: Then user should see the Cancel button', () => {
      cy.get(checkoutOverviewPage.cancel).should('have.text', l10n.checkoutOverviewPage.cancel).and('be.visible').and('be.enabled');
    });
    it('CheckoutOverviewPage: Then user should see the Finish button', () => {
      cy.get(checkoutOverviewPage.finish).should('have.text', l10n.checkoutOverviewPage.finish).and('be.visible').and('be.enabled');
    });
    it('CheckoutOverviewPage: Finish button is green-colored', () => {
      cy.get(checkoutOverviewPage.finish).should('have.css', 'background-color', 'rgb(61, 220, 145)');
    });
    it('CheckoutOverviewPage: Then LinkedIn icon with link should be displayed', () => {
      cy.get(footerItems.linkedin).should('have.attr', 'href', urls.externalPages.linkedin).and('be.visible');
    });
    it('CheckoutOverviewPage: Then Twitter icon with link should be displayed', () => {
      cy.get(footerItems.twitter).should('have.attr', 'href', urls.externalPages.twitter).and('be.visible');
    });
    it('CheckoutOverviewPage: Then Facebook icon with link should be displayed', () => {
      cy.get(footerItems.facebook).should('have.attr', 'href', urls.externalPages.facebook).and('be.visible');
    });
    it('CheckoutOverviewPage: Then the Copyright notice should be displayed', () => {
      cy.get(footerItems.copyRight).should('have.text', l10n.footerItems.copyRight).and('be.visible');
    });
  });
});

/*
describe('CheckoutOverviewPage: Given there is no Product in Cart and Checkout Overview page is opened', { testIsolation: false }, () => {
  let randomIndex;
  before(() => {
    cy.visit('/');
    cy.then(() => {
      cy.loginUser(users.StandardUser);
    });
    cy.then(() => {
      cy.resetAppState();
    });
    cy.then(() => {
      cy.get(headerItems.cartIcon).click();
    });
    cy.then(() => {
      cy.get(cartPage.checkout).click();
    });
    cy.checkoutUser(usersInfo.StandardUserInfo);
  });

  context('CartPage: When there is at least 1 Product in Cart and user clicks on the Product item on the CheckoutInfo page', () => {
    it('CartPage: Then the user is redirected to the Product item page', () => {
      cy.url().should('eq', urls.pages.inventoryItem + products[randomIndex].id);
      cy.get(inventoryPage.inventoryItem.title).should('have.text', products[randomIndex].title);
    });
    after(() => {
      cy.then(() => {
        cy.get(headerItems.cartIcon).click();
      });
    });
  });

  context('CartPage: When there is at least 1 Product in Cart and user clicks on Remove item button on the CheckoutInfo page', () => {
    it('CartPage: Then the item is removed from CheckoutInfo page', () => {
      cy.url().should('eq', urls.pages.inventoryItem + products[randomIndex].id);
      cy.get(inventoryPage.inventoryItem.title).should('have.text', products[randomIndex].title);
    });
    after(() => {
      cy.then(() => {
        cy.get(headerItems.cartIcon).click();
      });
    });
  });
});

 */
