const { GETProducts } = require('./GET');
const { POSTProducts } = require('./POST');

function productTests(app, request, Product) {
  GETProducts(app, request, Product);
  POSTProducts(app, request, Product);
}

module.exports = {
  productTests,
};