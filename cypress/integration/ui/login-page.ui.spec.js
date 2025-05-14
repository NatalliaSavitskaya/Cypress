describe('LoginPage: Given Login page opened', { testIsolation: false }, () => {
  before(() => {
    cy.visit('/');
  });

  context('LoginPage: When user explore the Login page', () => {
    it('LoginPage: Then user should see the title', () => {
      cy.get(selectors.loginPage.title).should('have.text', l10n.loginPage.title).and('be.visible');
    });
    it('LoginPage: Then user should see the Username field with placeholder', () => {
      cy.get(selectors.loginPage.username).should('have.attr', 'placeholder', l10n.loginPage.form.username).and('have.value', '').and('be.visible');
    });
    it('LoginPage: Then user should see the Password field with placeholder', () => {
      cy.get(selectors.loginPage.password).should('have.attr', 'placeholder', l10n.loginPage.form.password).and('have.value', '').and('be.visible');
    });
    it('LoginPage: Then user should see the Login button', () => {
      cy.get(selectors.loginPage.login).should('have.value', l10n.loginPage.form.login).and('be.visible').and('be.enabled');
    });
    it('LoginPage: Then user should see the URL of Login page', () => {
      // not implemented yet
    });
    it('LoginPage: Then user should see the logo', () => {
      // not implemented yet
    });

    // TODO: fix the bug bugLog.loginPage_noLogoIsVisible - here the link to the issue in GitHub will be provided in case of bug found

    it('LoginPage: Then user should see the list of Accepted usernames', () => {
      // not implemented yet
    });
    it('LoginPage: Then user should see the Password for all users', () => {
      // not implemented yet
    });
  });

  context('LoginPage: When user enters valid credentials and clicks Login button', () => {
    it('LoginPage: Then user should be navigated to the Inventory page', () => {
      // not implemented yet
    });
  });

  context('LoginPage: When user enters invalid credentials and clicks Login button', () => {
    it('LoginPage: Then Username and Password fields should be underlined with a red line', () => {
      // not implemented yet
    });
    it('LoginPage: Then the error message should be displayed under the Login button', () => {
      // not implemented yet
    });
    it('LoginPage: Then the cross icon should be displayed to the right of Username field', () => {
      // not implemented yet
    });
    it('LoginPage: Then the cross icon should be displayed to the right of Password field', () => {
      // not implemented yet
    });
    it('LoginPage: Then the cross icon should be displayed to the right of error message', () => {
      // not implemented yet
    });
  });

  context('LoginPage: When user leaves Username field empty and enters valid Password and clicks Login button', () => {
    it('LoginPage: Then Username and Password fields should be underlined with a red line', () => {
      // not implemented yet
    });
    it('LoginPage: Then the error message should be displayed under the Login button', () => {
      // not implemented yet
    });
    it('LoginPage: Then the cross icon should be displayed to the right of Username field', () => {
      // not implemented yet
    });
    it('LoginPage: Then the cross icon should be displayed to the right of Password field', () => {
      // not implemented yet
    });
    it('LoginPage: Then the cross icon should be displayed to the right of error message', () => {
      // not implemented yet
    });
  });

  context('LoginPage: When user enters valid Username and leaves Password field empty and clicks Login button', () => {
    it('LoginPage: Then Username and Password fields should be underlined with a red line', () => {
      // not implemented yet
    });
    it('LoginPage: Then the error message should be displayed under the Login button', () => {
      // not implemented yet
    });
    it('LoginPage: Then the cross icon should be displayed to the right of Username field', () => {
      // not implemented yet
    });
    it('LoginPage: Then the cross icon should be displayed to the right of Password field', () => {
      // not implemented yet
    });
    it('LoginPage: Then the cross icon should be displayed to the right of error message', () => {
      // not implemented yet
    });
  });

  context('LoginPage: When user leaves Username and Password fields empty and clicks Login button', () => {
    it('LoginPage: Then Username and Password fields should be underlined with a red line', () => {
      // not implemented yet
    });
    it('LoginPage: Then the error message should be displayed under the Login button', () => {
      // not implemented yet
    });
    it('LoginPage: Then the cross icon should be displayed to the right of Username field', () => {
      // not implemented yet
    });
    it('LoginPage: Then the cross icon should be displayed to the right of Password field', () => {
      // not implemented yet
    });
    it('LoginPage: Then the cross icon should be displayed to the right of error message', () => {
      // not implemented yet
    });
  });

  context('LoginPage: When logged in user clicks Logout button', () => {
    it('LoginPage: Then user should be navigated to the Login page', () => {
      // not implemented yet
    });
  });
});
