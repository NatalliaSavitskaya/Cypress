const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    apiBaseUrl: 'https://restful-booker.herokuapp.com',
    specPattern: 'cypress/integration/**/*.spec.js', // test files pattern
    supportFile: 'cypress/support/e2e.js', // optional support file
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
