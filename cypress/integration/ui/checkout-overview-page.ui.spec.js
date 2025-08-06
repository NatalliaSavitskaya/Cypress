let randomIndex;
describe('CheckoutOverviewPage: Given there are no Products in Cart and Checkout Overview page is opened', { testIsolation: false }, () => {
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
    it('CheckoutOverviewPage: Then the Cart Product Counter does not contain any numbers', () => {
      cy.get(headerItems.cartProductsCounter).should('not.exist');
    });
    it('CheckoutOverviewPage: Then no items should be displayed', () => {
      cy.get(checkoutOverviewPage.items).should('not.exist');
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
    it('CheckoutOverviewPage: Then the Cart Product Counter contains number 1', () => {
      cy.get(headerItems.cartProductsCounter).should('be.visible').and('have.text', '1');
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
    it('CheckoutOverviewPage: Then user should see the Name of the Product', () => {
      cy.get(checkoutOverviewPage.item.title).should('have.text', products[randomIndex].title).and('be.visible');
    });
    it('CheckoutOverviewPage: Then user should see the Description of the Product', () => {
      cy.get(checkoutOverviewPage.item.description).should('have.text', products[randomIndex].description).and('be.visible');
    });
    it('CheckoutOverviewPage: Then user should see the Price of the Product', () => {
      cy.get(checkoutOverviewPage.item.price).should('have.text', products[randomIndex].price).and('be.visible');
    });
    it('CheckoutOverviewPage: Then user should see the Quantity value of the Product', () => {
      cy.get(checkoutOverviewPage.item.quantity).should('have.text', "1").and('be.visible');
    });
    it('CheckoutOverviewPage: Then user should see the Payment Information label', () => {
      cy.get(checkoutOverviewPage.paymentInfoLabel).should('have.text', l10n.checkoutOverviewPage.paymentInfoLabel).and('be.visible');
    });
    it('CheckoutOverviewPage: Then user should see the Payment method value', () => {
      cy.get(checkoutOverviewPage.paymentInfo).should('have.text', l10n.checkoutOverviewPage.paymentInfo).and('be.visible');
    });
    it('CheckoutOverviewPage: Then user should see the Shipping Information label', () => {
      cy.get(checkoutOverviewPage.paymentInfoLabel).should('have.text', l10n.checkoutOverviewPage.paymentInfoLabel).and('be.visible');
    });
    it('CheckoutOverviewPage: Then user should see the Shipping method value', () => {
      cy.get(checkoutOverviewPage.shippingInfo).should('have.text', l10n.checkoutOverviewPage.shippingInfo).and('be.visible');
    });
    it('CheckoutOverviewPage: Then user should see the Price Total label', () => {
      cy.get(checkoutOverviewPage.itemsTotalLabel).should('have.text', l10n.checkoutOverviewPage.itemsTotalLabel).and('be.visible');
    });
    it('CheckoutOverviewPage: Then user should see the Item Total label and value', () => {
      cy.get(checkoutOverviewPage.itemsTotal).should('have.text',
        (l10n.checkoutOverviewPage.itemTotal+parseFloat(products[randomIndex].price.replace('$', '')))).and('be.visible');
    });
    it('CheckoutOverviewPage: Then user should see the Tax label and value', () => {
      cy.get(checkoutOverviewPage.tax).should('have.text', (l10n.checkoutOverviewPage.tax +
        (parseFloat(products[randomIndex].price.replace('$', ''))*0.08).toFixed(2))).and('be.visible');
    });
    it('CheckoutOverviewPage: Then user should see the Total label and value', () => {
      cy.get(checkoutOverviewPage.priceTotal).should('have.text', (l10n.checkoutOverviewPage.total +
        (parseFloat(products[randomIndex].price.replace('$', ''))*1.08).toFixed(2))).and('be.visible');
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

  context('CheckoutOverviewPage: When user clicks Cancel button', () => {
    before(() => {
      cy.then(() => {
        cy.get(checkoutOverviewPage.cancel).click();
      });
    });
    it('CheckoutOverviewPage: Then user should be redirected to the Inventory page', () => {
      cy.url().should('eq', urls.pages.inventory);
      cy.get(inventoryPage.title).should('have.text', l10n.inventoryPage.title);
    });
    after(() => {
      cy.then(() => {
        cy.get(headerItems.cartIcon).click();
      });
      cy.then(() => {
        cy.get(cartPage.checkout).click();
      });
      cy.checkoutUser(usersInfo.StandardUserInfo);
    });
  });

  context('CheckoutOverviewPage: When user clicks on the Product item on the CheckoutOverview page', () => {
    before(() => {
      cy.then(() => {
        cy.get(checkoutOverviewPage.item.title).click();
      });
    });
    it('CheckoutOverviewPage: Then the user is redirected to the Product item page', () => {
      cy.url().should('eq', urls.pages.inventoryItem + products[randomIndex].id);
      cy.get(inventoryPage.inventoryItem.title).should('have.text', products[randomIndex].title);
    });
    after(() => {
      cy.then(() => {
        cy.get(headerItems.cartIcon).click();
      });
      cy.then(() => {
        cy.get(cartPage.checkout).click();
      });
      cy.checkoutUser(usersInfo.StandardUserInfo);
    });
  });

  context('CheckoutOverviewPage: When user clicks Finish button', () => {
    before(() => {
      cy.then(() => {
        cy.get(checkoutOverviewPage.finish).click();
      });
    });
    it('CheckoutOverviewPage: Then user should be redirected to the Checkout Complete Page page', () => {
      cy.url().should('eq', urls.pages.checkoutComplete);
      cy.get(checkoutCompletePage.title).should('have.text', l10n.checkoutCompletePage.title);
    });
    after(() => {
      cy.then(() => {
        cy.get(headerItems.cartIcon).click();
      });
    });
  });
});

