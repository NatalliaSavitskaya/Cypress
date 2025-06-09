describe('LoginPage: Given Inventory page opened', { testIsolation: false }, () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get(loginPage.username).type(users.StandardUser.username);
    cy.get(loginPage.password).type(users.StandardUser.password);
    cy.get(loginPage.login).click();
  });

  context('InventoryPage: When user explore the Inventory page', () => {
    it('InventoryPage: Then page URL should be displayed', () => {
      cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');
    });
    it('InventoryPage: Then user should see the title of Inventory page', () => {
      cy.get(inventoryPage.title).should('have.text', l10n.inventoryPage.title).and('be.visible');
    });
    it('InventoryPage: Then user should see sorting control with default value', () => {
      cy.get(generalItems.sortingControl).contains(l10n.generalItems.sortingOptions.nameAsc).and('be.visible');
    });
    it('InventoryPage: Then user should see the Cart icon', () => {
      cy.get(generalItems.cartIcon).should('be.visible');
    });
    it('InventoryPage: Then the Cart Product Counter does not contain any numbers', () => {
      cy.get(generalItems.burgerMenu).click();
      cy.get(generalItems.resetAppState).click();
      cy.get(generalItems.closeMenu).click();
      cy.get(generalItems.cartProductsCounter).should('not.exist');
    });
    it('InventoryPage: Then default number of product cards should be displayed', () => {
      cy.get(inventoryPage.inventoryItems).should('have.length', requirements.inventoryPage.numberOfProductsOnThePage);
    });
  });

  context('InventoryPage: When user explore the footers on the Inventory page', () => {
    it('InventoryPage: Then LinkedIn icon with link should be displayed', () => {
      cy.get(footerComp.linkedin).should('have.attr', 'href', 'https://www.linkedin.com/company/sauce-labs/').and('be.visible');
    });
    it(`InventoryPage: Then Twitter icon with link should be displayed`, () => {
      cy.get(footerComp.twitter).should('have.attr', 'href', 'https://twitter.com/saucelabs').and('be.visible');
    });
    it('InventoryPage: Then Facebook icon with link should be displayed', () => {
      cy.get(footerComp.facebook).should('have.attr', 'href', 'https://www.facebook.com/saucelabs').and('be.visible');
    });
    it('InventoryPage: Then the Copyright notice should be displayed', () => {
      cy.get(footerComp.copyRight).should('have.text', l10n.footerComp.copyRight).and('be.visible');
    });
  });

  context('InventoryPage: When user explore the product items on the Inventory page', () => {
    beforeEach(() => {
      cy.get(generalItems.burgerMenu).click();
      cy.get(generalItems.resetAppState).click();
      cy.get(generalItems.closeMenu).click();
    });
    it('InventoryPage: Then user should see the title for each product', () => {
      cy.get(inventoryPage.inventoryItems).each(($el, index) => {
        const item = l10n.inventoryPage.allProducts[index];
        cy.wrap($el)
          .find(inventoryPage.inventoryItem.title)
          .invoke('text')
          .then((actualName) => {
            try {
              expect(actualName.trim()).to.eq(item.name);
            } catch (err) {
              Cypress.log({
                message: ` wrong name ${index + 1}: expected "${item.name}", recieved "${actualName.trim()}"`,
              });
            }
          });
      });
    });
    it('InventoryPage: Then user should see the description for each product', () => {
      cy.get(inventoryPage.inventoryItems).each(($el, index) => {
        const item = l10n.inventoryPage.allProducts[index];
        cy.wrap($el)
          .find(inventoryPage.inventoryItem.description)
          .invoke('text')
          .then((actualDescription) => {
            try {
              expect(actualDescription.trim()).to.eq(item.description);
            } catch (err) {
              Cypress.log({
                message: ` wrong description ${index + 1}: expected "${item.description}", recieved "${actualDescription.trim()}"`,
              });
            }
          });
      });
    });
    it('InventoryPage: Then user should see the price for each product', () => {
      cy.get(inventoryPage.inventoryItems).each(($el, index) => {
        const item = l10n.inventoryPage.allProducts[index];
        cy.wrap($el)
          .find(inventoryPage.inventoryItem.price)
          .invoke('text')
          .then((actualPrice) => {
            try {
              expect(actualPrice.trim()).to.eq(item.price);
            } catch (err) {
              Cypress.log({
                message: ` wrong price ${index + 1}: expected "${item.price}", recieved "${actualPrice.trim()}"`,
              });
            }
          });
      });
    });
    it('InventoryPage: Then user should see the image for each product', () => {
      cy.get(inventoryPage.inventoryItems).each(($el, index) => {
        const item = l10n.inventoryPage.allProducts[index];
        cy.wrap($el).find(inventoryPage.inventoryItem.image).should('have.attr', 'src').and('not.be.empty');
      });
    });
    it('InventoryPage: Then user should see Add to cart button for each product', () => {
      cy.get(inventoryPage.inventoryItems).each(($el, index) => {
        const item = l10n.inventoryPage.allProducts[index];
        cy.wrap($el).find(inventoryPage.inventoryItem.addButton).should('exist').and('have.text', l10n.inventoryPage.addToCartButton);
      });
    });
    it('InventoryPage: Then all products are sorted by default parameter', () => {
      cy.get(inventoryPage.inventoryItem.title).then(($titles) => {
        const titles = $titles.map((index, el) => el.innerText).get();
        const sortedTitles = [...titles].sort();
        expect(titles).to.deep.equal(sortedTitles);
      });
    });
  });

  context('InventoryPage: When user sort the product items by Price in the ascending order', () => {
    it('InventoryPage: Product items are sorted by Price in the ascending order', () => {

    });
  });

  context('InventoryPage: When user sort the product items by Price in the descending order', () => {
    it('InventoryPage: Product items are sorted by Price in the ascending order', () => {

    });
  });

  context('InventoryPage: When user sort the product items by Name in the ascending order', () => {
    it('InventoryPage: Product items are sorted by Name in the ascending order', () => {

    });
  });

  context('InventoryPage: When user sort the product items by Name in the descending order', () => {
    it('InventoryPage: Product items are sorted by Name in the ascending order', () => {

    });
  });

  context('InventoryPage: When user adds first product to the cart', () => {
    it('Then the Cart Product Counter is increased by 1', () => {});
    it('Then Add to cart button is not shown for the added item', () => {});
    it('Then Remove button is shown for the added item', () => {});
  });

  context('When user removes first added to the Card item from it', () => {
    it('Then the Cart Product Counter is decreased by 1', () => {});
    it('Then Add to card button is shown for the removed item', () => {});
    it('Then Remove button is not shown on removed item', () => {});
  });

  context('InventoryPage: When user clicks on Cart icon', () => {
    it('InventoryPage: Then user should be redirected to the Cart page',() => {

    });
  });

});
