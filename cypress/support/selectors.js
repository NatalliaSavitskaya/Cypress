const loginPage = {
    title: '.login_logo',
    username: '[data-test=username]',
    password: '[data-test=password]',
    errorIcon: '[data-icon="times-circle"]',
    login: '[data-test="login-button"]',
    error: '.error-message-container',
    errorMessage: '[data-test="error"]',
    errorClose: '[data-test="error-button"]',
    acceptedUsernames: '[data-test=login-credentials]',
    acceptedPassword: '[data-test=login-password]'
};
const inventoryPage = {
    title: '[data-test="title"]'
};

const generalItems = {
    logOut: '[data-test="logout-sidebar-link"]',
    burgerMenu: '[id="react-burger-menu-btn"]'
};

export default {
    loginPage, inventoryPage, generalItems
};