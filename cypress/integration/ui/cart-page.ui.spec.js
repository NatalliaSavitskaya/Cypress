describe('CartPage: Given Cart page opened', { testIsolation: false }, () => {
  before(() => {
    cy.visit('/');
    cy.then(() => {
      cy.loginUser(users.StandardUser);
    });
    cy.then(() => {
      cy.resetAppState();
      // TODO: fix the bug inventoryPage_resetDoesNotClearRemoveButton: https://github.com/NatalliaSavitskaya/Cypress/issues/6#issue-3300190487
    });
    cy.then(() => {
      cy.get(headerItems.cartIcon).click();
    });
  });

  let randomIndex;

  context('CartPage: When no products are added to Cart and user explore the Cart page', () => {
    it('CartPage: Then user should see the URL of Cart page', () => {
      cy.url().should('eq', urls.pages.cart);
    });
    it('CartPage: Then user should see the title of Cart page', () => {
      cy.get(cartPage.title).should('have.text', l10n.cartPage.title).and('be.visible');
    });
    it('CartPage: Then user should see the Cart icon', () => {
      cy.get(headerItems.cartIcon).should('be.visible');
    });
    it('CartPage: Then the Cart Product Counter does not contain any numbers', () => {
      cy.get(headerItems.cartProductsCounter).should('not.exist');
    });
    it('CartPage: Then user should see Burger menu', () => {
      cy.get(headerItems.burgerMenu).should('be.visible');
    });
    it('CartPage: Then user should see the QTY label', () => {
      cy.get(cartPage.quantityLabel).should('have.text', l10n.cartPage.quantity).and('be.visible');
    });
    it('CartPage: Then user should see the Description label', () => {
      cy.get(cartPage.descriptionLabel).should('have.text', l10n.cartPage.description).and('be.visible');
    });
    it('CartPage: Then no items should be displayed', () => {
      cy.get(cartPage.items).should('not.exist');
    });
    it('CartPage: Then user should see the Continue Shopping button', () => {
      cy.get(cartPage.continueShopping).should('have.text', l10n.cartPage.continueShopping).and('be.visible').and('be.enabled');
    });
    it.skip('CartPage: Then user shouldn`t see the Checkout button', () => {
      // TODO: fix the bug cartPage_CheckoutIsEnabledWhenEmptyCart: https://github.com/NatalliaSavitskaya/Cypress/issues/11#issue-3300273293
    });
    it('CartPage: Then LinkedIn icon with link should be displayed', () => {
      cy.get(footerItems.linkedin).should('have.attr', 'href', urls.externalPages.linkedin).and('be.visible');
    });
    it('CartPage: Then Twitter icon with link should be displayed', () => {
      cy.get(footerItems.twitter).should('have.attr', 'href', urls.externalPages.twitter).and('be.visible');
    });
    it('CartPage: Then Facebook icon with link should be displayed', () => {
      cy.get(footerItems.facebook).should('have.attr', 'href', urls.externalPages.facebook).and('be.visible');
    });
    it('CartPage: Then the Copyright notice should be displayed', () => {
      cy.get(footerItems.copyRight).should('have.text', l10n.footerItems.copyRight).and('be.visible');
    });
    it.skip(`CartPage: Then Terms Of Service link should be displayed`, () => {
      // TODO: fix the bug footerItems_TermsOfServiceLink: https://github.com/NatalliaSavitskaya/Cypress/issues/7#issue-3300213312
    });
    it.skip(`CartPage: Then Privacy Policy link should be displayed`, () => {
      // TODO: fix the bug footerItems_PrivacyPolicyLink: https://github.com/NatalliaSavitskaya/Cypress/issues/8#issue-3300216450
    });
  });

  context('CartPage: When user clicks Continue Shopping button', () => {
    before(() => {
      cy.get(cartPage.continueShopping).click();
    });
    it('CartPage: Then user should be redirected to the Inventory page', () => {
      cy.url().should('eq', urls.pages.inventory);
      cy.get(inventoryPage.title).should('have.text', l10n.inventoryPage.title);
    });
  });

  context('CartPage: When one  random product is added to Cart and user explore the Cart page', () => {
    before(() => {
      cy.getRandomProductIndex().then((index) => {
        randomIndex = index;
        cy.get(inventoryPage.inventoryItems)
          .eq(randomIndex)
          .within(() => {
            cy.get(inventoryPage.inventoryItem.addButton).click();
          });
        cy.then(() => {
          cy.get(headerItems.cartIcon).click();
        });
      });
    });
    it('CartPage: Then the Cart Product Counter is increased by 1', () => {
      cy.get(headerItems.cartProductsCounter).should('be.visible').and('have.text', '1');
    });
    it('CartPage: Then user should see Product Title, Description, QTY, Price and Remove button for the selected Product', () => {
      // TODO: fix the bug cartPage_fixedProductQuantity: https://github.com/NatalliaSavitskaya/Cypress/issues/14#issue-3300338819
      cy.get(cartPage.item.quantity).should('have.text', '1').and('be.visible');
      // TODO: fix the bug inventoryPage_cardTitleNotValidated: https://github.com/NatalliaSavitskaya/Cypress/issues/9#issue-3300246812
      cy.get(cartPage.item.title).should('have.text', products[randomIndex].title).and('be.visible');
      // TODO: fix the bug inventoryPage_cardDescriptionNotValidated: https://github.com/NatalliaSavitskaya/Cypress/issues/10#issue-3300259694
      cy.get(cartPage.item.description).should('have.text', products[randomIndex].description).and('be.visible');
      cy.get(cartPage.item.price).should('have.text', products[randomIndex].price).and('be.visible');
      cy.get(cartPage.item.remove).should('have.text', l10n.cartPage.remove).and('be.visible').and('be.enabled');
      cy.get(cartPage.item.remove).should('have.css', 'border', '0.8px solid rgb(226, 35, 26)');
      cy.get(cartPage.item.remove).should('have.css', 'color', 'rgb(226, 35, 26)');
    });
  });

  context('CartPage: When user clicks on the Product item in the Cart', () => {
    before(() => {
      cy.get(cartPage.item.title).click();
    });
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

  context('CartPage: When user clicks Remove button', () => {
    before(() => {
      cy.get(cartPage.item.remove).click();
    });
    it('CartPage: Then the Cart Product Counter is not displayed', () => {
      cy.get(headerItems.cartProductsCounter).should('not.exist');
    });
    it('CartPage: Then no items should be displayed', () => {
      cy.get(cartPage.items).should('not.exist');
    });
  });

  context('CartPage: When user clicks Checkout button', () => {
    before(() => {
      cy.get(cartPage.checkout).click();
      // TODO: fix the bug cartPage_CheckoutIsEnabledWhenEmptyCart: https://github.com/NatalliaSavitskaya/Cypress/issues/11#issue-3300273293
    });
    it('CartPage: Then user should be redirected to the Checkout page', () => {
      cy.url().should('eq', urls.pages.checkoutInfo);
      cy.get(checkoutInfoPage.title).should('have.text', l10n.checkoutInfoPage.title);
    });
  });
});
