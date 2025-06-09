const pages = {
    login: `${Cypress.env('baseUrl')}/`,
    inventory: `${Cypress.env('baseUrl')}/inventory.html`,
}

const externalPages = {
    linkedin: 'https://www.linkedin.com/company/sauce-labs/',
    facebook: 'https://www.facebook.com/saucelabs',
    twitter: 'https://twitter.com/saucelabs',
};

export default {
    pages, externalPages
};