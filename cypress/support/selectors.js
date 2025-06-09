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
    title: '[data-test="title"]',
    inventoryItems: '[data-test="inventory-item"]',
    sorting: {
        container: '.select_container',
        dropdown: '[data-test="product-sort-container"]',
        currentOption: '[data-test="active-option"]',
        options: {
            nameAscending: 'option[value="az"]',
            nameDescending: 'option[value="za"]',
            priceAscending: 'option[value="lohi"]',
            priceDescending: 'option[value="hilo"]'
        },
    },
    inventoryItem: {
        title: '[data-test="inventory-item-name"]',
        description: '[data-test="inventory-item-desc"]',
        image: '.inventory_item_img img',
        removeButton: '[data-test^="remove-"]',
        addButton: '[data-test^="add-to-cart-"]',
        price: '[data-test="inventory-item-price"]'
    },
};

const generalItems = {
    logOut: '[data-test="logout-sidebar-link"]',
    burgerMenu: '[id="react-burger-menu-btn"]',
    resetAppState: '[data-test="reset-sidebar-link"]',
    closeMenu: '[id="react-burger-cross-btn"]',
    sortingControl: '[data-test="product-sort-container"]',
    cartIcon: '[data-test="shopping-cart-link"]',
    cartProductsCounter: '[data-test="shopping-cart-badge"]'
};

const footerComp = {
    twitter: '[data-test="social-twitter"]',
    facebook: '[data-test="social-facebook"]',
    linkedin: '[data-test="social-linkedin"]',
    copyRight: '[data-test="footer-copy"]'
};
export default {
    loginPage, inventoryPage, generalItems, footerComp
};