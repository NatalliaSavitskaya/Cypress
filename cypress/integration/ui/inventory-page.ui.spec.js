describe('LoginPage: Given Inventory page opened', { testIsolation: false }, () => {
  before(() => {
    cy.visit('/');
    cy.then(() => {
      cy.loginUser(users.StandardUser);
    });
    cy.then(() => {
      cy.resetAppState();
    });
  });

  context('InventoryPage: When user explore the Inventory page', () => {
    it('InventoryPage: Then page URL should be displayed', () => {
      cy.url().should('eq', urls.pages.inventory);
    });
    it('InventoryPage: Then user should see the title of Inventory page', () => {
      cy.get(inventoryPage.title).should('have.text', l10n.inventoryPage.title).and('be.visible');
    });
    it('InventoryPage: Then user should see sorting control with default value', () => {
      cy.get(inventoryPage.sorting.dropdown)
        .should('have.value', inventoryPage.sorting.options.nameAscending);
    });
    it('InventoryPage: Then user should see the Cart icon', () => {
      cy.get(headerItems.cartIcon).should('be.visible');
    });
    it('InventoryPage: Then the Cart Product Counter does not contain any numbers', () => {
      cy.get(headerItems.cartProductsCounter).should('not.exist');
    });
    it('InventoryPage: Then default number of product cards should be displayed', () => {
      cy.get(inventoryPage.inventoryItems).should('have.length', requirements.inventoryPage.numberOfProductsOnThePage);
    });
  });

  context('InventoryPage: When user explore the footers on the Inventory page', () => {
    it('InventoryPage: Then LinkedIn icon with link should be displayed', () => {
      cy.get(footerItems.linkedin).should('have.attr', 'href', urls.externalPages.linkedin).and('be.visible');
    });
    it('InventoryPage: Then Twitter icon with link should be displayed', () => {
      cy.get(footerItems.twitter).should('have.attr', 'href', urls.externalPages.twitter).and('be.visible');
    });
    it('InventoryPage: Then Facebook icon with link should be displayed', () => {
      cy.get(footerItems.facebook).should('have.attr', 'href', urls.externalPages.facebook).and('be.visible');
    });
    it('InventoryPage: Then the Copyright notice should be displayed', () => {
      cy.get(footerItems.copyRight).should('have.text', l10n.footerItems.copyRight).and('be.visible');
    });
  });

  context('InventoryPage: When user explore the product items on the Inventory page', () => {
    it('InventoryPage: Then user should see the title for each product', () => {
      cy.get(inventoryPage.inventoryItems).each(($el, index) => {
        const item = products[index];
        cy.wrap($el)
          .find(inventoryPage.inventoryItem.title)
          .invoke('text')
          .then((actualName) => {
            expect(actualName.trim()).to.eq(item.title);
          });
      });
    });
    it('InventoryPage: Then user should see the description for each product', () => {
      cy.get(inventoryPage.inventoryItems).each(($el, index) => {
        const item = products[index];
        cy.wrap($el)
          .find(inventoryPage.inventoryItem.description)
          .invoke('text')
          .then((actualDescription) => {
            cy.log(`Expected: ${item.description}`);
            cy.log(`Actual: ${actualDescription.trim()}`);
            expect(actualDescription.trim()).to.eq(item.description);
          });
      });
    });
    it('InventoryPage: Then user should see the price for each product', () => {
      cy.get(inventoryPage.inventoryItems).each(($el, index) => {
        const item = products[index];
        cy.wrap($el)
          .find(inventoryPage.inventoryItem.price)
          .invoke('text')
          .then((actualPrice) => {
            expect(actualPrice.trim()).to.eq(item.price);
          });
      });
    });
    it('InventoryPage: Then user should see the image for each product', () => {
      cy.get(inventoryPage.inventoryItems).each(($el, index) => {
        const item = products[index];
        cy.wrap($el).find(inventoryPage.inventoryItem.image).should('have.attr', 'src').and('not.be.empty');
      });
    });
    it('InventoryPage: Then user should see Add to cart button for each product', () => {
      cy.get(inventoryPage.inventoryItems).each(($el, index) => {
        const item = products[index];
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
      cy.get(inventoryPage.sorting.dropdown).select(inventoryPage.sorting.options.priceAscending);
      cy.get(inventoryPage.inventoryItems)
        .find(inventoryPage.inventoryItem.price)
        .then(($prices) => {
          const prices = [...$prices].map((priceEl) => parseFloat(priceEl.innerText.replace('$', '').trim()));
          const sortedPrices = [...prices].sort((a, b) => a - b);
          expect(prices).to.deep.equal(sortedPrices);
        });
    });
  });

  context('InventoryPage: When user sort the product items by Price in the descending order', () => {
    it('InventoryPage: Product items are sorted by Price in the ascending order', () => {
      cy.get(inventoryPage.sorting.dropdown).select(inventoryPage.sorting.options.priceDescending);
      cy.get(inventoryPage.inventoryItems)
        .find(inventoryPage.inventoryItem.price)
        .then(($prices) => {
          const prices = [...$prices].map((priceEl) => parseFloat(priceEl.innerText.replace('$', '').trim()));
          const sortedPrices = [...prices].sort((a, b) => b - a);
          expect(prices).to.deep.equal(sortedPrices);
        });
    });
  });

  context('InventoryPage: When user sort the product items by Name in the ascending order', () => {
    it('InventoryPage: Product items are sorted by Name in the ascending order', () => {
      cy.get(inventoryPage.sorting.dropdown).select(inventoryPage.sorting.options.nameAscending);
      cy.get(inventoryPage.inventoryItems)
        .find(inventoryPage.inventoryItem.title)
        .then(($titles) => {
          const titles = [...$titles].map((titleEl) => titleEl.innerText.trim().toLowerCase());
          const sortedTitles = [...titles].sort((a, b) => a.localeCompare(b));
          expect(titles).to.deep.equal(sortedTitles);
        });
    });
  });

  context('InventoryPage: When user sort the product items by Name in the descending order', () => {
    it('InventoryPage: Product items are sorted by Name in the ascending order', () => {
      cy.get(inventoryPage.sorting.dropdown).select(inventoryPage.sorting.options.nameDescending);
      cy.get(inventoryPage.inventoryItems)
        .find(inventoryPage.inventoryItem.title)
        .then(($titles) => {
          const titles = [...$titles].map((titleEl) => titleEl.innerText.trim().toLowerCase());
          const sortedTitles = [...titles].sort((a, b) => b.localeCompare(a));
          expect(titles).to.deep.equal(sortedTitles);
        });
    });
  });

  context('InventoryPage: When user adds first product to the cart', () => {
    before(() => {
      cy.get(inventoryPage.inventoryItems).first().find(inventoryPage.inventoryItem.addButton).click();
    });
    it('InventoryPage: Then the Cart Product Counter is increased by 1', () => {
      cy.get(headerItems.cartProductsCounter).should('be.visible').and('have.text', '1');
    });
    it('InventoryPage: Then Add to cart button is not shown for the added item', () => {
      cy.get(inventoryPage.inventoryItems).first().find(inventoryPage.inventoryItem.addButton).should('not.exist');
    });
    it('InventoryPage: Then Remove button is shown for the added item', () => {
      cy.get(inventoryPage.inventoryItems).first().find(inventoryPage.inventoryItem.removeButton).should('be.visible');
    });
  });

  context('InventoryPage: When user removes first added to the Card item from it', () => {
    it('InventoryPage: Then the Cart Product Counter is not displayed', () => {
      cy.get(inventoryPage.inventoryItems).first().find(inventoryPage.inventoryItem.removeButton).click();
      cy.get(headerItems.cartProductsCounter).should('not.exist');
    });
    it('InventoryPage: Then Add to card button is shown for the removed item', () => {
      cy.get(inventoryPage.inventoryItems).first().find(inventoryPage.inventoryItem.addButton).should('be.visible');
    });
    it('InventoryPage: Then Remove button is not shown on removed item', () => {
      cy.get(inventoryPage.inventoryItems).first().find(inventoryPage.inventoryItem.removeButton).should('not.exist');
    });
  });

  context('InventoryPage: When user clicks on Cart icon', () => {
    it('InventoryPage: Then user should be redirected to the Cart page', () => {
      cy.get(headerItems.cartIcon).click();
      cy.url().should('eq', urls.pages.cart);
    });
  });

  after(() => {
    cy.resetAppState();
  });
});
