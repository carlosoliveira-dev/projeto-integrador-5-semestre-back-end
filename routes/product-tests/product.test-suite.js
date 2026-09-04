const { GETProducts } = require('./GET');
const { POSTProducts } = require('./POST');
const { PUTProduct } = require('./PUT');
const { DELETEProduct } = require('./DELETE');

function productTests(app, request, Product, User) {
  GETProducts(app, request, Product);
  POSTProducts(app, request, Product);
  PUTProduct(app, request, Product);
  DELETEProduct(app, request, Product, User);
}

module.exports = {
  productTests,
};