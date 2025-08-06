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
            nameAscending: 'az',
            nameDescending: 'za',
            priceAscending: 'lohi',
            priceDescending: 'hilo'
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

const cartPage = {
    title: '[data-test="title"]',
    quantityLabel: '[data-test="cart-quantity-label"]',
    descriptionLabel: '[data-test="cart-desc-label"]',
    continueShopping: '[data-test="continue-shopping"]',
    checkout: '[data-test="checkout"]',
    items: '[data-test="inventory-item"]',
    item: {
        title: '[data-test="inventory-item-name"]',
        description: '[data-test="inventory-item-desc"]',
        price: '[data-test="inventory-item-price"]',
        quantity: '[data-test="item-quantity"]',
        remove: '[data-test^="remove-"]',
    },
};

const checkoutInfoPage = {
    title: '[data-test="title"]',
    firstName: '[data-test="firstName"]',
    lastName: '[data-test="lastName"]',
    zip: '[data-test="postalCode"]',
    continue: '[data-test="continue"]',
    cancel: '[data-test="cancel"]',
    error: '.error-message-container',
    errorIcon: '[data-icon="times-circle"]',
    errorMessage: '[data-test="error"]',
    errorClose: '[data-test="error-button"]',
};

const checkoutOverviewPage = {
    title: '[data-test="title"]',
    finish: '[data-test="finish"]',
    cancel: '[data-test="cancel"]',
    quantityLabel: '[data-test="cart-quantity-label"]',
    descriptionLabel: '[data-test="cart-desc-label"]',
    paymentInfoLabel: '[data-test="payment-info-label"]',
    paymentInfo: '[data-test="payment-info-value"]',
    shippingInfoLabel: '[data-test="shipping-info-label"]',
    shippingInfo: '[data-test="shipping-info-value"]',
    itemsTotalLabel: '[data-test="total-info-label"]',
    itemsTotal: '[data-test="subtotal-label"]',
    priceTotal: '[data-test="total-label"]',
    tax: '[data-test="tax-label"]',
    items: '[data-test="inventory-item"]',
    item: {
        title: '[data-test="inventory-item-name"]',
        description: '[data-test="inventory-item-desc"]',
        price: '[data-test="inventory-item-price"]',
        quantity: '[data-test="item-quantity"]',
    },
};

const checkoutCompletePage = {
    title: '[data-test="title"]',
    successIcon: '[data-test="pony-express"]',
    confirmation: {
        title: '[data-test="complete-header"]',
        message: '[data-test="complete-text"]',
    },
    backHome: '[data-test="back-to-products"]',
};

const headerItems = {
    logOut: '[data-test="logout-sidebar-link"]',
    burgerMenu: '[id="react-burger-menu-btn"]',
    resetAppState: '[data-test="reset-sidebar-link"]',
    closeMenu: '[id="react-burger-cross-btn"]',
    cartIcon: '[data-test="shopping-cart-link"]',
    cartProductsCounter: '[data-test="shopping-cart-badge"]'
};

const footerItems = {
    twitter: '[data-test="social-twitter"]',
    facebook: '[data-test="social-facebook"]',
    linkedin: '[data-test="social-linkedin"]',
    copyRight: '[data-test="footer-copy"]'
};
export default {
    loginPage, inventoryPage, cartPage, checkoutInfoPage, checkoutOverviewPage, checkoutCompletePage, headerItems, footerItems
};