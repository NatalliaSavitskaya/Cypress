import selectors from "../../support/selectors";

describe('LoginPage: Given Login page opened',{testIsolation: false}, () => {

    before(() => {
        cy.visit("/");
    });

    context.skip(
        'When user explore the Login page',
        () => {
            it('Then user should see the title', () => {
                cy.get(selectors.loginPage.title).should("have.text", l10n.loginPage.title).and("be.visible");
            });
            it('Then user should see the Username field with placeholder', () => {
                cy.get(selectors.loginPage.username).should("have.attr", "placeholder", l10n.loginPage.form.username).and("have.value", "").and("be.visible");
            });
            it('Then user should see the Password field with placeholder', () => {
                cy.get(selectors.loginPage.password).should("have.attr", "placeholder", l10n.loginPage.form.password).and("have.value", "").and("be.visible");
            });
            it('Then user should see the Login button', () => {
                cy.get(selectors.loginPage.login).should("have.value", l10n.loginPage.form.login).and("be.visible").and("be.enabled");
            });
            it('Then user should see the URL of Login page', () => {
                // not implemented yet
            });
            it('Then user should see the logo', () => {
                // not implemented yet
            });
            it('Then user should see the list of Accepted usernames', () => {
                // not implemented yet
            });
            it('Then user should see the Password for all users', () => {
                // not implemented yet
            });
        }
    );

    context.skip(
        'When user enters valid credentials and clicks Login button',
        () => {
            it('Then user should be navigated to the Inventory page', () => {
                // not implemented yet
            });
        }
    );

    context.skip(
        'When user enters invalid credentials and clicks Login button',
        () => {
            it('Then Username and Password fields should be underlined with a red line', () => {
                // not implemented yet
            });
            it('Then the error message should be displayed under the Login button', () => {
                // not implemented yet
            });
            it('Then the cross icon should be displayed to the right of Username field', () => {
                // not implemented yet
            });
            it('Then the cross icon should be displayed to the right of Password field', () => {
                // not implemented yet
            });
            it('Then the cross icon should be displayed to the right of error message', () => {
                // not implemented yet
            });
    }
);

    context.skip(
        'When user leaves Username field empty and enters valid Password and clicks Login button',
        () => {
            it('Then Username and Password fields should be underlined with a red line', () => {
                // not implemented yet
            });
            it('Then the error message should be displayed under the Login button', () => {
                // not implemented yet
            });
            it('Then the cross icon should be displayed to the right of Username field', () => {
                // not implemented yet
            });
            it('Then the cross icon should be displayed to the right of Password field', () => {
                // not implemented yet
            });
            it('Then the cross icon should be displayed to the right of error message', () => {
                // not implemented yet
            });
        }
    );

    context.skip(
        'When user enters valid Username and leaves Password field empty and clicks Login button',
        () => {
            it('Then Username and Password fields should be underlined with a red line', () => {
                // not implemented yet
            });
            it('Then the error message should be displayed under the Login button', () => {
                // not implemented yet
            });
            it('Then the cross icon should be displayed to the right of Username field', () => {
                // not implemented yet
            });
            it('Then the cross icon should be displayed to the right of Password field', () => {
                // not implemented yet
            });
            it('Then the cross icon should be displayed to the right of error message', () => {
                // not implemented yet
            });
        }
    );

    context.skip(
        'When user leaves Username and Password fields empty and clicks Login button',
        () => {
            it('Then Username and Password fields should be underlined with a red line', () => {
                // not implemented yet
            });
            it('Then the error message should be displayed under the Login button', () => {
                // not implemented yet
            });
            it('Then the cross icon should be displayed to the right of Username field', () => {
                // not implemented yet
            });
            it('Then the cross icon should be displayed to the right of Password field', () => {
                // not implemented yet
            });
            it('Then the cross icon should be displayed to the right of error message', () => {
                // not implemented yet
            });
        }
    );

    context.skip(
        'When logged in user clicks Logout button',
        () => {
            it('Then user should be navigated to the Login page', () => {
                // not implemented yet
            });
        }
    );
});