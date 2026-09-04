const { GETsuppliers } = require('./GET');
const { POSTSupplier } = require('./POST');

function supplierTests(app, request) {
  GETsuppliers(app, request);
  POSTSupplier(app, request);
}

module.exports = {
  supplierTests,
};
