import requirements from '../../support/requirements.js';
import { genRandomText } from '../../support/utils';

describe('LoginPage: Given Login page opened', { testIsolation: false }, () => {
  before(() => {
    cy.visit('/');
  });

  context('LoginPage: When user explores the Login page', () => {
    it('LoginPage: Then user should see the title of Login page', () => {
      cy.get(loginPage.title).should('have.text', l10n.loginPage.title).and('be.visible');
    });
    it('LoginPage: Then user should see the Username field with placeholder', () => {
      cy.get(loginPage.username).should('have.attr', 'placeholder', l10n.loginPage.form.username).and('have.value', '').and('be.visible');
    });
    it('LoginPage: Then user should see the Password field with placeholder', () => {
      cy.get(loginPage.password).should('have.attr', 'placeholder', l10n.loginPage.form.password).and('have.value', '').and('be.visible');
    });
    it('LoginPage: Then user should see the Login button', () => {
      cy.get(loginPage.login).should('have.value', l10n.loginPage.form.login).and('be.visible').and('be.enabled');
    });
    it('LoginPage: Then user should see the URL of Login page', () => {
      cy.url().should('eq', urls.pages.login);
    });
    it('LoginPage: Then user should see the list of Accepted usernames', () => {
      cy.get(loginPage.acceptedUsernames)
        .should('be.visible')
        .invoke('text')
        .then((text) => {
          expect(text).to.include('Accepted usernames are:');
          expect(text).to.include('standard_user');
          expect(text).to.include('locked_out_user');
          expect(text).to.include('problem_user');
          expect(text).to.include('performance_glitch_user');
          expect(text).to.include('error_user');
          expect(text).to.include('visual_user');
        });
    });
    it('LoginPage: Then user should see the Password for all users', () => {
      cy.get(loginPage.acceptedPassword)
        .should('be.visible')
        .invoke('text')
        .then((text) => {
          expect(text).to.include('secret_sauce');
        });
    });
  });

  context('LoginPage: When Standard user enters valid credentials and clicks Login button', () => {
    before(() => {
      cy.loginUser(users.StandardUser);
    });
    it('LoginPage: Then Standard user should be navigated to the Inventory page', () => {
      cy.url().should('eq', urls.pages.inventory);
    });
    it('LoginPage: Then Standard user should see the title of Inventory page', () => {
      cy.get(inventoryPage.title).should('have.text', l10n.inventoryPage.title).and('be.visible');
    });
  });

  context('LoginPage: When logged in Standard user clicks Logout button', () => {
    before(() => {
      cy.get(headerItems.burgerMenu).click();
      cy.get(headerItems.logOut).click();
    });
    it('LoginPage: Then user should be navigated to the Login page', () => {
      cy.get(loginPage.title).should('have.text', l10n.loginPage.title).and('be.visible');
      cy.url().should('eq', urls.pages.login);
    });
  });

  context('LoginPage: When Standard user enters invalid Username and valid Password and clicks Login button', () => {
    // TODO: fix the bug loginPage_invalidFieldFrame: https://github.com/NatalliaSavitskaya/Cypress/issues/5#issue-3300161126
    // TODO: fix the bug loginPage_errorMessageValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/16#issue-3300384795
    before(() => {
      let randomText = genRandomText();
      cy.get(loginPage.username).type(randomText, { delay: 0 });
      cy.get(loginPage.password).type(users.StandardUser.password, { delay: 0 });
      cy.then(() => {
        cy.get(loginPage.login).click();
      });
    });

    it('LoginPage: Then Username field should be underlined with a red line', () => {
      cy.get(loginPage.username).should('have.css', 'border-bottom-color', requirements.colors.red);
    });
    it('LoginPage: Then Password field should be underlined with a red line', () => {
      cy.get(loginPage.password).should('have.css', 'border-bottom-color', requirements.colors.red);
    });
    it('LoginPage: Then the error message should be displayed under the Login button', () => {
      cy.get(loginPage.errorMessage).contains(l10n.loginPage.errors.userNotFound);
    });
    it('LoginPage: Then the cross icon should be displayed to the right of Username field', () => {
      cy.get(loginPage.username).parent().find(loginPage.errorIcon).should('be.visible');
    });
    it('LoginPage: Then the cross icon should be displayed to the right of Password field', () => {
      cy.get(loginPage.password).parent().find(loginPage.errorIcon).should('be.visible');
    });
    it('LoginPage: Then the cross icon should be displayed to the right of error message', () => {
      cy.get(loginPage.errorClose).should('be.visible');
    });
    after(() => {
      cy.get(loginPage.username).clear();
      cy.get(loginPage.password).clear();
    });
  });

  context('LoginPage: When Standard user enters valid Username and invalid Password and clicks Login button', () => {
    // TODO: fix the bug loginPage_invalidFieldFrame: https://github.com/NatalliaSavitskaya/Cypress/issues/5#issue-3300161126
    // TODO: fix the bug loginPage_errorMessageValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/16#issue-3300384795
    before(() => {
      cy.get(loginPage.username).type(users.StandardUser.username, { delay: 0 });
      let randomText = genRandomText();
      cy.get(loginPage.password).type(randomText, { delay: 0 });
      cy.then(() => {
        cy.get(loginPage.login).click();
      });
    });
    it('LoginPage: Then Username field should be underlined with a red line', () => {
      cy.get(loginPage.username).should('have.css', 'border-bottom-color', requirements.colors.red);
    });
    it('LoginPage: Then Password field should be underlined with a red line', () => {
      cy.get(loginPage.password).should('have.css', 'border-bottom-color', requirements.colors.red);
    });
    it('LoginPage: Then the error message should be displayed under the Login button', () => {
      cy.get(loginPage.errorMessage).contains(l10n.loginPage.errors.userNotFound);
    });
    it('LoginPage: Then the cross icon should be displayed to the right of Username field', () => {
      cy.get(loginPage.username).parent().find(loginPage.errorIcon).should('be.visible');
    });
    it('LoginPage: Then the cross icon should be displayed to the right of Password field', () => {
      cy.get(loginPage.password).parent().find(loginPage.errorIcon).should('be.visible');
    });
    it('LoginPage: Then the cross icon should be displayed to the right of error message', () => {
      cy.get(loginPage.errorClose).should('be.visible');
    });
    after(() => {
      cy.get(loginPage.username).clear();
      cy.get(loginPage.password).clear();
    });
  });

  context('LoginPage: When Standard user leaves Username field empty and enters valid Password and clicks Login button', () => {
    // TODO: fix the bug loginPage_invalidFieldFrame: https://github.com/NatalliaSavitskaya/Cypress/issues/5#issue-3300161126
    // TODO: fix the bug loginPage_errorMessageValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/16#issue-3300384795
    before(() => {
      cy.get(loginPage.password).type(users.StandardUser.password, { delay: 0 });
      cy.then(() => {
        cy.get(loginPage.login).click();
      });
    });
    it('LoginPage: Then Username field should be underlined with a red line', () => {
      cy.get(loginPage.username).should('have.css', 'border-bottom-color', requirements.colors.red);
    });
    it('LoginPage: Then Password field should be underlined with a red line', () => {
      cy.get(loginPage.password).should('have.css', 'border-bottom-color', requirements.colors.red);
    });
    it('LoginPage: Then the error message should be displayed under the Login button', () => {
      cy.get(loginPage.errorMessage).contains(l10n.loginPage.errors.usernameIsRequired);
    });
    it('LoginPage: Then the cross icon should be displayed to the right of Username field', () => {
      cy.get(loginPage.username).parent().find(loginPage.errorIcon).should('be.visible');
    });
    it('LoginPage: Then the cross icon should be displayed to the right of Password field', () => {
      cy.get(loginPage.password).parent().find(loginPage.errorIcon).should('be.visible');
    });
    it('LoginPage: Then the cross icon should be displayed to the right of error message', () => {
      cy.get(loginPage.errorClose).should('be.visible');
    });
    after(() => {
      cy.get(loginPage.password).clear();
    });
  });

  context('LoginPage: When Standard user enters valid Username and leaves Password field empty and clicks Login button', () => {
    // TODO: fix the bug loginPage_invalidFieldFrame: https://github.com/NatalliaSavitskaya/Cypress/issues/5#issue-3300161126
    // TODO: fix the bug loginPage_errorMessageValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/16#issue-3300384795
    before(() => {
      cy.get(loginPage.username).type(users.StandardUser.username, { delay: 0 });
      cy.then(() => {
        cy.get(loginPage.login).click();
      });
    });
    it('LoginPage: Then Username field should be underlined with a red line', () => {
      cy.get(loginPage.username).should('have.css', 'border-bottom-color', requirements.colors.red);
    });
    it('LoginPage: Then Password field should be underlined with a red line', () => {
      cy.get(loginPage.password).should('have.css', 'border-bottom-color', requirements.colors.red);
    });
    it('LoginPage: Then the error message should be displayed under the Login button', () => {
      cy.get(loginPage.errorMessage).contains(l10n.loginPage.errors.passwordIsRequired);
    });
    it('LoginPage: Then the cross icon should be displayed to the right of Username field', () => {
      cy.get(loginPage.username).parent().find(loginPage.errorIcon).should('be.visible');
    });
    it('LoginPage: Then the cross icon should be displayed to the right of Password field', () => {
      cy.get(loginPage.password).parent().find(loginPage.errorIcon).should('be.visible');
    });
    it('LoginPage: Then the cross icon should be displayed to the right of error message', () => {
      cy.get(loginPage.errorClose).should('be.visible');
    });
    after(() => {
      cy.get(loginPage.username).clear();
    });
  });

  context('LoginPage: When Locked user enters valid credentials and clicks Login button', () => {
    // TODO: fix the bug loginPage_errorMessageValidation: https://github.com/NatalliaSavitskaya/Cypress/issues/16#issue-3300384795
    before(() => {
      cy.loginUser(users.LockedUser);
    });
    it('LoginPage: Then Username field should be underlined with a red line', () => {
      cy.get(loginPage.username).should('have.css', 'border-bottom-color', requirements.colors.red);
    });
    it('LoginPage: Then Password field should be underlined with a red line', () => {
      cy.get(loginPage.password).should('have.css', 'border-bottom-color', requirements.colors.red);
    });
    it('LoginPage: Then the error message should be displayed under the Login button', () => {
      cy.get(loginPage.errorMessage).contains(l10n.loginPage.errors.userIsLockedOut);
    });
    it('LoginPage: Then the cross icon should be displayed to the right of Username field', () => {
      cy.get(loginPage.username).parent().find(loginPage.errorIcon).should('be.visible');
    });
    it('LoginPage: Then the cross icon should be displayed to the right of Password field', () => {
      cy.get(loginPage.password).parent().find(loginPage.errorIcon).should('be.visible');
    });
    it('LoginPage: Then the cross icon should be displayed to the right of error message', () => {
      cy.get(loginPage.errorClose).should('be.visible');
    });
  });

  context('LoginPage: When Locked user enters valid Username and invalid Password and clicks Login button', () => {
    // TODO: fix the bug loginPage_invalidFieldFrame: https://github.com/NatalliaSavitskaya/Cypress/issues/5#issue-3300161126
    before(() => {
      cy.get(loginPage.username).type(users.LockedUser.username, { delay: 0 });
      let randomText = genRandomText();
      cy.get(loginPage.password).type(randomText, { delay: 0 });
      cy.then(() => {
        cy.get(loginPage.login).click();
      });
    });
    it('LoginPage: Then Username field should be underlined with a red line', () => {
      cy.get(loginPage.username).should('have.css', 'border-bottom-color', requirements.colors.red);
    });
    it('LoginPage: Then Password field should be underlined with a red line', () => {
      cy.get(loginPage.password).should('have.css', 'border-bottom-color', requirements.colors.red);
    });
    it('LoginPage: Then the error message should be displayed under the Login button', () => {
      cy.get(loginPage.errorMessage).contains(l10n.loginPage.errors.userNotFound);
    });
    it('LoginPage: Then the cross icon should be displayed to the right of Username field', () => {
      cy.get(loginPage.username).parent().find(loginPage.errorIcon).should('be.visible');
    });
    it('LoginPage: Then the cross icon should be displayed to the right of Password field', () => {
      cy.get(loginPage.password).parent().find(loginPage.errorIcon).should('be.visible');
    });
    it('LoginPage: Then the cross icon should be displayed to the right of error message', () => {
      cy.get(loginPage.errorClose).should('be.visible');
    });
    after(() => {
      cy.get(loginPage.username).clear();
      cy.get(loginPage.password).clear();
    });
  });

  context('LoginPage: When Locked user enters valid Username and leaves Password field empty and clicks Login button', () => {
    // TODO: fix the bug loginPage_invalidFieldFrame: https://github.com/NatalliaSavitskaya/Cypress/issues/5#issue-3300161126
    before(() => {
      cy.get(loginPage.username).type(users.LockedUser.username, { delay: 0 });
      cy.then(() => {
        cy.get(loginPage.login).click();
      });
    });
    it('LoginPage: Then Username field should be underlined with a red line', () => {
      cy.get(loginPage.username).should('have.css', 'border-bottom-color', requirements.colors.red);
    });
    it('LoginPage: Then Password field should be underlined with a red line', () => {
      cy.get(loginPage.password).should('have.css', 'border-bottom-color', requirements.colors.red);
    });
    it('LoginPage: Then the error message should be displayed under the Login button', () => {
      cy.get(loginPage.errorMessage).contains(l10n.loginPage.errors.passwordIsRequired);
    });
    it('LoginPage: Then the cross icon should be displayed to the right of Username field', () => {
      cy.get(loginPage.username).parent().find(loginPage.errorIcon).should('be.visible');
    });
    it('LoginPage: Then the cross icon should be displayed to the right of Password field', () => {
      cy.get(loginPage.password).parent().find(loginPage.errorIcon).should('be.visible');
    });
    it('LoginPage: Then the cross icon should be displayed to the right of error message', () => {
      cy.get(loginPage.errorClose).should('be.visible');
    });
    after(() => {
      cy.get(loginPage.username).clear();
    });
  });
});
