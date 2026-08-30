const { GETProducts } = require('./product-tests/GET');
const { POSTProducts } = require('./product-tests/POST');

function productTests(app, request, Product) {
  GETProducts(app, request, Product);
  POSTProducts(app, request, Product);
}

module.exports = {
  productTests,
};