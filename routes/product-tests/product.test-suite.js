const { GETProducts } = require('./GET');
const { POSTProducts } = require('./POST');
const { PUTProduct } = require('./PUT');
const { DELETEProduct } = require('./DELETE');
const { sequelize } =  require('../../database/connection');

function productTests(app, request, Product, User) {
  GETProducts(app, request, Product);
  POSTProducts(app, request, Product, sequelize);
  PUTProduct(app, request, Product);
  DELETEProduct(app, request, Product, User, sequelize);
}

module.exports = {
  productTests,
};