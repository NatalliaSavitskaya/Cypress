const pages = {
    login: `${Cypress.config('baseUrl')}/`,
    inventory: `${Cypress.config('baseUrl')}/inventory.html`,
    inventoryItem: `${Cypress.config('baseUrl')}/inventory-item.html?id=`,
    cart: `${Cypress.config('baseUrl')}/cart.html`,
    checkoutInfo: `${Cypress.config('baseUrl')}/checkout-step-one.html`,
    checkoutOverview: `${Cypress.config('baseUrl')}/checkout-step-two.html`,
    checkoutComplete: `${Cypress.config('baseUrl')}/checkout-complete.html`,
}

const externalPages = {
    linkedin: 'https://www.linkedin.com/company/sauce-labs/',
    facebook: 'https://www.facebook.com/saucelabs',
    twitter: 'https://twitter.com/saucelabs',
}

const apiBaseUrl = {
    booking: 'https://restful-booker.herokuapp.com/booking/',
    auth: 'https://restful-booker.herokuapp.com/auth',
    ping: 'https://restful-booker.herokuapp.com/ping',
}

export default {
    pages, externalPages, apiBaseUrl
};