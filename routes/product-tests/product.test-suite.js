const { GETProducts } = require('./GET');
const { POSTProducts } = require('./POST');
const { PUTProduct } = require('./PUT');

function productTests(app, request, Product) {
  GETProducts(app, request, Product);
  POSTProducts(app, request, Product);
  PUTProduct(app, request, Product);
}

module.exports = {
  productTests,
};