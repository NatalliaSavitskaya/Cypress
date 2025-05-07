const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/**/*.cy.js', // test files pattern
    supportFile: 'cypress/support/e2e.js', // optional support file
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
