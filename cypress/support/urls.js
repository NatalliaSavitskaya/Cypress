const pages = {
    login: `${Cypress.config('baseUrl')}/`,
    inventory: `${Cypress.config('baseUrl')}/inventory.html`,
    cart: `${Cypress.config('baseUrl')}/cart.html`,
    checkout: `${Cypress.config('baseUrl')}/checkout-step-one.html`,
}

const externalPages = {
    linkedin: 'https://www.linkedin.com/company/sauce-labs/',
    facebook: 'https://www.facebook.com/saucelabs',
    twitter: 'https://twitter.com/saucelabs',
};

export default {
    pages, externalPages
};