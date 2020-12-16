const WooCommerceAPI = require('woocommerce-api');

const WooCommerce = new WooCommerceAPI({
    url: 'https://outofbody.com.au',
    consumerKey: 'ck_2883fc26dbd25bd255c492a3f882a2ed64689daf',
    consumerSecret: 'cs_82b5cff9a86d0e833490289b2dde8cb0fdcfd3fd',
    verifySsl: false,
    port: 443
});

module.exports = WooCommerce;
