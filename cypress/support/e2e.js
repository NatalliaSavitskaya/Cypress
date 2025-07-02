// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Import necessary modules and resources
import l10n from './l10n.json';
import selectors from './selectors';
import urls from './urls';
import requirements from './requirements';
import products from '../products/products.json';

// Declare global variables
global.l10n = l10n;
global.selectors = selectors;
global.urls = urls;
global.requirements = requirements;
global.users = require('../sensitive-data/test-users.json');
global.products = products;

// Separate selectors by pages
global.loginPage = selectors.loginPage;
global.inventoryPage = selectors.inventoryPage;
global.headerItems = selectors.headerItems;
global.footerItems = selectors.footerItems